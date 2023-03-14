import { Component, Input } from '@angular/core';
import { Student } from '../../models/Student';

@Component({
  selector: 'app-absent-modal',
  templateUrl: './absent-modal.component.html',
  styleUrls: ['./absent-modal.component.css'],
})
export class AbsentModalComponent {
  @Input() student: Student | undefined;
  @Input() readOnly: boolean = false;
  @Input() onSubmit: ((absenceComment?: string) => void) | undefined;
  @Input() onClose: (() => void) | undefined;

  excusable: boolean = false;
  absenceComment?: string;

  ngOnInit() {
    this.absenceComment = this.student?.absenceComment ?? '';
  }

  onExcusableChange = () => {
    if (!this.excusable) {
      this.absenceComment = undefined;
    }

    console.log(this.excusable);
  };

  onSubmitComment = () => {
    if (this.onSubmit && !this.readOnly) {
      this.onSubmit(this.absenceComment);
      this.onModalClose();
    }
  };

  onClear = () => {
    this.absenceComment = '';
  };

  onModalClose = () => {
    if (this.onClose) {
      this.onClose();
    }
  };
}
