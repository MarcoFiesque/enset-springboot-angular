import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentType } from 'app/model/students.model';

@Component({
  selector: 'app-new-payment',
  standalone: false,
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.css'
})
export class NewPaymentComponent implements OnInit{
  private activatedRoute = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  
  public paymentFormGroup!: FormGroup;
  public paymentTypes: string[] = [];
  public studentCode!: String;
  public pdfFileUrl: string = '';
  public isUploading: boolean = false;

  ngOnInit(): void {
    console.log(Object.values(PaymentType));
    
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
      console.log(this.pdfFileUrl);
      this.isUploading = false;
    }
  }

  public savePayment(){

  }

  ngOnDestroy() {
    if (this.pdfFileUrl) {
      URL.revokeObjectURL(this.pdfFileUrl); // Libère la mémoire
    }
  }
}
