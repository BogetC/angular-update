import { Component } from '@angular/core';
import { AttendanceSheet } from '../../models/AttendanceSheet';
import { SheetsService } from '../../services/sheets/sheets.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models/Student';
import {
  faAngleDown,
  faCheck,
  faEye,
  faClose,
  faBan,
  faWarning,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { PresenceStateEnum } from '../../models/PresenStateEnum';
import { CreateStudentRequest } from '../../models/http/CreateStudentRequest';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css'],
})
export class SheetComponent {
  sheetId: string | null;
  sheet?: AttendanceSheet;
  activeStudentActionDropdown?: Student;
  activeStudentSignModal?: Student;
  activeStudentCommentModal?: Student;
  activeStudentAbsentModal?: Student;
  activeStudentAbsentModalReadOnly = false;
  isCreateStudentModalActive: boolean = false;

  faAngleDown = faAngleDown;
  faCheck = faCheck;
  faEye = faEye;
  faClose = faClose;
  faBan = faBan;
  faWarning = faWarning;
  faPlus = faPlus;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sheetsService: SheetsService
  ) {
    this.sheetId = this.activatedRoute.snapshot.paramMap.get('sheetId');
  }

  ngOnInit() {
    if (this.sheetId) {
      this.sheetsService
        .getSheet(this.sheetId)
        .subscribe((data) => (this.sheet = data ?? null));
    } else {
      this.router.navigateByUrl('/').catch((e) => console.error(e));
    }
  }

  onActiveStudentDropdownClick = (s: Student) => {
    if (
      this.activeStudentActionDropdown &&
      s.id === this.activeStudentActionDropdown.id
    ) {
      this.activeStudentActionDropdown = undefined;
    } else {
      this.activeStudentActionDropdown = s;
    }
  };

  onActiveStudentSignModalClick = (s: Student) => {
    this.activeStudentSignModal = s;
  };

  onActiveStudentSignModalClose = () => {
    this.activeStudentSignModal = undefined;
  };

  onActiveStudentCommentModalClick = (s: Student) => {
    this.activeStudentCommentModal = s;
  };

  onActiveStudentCommentModalClose = () => {
    this.activeStudentCommentModal = undefined;
  };

  onActiveStudentAbsentModalClick = (s: Student, readOnly = false) => {
    this.activeStudentAbsentModal = s;
    this.activeStudentAbsentModalReadOnly = readOnly;
  };

  onActiveStudentAbsentModalClose = () => {
    this.activeStudentAbsentModal = undefined;
    this.activeStudentAbsentModalReadOnly = false;
  };

  onCreateStudentModalOpen = () => {
    this.isCreateStudentModalActive = true;
  };

  onCreateStudentModalClose = () => {
    this.isCreateStudentModalActive = false;
  };

  createStudent = (payload: CreateStudentRequest) => {
    if (this.sheetId) {
      this.sheetsService
        .createStudent(this.sheetId, payload)
        .subscribe((data) => this.sheet?.STUDENTS.push(data));
    }
  };

  private updateStudent = (student: Student) => {
    if (this.sheet) {
      this.sheet.STUDENTS = this.sheet.STUDENTS.map((s) =>
        s.id !== student.id ? s : student
      );
    }
  };

  updateStudentSignature = (signature: string, delay?: number) => {
    if (this.sheetId && this.activeStudentSignModal) {
      this.sheetsService
        .updateStudent(this.sheetId, this.activeStudentSignModal.id, {
          signature,
          delay,
        })
        .subscribe((data) => this.updateStudent(data));
    }
  };

  updateStudentComment = (comment: string) => {
    if (this.sheetId && this.activeStudentCommentModal) {
      this.sheetsService
        .updateStudent(this.sheetId, this.activeStudentCommentModal.id, {
          studentComment: comment,
        })
        .subscribe((data) => this.updateStudent(data));
    }
  };

  updateStudentAbsent = (absenceComment?: string) => {
    if (this.sheetId && this.activeStudentAbsentModal) {
      this.sheetsService
        .updateStudent(this.sheetId, this.activeStudentAbsentModal.id, {
          presenceState: PresenceStateEnum.ABSENT,
          absenceComment,
        })
        .subscribe((data) => this.updateStudent(data));
    }
  };

  deleteStudent = (studentId: string) => {
    if (this.sheetId) {
      this.sheetsService
        .deleteStudent(this.sheetId, studentId)
        .subscribe((data) => {
          if (this.sheet) {
            this.sheet.STUDENTS = this.sheet?.STUDENTS.filter(
              (s) => s.id !== data.id
            );
          }
        });
    }
  };

  getPresents = () => {
    return (
      this.sheet?.STUDENTS.filter(
        (s) => s.presenceState === PresenceStateEnum.PRESENT
      ).length ?? 0
    );
  };

  getWaiting = () => {
    return this.sheet?.STUDENTS.filter((s) => !s.presenceState).length ?? 0;
  };

  getAbsents = () => {
    return (
      this.sheet?.STUDENTS.filter(
        (s) => s.presenceState === PresenceStateEnum.ABSENT
      ).length ?? 0
    );
  };

  getTotal = () => {
    return this.sheet?.STUDENTS.filter((s) => !!s.presenceState).length ?? 0;
  };
}
