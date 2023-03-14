import { Component, Input } from '@angular/core';
import { CreateStudentRequest } from '../../models/http/CreateStudentRequest';

@Component({
  selector: 'app-create-student-modal-form',
  templateUrl: './create-student-modal-form.component.html',
  styleUrls: ['./create-student-modal-form.component.css'],
})
export class CreateStudentModalFormComponent {
  @Input() onSubmit: ((payload: CreateStudentRequest) => void) | undefined;
  @Input() onClose: (() => void) | undefined;

  studentFormModel: CreateStudentRequest = {
    firstName: '',
    lastName: '',
  };

  onSubmitStudent = () => {
    if (this.onSubmit) {
      this.onSubmit(this.studentFormModel);
      this.onModalClose();
    }
  };

  onModalClose = () => {
    if (this.onClose) {
      this.onClose();
    }
  };
}
