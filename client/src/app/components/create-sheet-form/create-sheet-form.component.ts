import { Component } from '@angular/core';
import { CreateSheetForm } from '../../models/forms/CreateSheetForm';
import { SheetsService } from '../../services/sheets/sheets.service';
import { Router } from '@angular/router';
import { CreateSheetRequest } from '../../models/http/CreateSheetRequest';

@Component({
  selector: 'app-create-sheet-form',
  templateUrl: './create-sheet-form.component.html',
  styleUrls: ['./create-sheet-form.component.css'],
})
export class CreateSheetFormComponent {
  sheetFormModel: CreateSheetForm = {
    name: '',
    start: undefined,
    duration: 60,
  };

  constructor(private sheetsService: SheetsService, private router: Router) {}

  onSubmit = () => {
    if (this.sheetFormModel.start && this.sheetFormModel.duration) {
      const start = new Date(this.sheetFormModel.start);
      const end = new Date(
        start.getTime() + this.sheetFormModel.duration * 60 * 1000
      );
      const payload: CreateSheetRequest = {
        name: this.sheetFormModel.name,
        start: start.toISOString(),
        end: end.toISOString(),
      };
      this.sheetsService.createSheet(payload).subscribe(async () => {
        await this.router.navigateByUrl('/sheets');
      });
    }
  };
}
