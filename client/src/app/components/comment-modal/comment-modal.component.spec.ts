import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentModalComponent } from './comment-modal.component';
import { FormsModule } from '@angular/forms';

describe('CommentModalComponent', () => {
  let component: CommentModalComponent;
  let fixture: ComponentFixture<CommentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentModalComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
