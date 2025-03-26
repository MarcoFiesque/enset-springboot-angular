import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Student } from 'app/model/students.model';
import { StudentsService } from 'app/services/students.service';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{
  public students!: Array<Student>;
  public dataSource!: MatTableDataSource<Student, MatPaginator>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns = [
    "id",
    "firstName",
    "programId",
    // "photo",
    "payments"
  ];

  private studentsService = inject(StudentsService);
  private router = inject(Router);

  ngOnInit(): void {
    this.studentsService.getAllStudents()
      .subscribe({
        next: data => {
          this.students = data
          this.dataSource = new MatTableDataSource(this.students)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
          
        },
        error: err => console.error(err)
      })
  }

  public studentPayments(student: Student){
    this.router.navigateByUrl(`/admin/student-details/${student.code}`);
  }

}
