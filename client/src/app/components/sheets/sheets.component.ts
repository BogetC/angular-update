import { Component } from '@angular/core';
import { faEye, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { AttendanceSheet } from '../../models/AttendanceSheet';
import { SheetsService } from '../../services/sheets/sheets.service';

@Component({
  selector: 'app-sheets',
  templateUrl: './sheets.component.html',
  styleUrls: ['./sheets.component.css'],
})
export class SheetsComponent {
  sheets: AttendanceSheet[] = [];
  activeSheetActionDropdown?: AttendanceSheet;

  faEye = faEye;
  faAngleDown = faAngleDown;

  constructor(private sheetsService: SheetsService) {}

  ngOnInit() {
    this.sheetsService.getSheets().subscribe((data) => (this.sheets = data));
  }

  onActiveSheetDropdownClick = (aS: AttendanceSheet) => {
    if (
      this.activeSheetActionDropdown &&
      aS.ID === this.activeSheetActionDropdown.ID
    ) {
      this.activeSheetActionDropdown = undefined;
    } else {
      this.activeSheetActionDropdown = aS;
    }
  };

  onDeleteSheet = (sheetId: string) => {
    this.sheetsService
      .deleteSheet(sheetId)
      .subscribe(
        (data) => (this.sheets = this.sheets.filter((s) => s.ID !== data.ID))
      );
  };
}
