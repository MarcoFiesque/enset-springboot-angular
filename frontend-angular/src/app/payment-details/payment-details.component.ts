import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payment } from 'app/model/students.model';
import { StudentsService } from 'app/services/students.service';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-payment-details',
  standalone: false,
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit{
  private studentService: StudentsService;
  private activatedRoute: ActivatedRoute;
  private paymentId!: number;
  private destroy$ = new Subject<void>();


  public paymentFile!: BinaryType;
  public payment!: Payment;
  pdfFileUrl!: string;
;

  constructor(studentService: StudentsService, activatedRoute: ActivatedRoute){
    this.studentService = studentService;
    this.activatedRoute = activatedRoute;
  }

  ngOnInit(): void {
  this.paymentId = this.activatedRoute.snapshot.params['id'];

  // this.studentService.getPayment(this.paymentId)
  // .pipe(takeUntil(this.destroy$))
  // .subscribe({
  //   next: data => {
  //     this.payment = data
  //     },
  //     error: err =>{
  //       console.error(err);
  //     }
  //   })

    this.studentService.getPaymentFile(this.paymentId)
    .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Blob) => {
          console.log(data);
          
          let blob = new Blob([data], {type: "application/pdf"});
          this.pdfFileUrl = window.URL.createObjectURL(blob);
        },
        error: err => {
          console.error(err);
        }
      })
  }

  afterLoadComplete(event:PDFDocumentProxy){console.log(event)}
    
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    
  }
}
