import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentsComponent } from './students/students.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { LoadStudentsComponent } from './load-students/load-students.component';
import { LoadPaymentsComponent } from './load-payments/load-payments.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthorizationGuard } from './guards/authorization.guard';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "login", component: LoginComponent},
  {path: "admin", component: AdminTemplateComponent, 
    // canActivate: [AuthGuard], 
    children: [
    {path: "home", component: HomeComponent},
    {path: "dashboard", component: DashboardComponent},
    {path: "students", component: StudentsComponent},
    {path: "load-students", 
      canActivate:[AuthorizationGuard], 
      data: {roles:['ADMIN']},
      component: LoadStudentsComponent},
    {path: "load-payments", component: LoadPaymentsComponent},
    {path: "payments", component: PaymentsComponent},
    {path: "profile", component: ProfileComponent},
  ]},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
