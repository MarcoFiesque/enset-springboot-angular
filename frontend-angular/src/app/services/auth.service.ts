import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  
  private users:any = {
    admin: {password:"1234", roles: ["STUDENT", "ADMIN"]},
    user1: {password:"1234", roles: ["STUDENT"]},
  }
  public username?: string;
  public isAuthenticated: boolean = false;
  public roles: string[] = [];

  constructor(private router: Router){}

  login(username: string, password: string){
    if (this.users[username] && this.users[username]["password"] === password){
      this.username = username;
      this.isAuthenticated = true;
      this.roles = this.users[username]["roles"];
      return true;
    }
    return false;
  }

  logout(){
    this.isAuthenticated = false;
    this.username = undefined;
    this.roles = [];

    this.router.navigateByUrl('/login');
  }

}
