import { formatDate } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentType } from 'app/model/students.model';
import { StudentsService } from 'app/services/students.service';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-new-payment',
  standalone: false,
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.css'
})
export class NewPaymentComponent implements OnInit{
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private studentService = inject(StudentsService);
  private fb = inject(FormBuilder);

  public paymentFormGroup!: FormGroup;
  public paymentTypes: string[] = [];
  public studentCode!: String;
  public pdfFileUrl: string = '';
  public isUploading: boolean = false;

  ngOnInit(): void {
    for(let value of Object.values(PaymentType)){
      if (typeof value === 'string') this.paymentTypes.push(value);
    }
    
    this.studentCode = this.activatedRoute.snapshot.params['code'];
    
    this.paymentFormGroup = this.fb.group({
      date: this.fb.control(''),
      amount: this.fb.control(''),
      type: this.fb.control(''),
      studentCode: this.fb.control(this.studentCode),
      fileSource: this.fb.control(''),
      fileName: this.fb.control(''),
    });
  }

  public selectFile(event:Event){
    this.isUploading = true;
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file && file.size > 5 * 1024 * 1024) { // 5MB
      alert('File too big!');
      this.isUploading = false;
    return;
  }

    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0){
      let file = target.files[0];
      this.paymentFormGroup.patchValue({
        fileSource: file,
        fileName: file.name
      });
      this.pdfFileUrl = window.URL.createObjectURL(file);
      this.isUploading = false;
    }
  }

  public savePayment(){
    this.isUploading = true;
    let date = new Date(this.paymentFormGroup.value.date)
    let formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    // this.showProgess = true;

    let formData = new FormData();
    formData.set('file', this.paymentFormGroup.get('fileSource')!.value);
    formData.set('date', formattedDate);
    formData.set('amount', this.paymentFormGroup.value.amount);
    formData.set('type', this.paymentFormGroup.value.type);
    formData.set('studentCode', this.paymentFormGroup.value.studentCode);
    
    this.studentService.savePayments(formData).subscribe({
      next: data => {
        this.isUploading = false;
        this.router.navigateByUrl(`/admin/student-details/${this.studentCode}`);
      },
      error: err => {
        console.error(err);
        this.isUploading = false;
      }
    });
    // formData.append('file', this.paymentFormGroup.get('filesource')!.value);
    // formData.append('amount', this.paymentFormGroup.value('amount'));
    // formData.append('type', this.paymentFormGroup.value('type'));
    // formData.append('date', this.paymentFormGroup.value('date'));
    // formData.append('studentCode', this.paymentFormGroup.value('studentCode'));

    // this.paymentService.
  }

  afterLoadComplete(event: PDFDocumentProxy){console.log(event)}

  ngOnDestroy() {
    if (this.pdfFileUrl) {
      URL.revokeObjectURL(this.pdfFileUrl); // Libère la mémoire
    }
  }
}
