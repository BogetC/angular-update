import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SheetsComponent } from './sheets.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SheetsComponent', () => {
  let component: SheetsComponent;
  let fixture: ComponentFixture<SheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SheetsComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
