import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheetsComponent } from './components/sheets/sheets.component';
import { SheetComponent } from './components/sheet/sheet.component';
import { HomeComponent } from './components/home/home.component';
import { CreateSheetFormComponent } from './components/create-sheet-form/create-sheet-form.component';

const routes: Routes = [
  {
    path: 'sheets',
    children: [
      { path: 'create', component: CreateSheetFormComponent },
      { path: ':sheetId', component: SheetComponent },
      { path: '**', component: SheetsComponent },
    ],
  },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
