import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){

  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control('')
    })
  }

  public login(){
    let username: string = this.loginForm.value.username;
    let password: string = this.loginForm.value.password;
    let canLogin: boolean = this.authService.login(username, password);
    console.log(`${username} ${password} logged ? ${canLogin}`);
    if(canLogin){
      this.router.navigateByUrl('/admin');
    }
  }
  
}
