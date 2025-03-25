import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  private users:any = {
    admin: {password:"1234", roles: ["STUDENT", "ADMIN"]},
    user1: {password:"1234", roles: ["STUDENT"]},
  }
  
  constructor() { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
