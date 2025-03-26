import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Payment, Student } from 'app/model/students.model';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private backendHostUrl: string;
  constructor(private http: HttpClient) {
    this.backendHostUrl = environment.backendHost;
  }
  
  public getAllPayments(): Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(`${this.backendHostUrl}/payments`);
  }

  public getAllStudents(): Observable<Array<Student>>{
    return this.http.get<Array<Student>>(`${this.backendHostUrl}/students`);
  }

  public getStudentPayments(studentId: string): Observable<Array<Payment>>{
    return this.http.get<Array<Payment>>(`${this.backendHostUrl}/students/${studentId}/payments`);
  }
}
