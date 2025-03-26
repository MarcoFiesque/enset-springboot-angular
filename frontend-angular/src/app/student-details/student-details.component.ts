import { Component, inject, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment, Student } from 'app/model/students.model';
import { StudentsService } from 'app/services/students.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-student-details',
  standalone: false,
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit{
  private studentsService = inject(StudentsService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  public displayedColumns = [
    "id",
    // "student",
    "date",
    "amount",
    "type",
    "status",
    "file"
  ];

  public paymentsDataSource = new MatTableDataSource<Payment>();
  public studentPayments: Payment[] = [];
  public studentCode: string = '';
  public student: Student | null = null;
  public isLoading = true;
  public error: string | null = null;

  ngOnInit(): void {
    this.studentCode = this.activatedRoute.snapshot.params['code'];
    this.loadStudentData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadStudentData(): void {
    this.isLoading = true;
    this.error = null;

    this.studentsService.getStudentPayments(this.studentCode)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Payment[]) => {
          if(data.length){
            this.student = data[0].student;
          }
          this.studentPayments = data;
          this.paymentsDataSource.data = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to load student data';
          this.isLoading = false;
        }
      });
  }

  public newPayment(){
    this.router.navigateByUrl(`/admin/new-payment/${this.studentCode}`);
  }
}
