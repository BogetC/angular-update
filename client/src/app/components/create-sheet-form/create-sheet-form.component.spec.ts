import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSheetFormComponent } from './create-sheet-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('CreateSheetFormComponent', () => {
  let component: CreateSheetFormComponent;
  let fixture: ComponentFixture<CreateSheetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSheetFormComponent],
      imports: [HttpClientTestingModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateSheetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
