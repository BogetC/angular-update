import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SheetsComponent } from './components/sheets/sheets.component';
import { SheetComponent } from './components/sheet/sheet.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignModalComponent } from './components/sign-modal/sign-modal.component';
import { CommentModalComponent } from './components/comment-modal/comment-modal.component';
import { FormsModule } from '@angular/forms';
import { AbsentModalComponent } from './components/absent-modal/absent-modal.component';
import { HomeComponent } from './components/home/home.component';
import { CreateSheetFormComponent } from './components/create-sheet-form/create-sheet-form.component';
import { CreateStudentModalFormComponent } from './components/create-student-modal-form/create-student-modal-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SheetsComponent,
    SheetComponent,
    FooterComponent,
    SignModalComponent,
    CommentModalComponent,
    AbsentModalComponent,
    HomeComponent,
    CreateSheetFormComponent,
    CreateStudentModalFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
