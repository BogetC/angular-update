import { Student } from './Student';

export type AttendanceSheet = {
  ID: string;
  NAME: string;
  STUDENTS: Student[];
  START: string;
  END: string;
  DATE_CREATED: string;
  DATE_UPDATED: string;
};
