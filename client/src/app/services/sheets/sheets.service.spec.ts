import { TestBed } from '@angular/core/testing';

import { SheetsService } from './sheets.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SheetsService', () => {
  let service: SheetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SheetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
