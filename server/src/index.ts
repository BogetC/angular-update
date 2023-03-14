import express from "express";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import { AttendanceSheet } from "./models/AttendanceSheet";
import { PresenceStateEnum } from "./models/PresenStateEnum";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { CreateSheetRequest } from "./models/http/CreateSheetRequest";
import { CreateStudentRequest } from "./models/http/CreateStudentRequest";
import { Student } from "./models/Student";

dotenv.config();

const DB_PATH = "./db_edusign.json";
const PORT = process.env.PORT;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const readDB = (): AttendanceSheet[] => {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
};

let corsOptions = {
  origin: CLIENT_ORIGIN,
};

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/sheets", (req, res) => {
  res.json(readDB());
});

app.post("/api/sheets", (req, res, next) => {
  // GET FROM DB (Refactor --> Create DB service)
  const sheets = readDB();
  const body: CreateSheetRequest = req.body;

  if (!body.name || !body.start || !body.end) {
    res.status(400);
    res.json({ message: "Payload malformed" });
    next();
    return;
  }

  const newSheet: AttendanceSheet = {
    ID: uuidv4(),
    NAME: body.name,
    STUDENTS: [],
    START: body.start,
    END: body.end,
    DATE_CREATED: new Date().toISOString(),
    DATE_UPDATED: new Date().toISOString(),
  };

  sheets.push(newSheet);

  // Update DB
  fs.writeFileSync(DB_PATH, JSON.stringify(sheets));

  res.json(newSheet);
});

app.get("/api/sheets/:sheetId", (req, res) => {
  const sheets = readDB();
  const sheetId = req.params?.sheetId;
  const sheet = sheets.find((s) => s.ID === sheetId);
  if (!sheet) {
    res.status(404);
    res.json({ message: "Sheet not found" });
    return;
  }

  res.json(sheet);
});

app.delete("/api/sheets/:sheetId", (req, res) => {
  const sheets = readDB();
  const sheetId = req.params?.sheetId;
  const sheet = sheets.find((s) => s.ID === sheetId);
  if (!sheet) {
    res.status(404);
    res.json({ message: "Sheet not found" });
    return;
  }

  const updatedSheets = sheets.filter((s) => s.ID !== sheet.ID);

  // Update DB
  fs.writeFileSync(DB_PATH, JSON.stringify(updatedSheets));

  res.json(sheet);
});

app.post("/api/sheets/:sheetId/students", (req, res, next) => {
  const sheetId = req.params?.sheetId;
  if (!sheetId) {
    res.status(400);
    res.json({ message: "Sheet id query required" });
    next();
    return;
  }

  // GET FROM DB (Refactor --> Create DB service)
  const sheets = readDB();

  const sheet = sheets.find((s) => s.ID === sheetId);
  if (!sheet) {
    res.status(404);
    res.json({ message: "Sheet not found" });
    next();
    return;
  }

  const body: CreateStudentRequest = req.body;
  if (!body.firstname || !body.lastname) {
    res.status(400);
    res.json({ message: "Payload malformed" });
    next();
    return;
  }

  const newStudent: Student = {
    id: uuidv4(),
    FIRSTNAME: body.firstname,
    LASTNAME: body.lastname,
    dateCreated: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
  };

  sheet.STUDENTS.push(newStudent);

  const updatedSheets = sheets.map((s) => (s.ID !== sheet.ID ? s : sheet));

  // Update DB
  fs.writeFileSync(DB_PATH, JSON.stringify(updatedSheets));

  // Send response
  res.json(newStudent);
});

app.put("/api/sheets/:sheetId/students/:studentId", async (req, res, next) => {
  const sheetId = req.params?.sheetId;
  if (!sheetId) {
    res.status(400);
    res.json({ message: "Sheet id query required" });
    next();
    return;
  }

  const studentId = req.params?.studentId;
  if (!studentId) {
    res.status(400);
    res.json({ message: "Student id query required" });
    next();
    return;
  }

  // GET FROM DB (Refactor --> Create DB service)
  const sheets = readDB();

  const sheet = sheets.find((s) => s.ID === sheetId);
  if (!sheet) {
    res.status(404);
    res.json({ message: "Sheet not found" });
    next();
    return;
  }

  const student = sheet.STUDENTS.find((s) => s.id === studentId);
  if (!student) {
    res.status(404);
    res.json({ message: "Student not found" });
    next();
    return;
  }

  const body = req.body;

  // Handle Signature
  if (body?.signature) {
    try {
      const imagePublicID = `${student.FIRSTNAME}-${
        student.LASTNAME
      }-signature-${sheet.ID}-${new Date().getTime()}`;
      const cloudinaryUpload = await cloudinary.uploader.upload(
        body.signature,
        {
          public_id: imagePublicID,
        }
      );
      student.signature = cloudinary.url(imagePublicID);
    } catch (e) {
      console.error(e);
      res.status(500);
      res.json({ message: "Can't upload signature" });
      next();
      return;
    }

    student.signatureTimestamp = new Date().getTime();
    student.presenceState = PresenceStateEnum.PRESENT;

    if (body?.delay) {
      student.delay = body.delay;
    }
  }

  // Handle Absence
  if (body.presenceState === PresenceStateEnum.ABSENT) {
    student.presenceState = PresenceStateEnum.ABSENT;

    if (body?.absenceComment) {
      student.absenceComment = body.absenceComment;
    }
  }

  // Handle Comment
  if (body?.studentComment) {
    student.comment = body.studentComment;
  }

  // Update student
  student.dateUpdated = new Date().toISOString();

  sheet.STUDENTS = sheet.STUDENTS.map((s) =>
    s.id !== studentId ? s : student
  );

  const updatedSheets = sheets.map((s) => (s.ID !== sheet.ID ? s : sheet));

  // Update DB
  fs.writeFileSync(DB_PATH, JSON.stringify(updatedSheets));

  // Send response
  res.json(student);
});

app.delete("/api/sheets/:sheetId/students/:studentId", (req, res, next) => {
  const sheetId = req.params?.sheetId;
  if (!sheetId) {
    res.status(400);
    res.json({ message: "Sheet id query required" });
    next();
    return;
  }

  const studentId = req.params?.studentId;
  if (!studentId) {
    res.status(400);
    res.json({ message: "Student id query required" });
    next();
    return;
  }

  // GET FROM DB (Refactor --> Create DB service)
  const sheets = readDB();

  const sheet = sheets.find((s) => s.ID === sheetId);
  if (!sheet) {
    res.status(404);
    res.json({ message: "Sheet not found" });
    next();
    return;
  }

  const student = sheet.STUDENTS.find((s) => s.id === studentId);
  if (!student) {
    res.status(404);
    res.json({ message: "Student not found" });
    next();
    return;
  }

  sheet.STUDENTS = sheet.STUDENTS.filter((s) => s.id !== studentId);

  const updatedSheets = sheets.map((s) => (s.ID !== sheet.ID ? s : sheet));

  // Update DB
  fs.writeFileSync(DB_PATH, JSON.stringify(updatedSheets));

  // Send response
  res.json(student);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
