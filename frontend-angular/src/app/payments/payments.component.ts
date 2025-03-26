import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-payments',
  standalone: false,
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit {
  private payments: any;
  public datasource: any;
  public displayedColumns = [
    'id', 'firstName', 'amount', 'date', 'type', 'status'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient){}
  ngOnInit(): void {
      this.http.get("http://localhost:8088/payments").subscribe({
        next: data => {
          this.payments = data ;
          this.datasource = new MatTableDataSource(this.payments);
          this.datasource.paginator = this.paginator;
          this.datasource.sort = this.sort;
        }, 
        error: err => {
          console.log(err);
        }
      })
  }
}
