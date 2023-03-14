import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbsentModalComponent } from './absent-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AbsentModalComponent', () => {
  let component: AbsentModalComponent;
  let fixture: ComponentFixture<AbsentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AbsentModalComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AbsentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
