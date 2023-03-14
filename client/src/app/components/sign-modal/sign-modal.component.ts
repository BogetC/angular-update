import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { Student } from '../../models/Student';

@Component({
  selector: 'app-sign-modal',
  templateUrl: './sign-modal.component.html',
  styleUrls: ['./sign-modal.component.css'],
})
export class SignModalComponent {
  @Input() student: Student | undefined;
  @Input() onSubmit: ((signature: string, delay?: number) => void) | undefined;
  @Input() onClose: (() => void) | undefined;

  @ViewChild('canvas', { static: true }) canvas: ElementRef | undefined;

  sig?: SignaturePad;
  isDelayed: boolean = false;
  delay?: number;

  ngOnInit() {
    if (this.canvas) {
      this.sig = new SignaturePad(this.canvas.nativeElement);
    }
  }

  onIsDelayedChanged = () => {
    if (!this.isDelayed) {
      this.delay = undefined;
    }
  };

  clear = () => {
    if (this.sig) {
      this.sig.clear();
    }
  };

  onSubmitSignature = () => {
    if (this.onSubmit && this.sig) {
      this.onSubmit(this.sig.toDataURL(), this.delay);
      this.onModalClose();
    }
  };

  onModalClose = () => {
    if (this.onClose) {
      this.onClose();
    }
  };
}
