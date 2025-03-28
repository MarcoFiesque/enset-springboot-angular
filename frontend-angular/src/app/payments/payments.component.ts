import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Payment } from 'app/model/students.model';
import { StudentsService } from 'app/services/students.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-payments',
  standalone: false,
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit {
  private payments!: Payment[];
  private destroy$ = new Subject<void>();

  public datasource!: MatTableDataSource<Payment, MatPaginator>;
  public displayedColumns = [
    'id', 'amount', 'date', 'type', 'status', 'firstName'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private studentService: StudentsService){}
  ngOnInit(): void {
      this.studentService.getAllPayments()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: data => {
          this.payments = data ;
          this.datasource = new MatTableDataSource(this.payments);
          this.datasource.paginator = this.paginator;
          this.datasource.sort = this.sort;
        }, 
        error: err => {
          console.error(err);
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    
  }
}
