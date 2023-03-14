import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignModalComponent } from './sign-modal.component';
import { FormsModule } from '@angular/forms';

describe('SignModalComponent', () => {
  let component: SignModalComponent;
  let fixture: ComponentFixture<SignModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignModalComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
