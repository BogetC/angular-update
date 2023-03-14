import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { CreateStudentModalFormComponent } from './create-student-modal-form.component';
import { FormsModule } from '@angular/forms';

describe('CreateStudentModalFormComponent', () => {
  let component: CreateStudentModalFormComponent;
  let fixture: ComponentFixture<CreateStudentModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateStudentModalFormComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateStudentModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the submit button when firstName and lastName are invalid', fakeAsync(async () => {
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    await fixture.whenStable();
    fixture.detectChanges();

    expect(submitButton.hasAttribute('disabled')).toBe(true);
  }));

  it('should enable the submit button when firstName and lastName are valid', async () => {
    const firstNameInput = fixture.nativeElement.querySelector('#firstname');
    const lastNameInput = fixture.nativeElement.querySelector('#lastname');
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );

    await fixture.whenStable();

    firstNameInput.value = 'First name test';
    lastNameInput.value = 'Last name test';

    firstNameInput.dispatchEvent(new Event('input'));
    lastNameInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(submitButton.hasAttribute('disabled')).toBe(false);
  });
});
