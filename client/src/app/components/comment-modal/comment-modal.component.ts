import { Component, Input } from '@angular/core';
import { Student } from '../../models/Student';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.css'],
})
export class CommentModalComponent {
  @Input() student: Student | undefined;
  @Input() onSubmit: ((comment: string) => void) | undefined;
  @Input() onClose: (() => void) | undefined;

  studentComment: string = '';
  submitted = false;

  ngOnInit() {
    this.studentComment = this.student?.comment ?? '';
  }

  onSubmitComment = () => {
    if (this.onSubmit) {
      this.onSubmit(this.studentComment);
      this.onModalClose();
      this.submitted = true;
    }
  };

  onClear = () => {
    this.studentComment = '';
  };

  onModalClose = () => {
    if (this.onClose) {
      this.onClose();
    }
  };
}
