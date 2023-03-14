import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { AttendanceSheet } from '../../models/AttendanceSheet';
import { UpdateStudentRequest } from '../../models/http/UpdateStudentRequest';
import { Student } from '../../models/Student';
import { CreateSheetRequest } from '../../models/http/CreateSheetRequest';
import { CreateStudentRequest } from '../../models/http/CreateStudentRequest';

@Injectable({
  providedIn: 'root',
})
export class SheetsService {
  private sheetsServiceProviderURL = 'http://localhost:5000/api';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getSheets = (): Observable<AttendanceSheet[]> => {
    return this.http
      .get<AttendanceSheet[]>(
        `${this.sheetsServiceProviderURL}/sheets`,
        this.httpOptions
      )
      .pipe(
        tap((_) => this.log('Sheets fetched')),
        catchError(this.handleError<AttendanceSheet[]>('getSheets', []))
      );
  };

  getSheet = (sheetId: string): Observable<AttendanceSheet> => {
    return this.http
      .get<AttendanceSheet>(
        `${this.sheetsServiceProviderURL}/sheets/${sheetId}`,
        this.httpOptions
      )
      .pipe(
        tap((_) => this.log('Sheet fetched')),
        catchError(this.handleError<AttendanceSheet>('getSheet'))
      );
  };

  createSheet = (payload: CreateSheetRequest): Observable<AttendanceSheet> => {
    return this.http
      .post<AttendanceSheet>(
        `${this.sheetsServiceProviderURL}/sheets`,
        payload,
        this.httpOptions
      )
      .pipe(
        tap((_) => this.log('Sheet created')),
        catchError(this.handleError<AttendanceSheet>('createSheet'))
      );
  };

  deleteSheet = (sheetId: string): Observable<AttendanceSheet> => {
    return this.http
      .delete<AttendanceSheet>(
        `${this.sheetsServiceProviderURL}/sheets/${sheetId}`,
        this.httpOptions
      )
      .pipe(
        tap((_) => this.log('Sheet deleted')),
        catchError(this.handleError<AttendanceSheet>('deleteSheet'))
      );
  };

  createStudent = (
    sheetId: string,
    payload: CreateStudentRequest
  ): Observable<Student> => {
    return this.http
      .post<Student>(
        `${this.sheetsServiceProviderURL}/sheets/${sheetId}/students`,
        payload,
        this.httpOptions
      )
      .pipe(
        tap((_) => this.log('Student created')),
        catchError(this.handleError<Student>('createStudent'))
      );
  };

  updateStudent = (
    sheetId: string,
    studentId: string,
    payload: UpdateStudentRequest
  ): Observable<Student> => {
    return this.http
      .put<Student>(
        `${this.sheetsServiceProviderURL}/sheets/${sheetId}/students/${studentId}`,
        payload,
        this.httpOptions
      )
      .pipe(
        tap((_) => this.log('Student updated')),
        catchError(this.handleError<Student>('updateStudent'))
      );
  };

  deleteStudent = (sheetId: string, studentId: string): Observable<Student> => {
    return this.http
      .delete<Student>(
        `${this.sheetsServiceProviderURL}/sheets/${sheetId}/students/${studentId}`,
        this.httpOptions
      )
      .pipe(
        tap((_) => this.log('Student deleted')),
        catchError(this.handleError<Student>('deleteStudent'))
      );
  };

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
