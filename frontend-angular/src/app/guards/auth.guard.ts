import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if(authService.isAuthenticated){
    return true;
  }
  router.navigateByUrl('/login');
  return false;

};

// @Injectable()
// export class AuthGuarg implements CanActivate{
//   constructor(private authService: AuthService, private router: Router){}
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
//     if(this.authService.isAuthenticated){
//       return true;
//     }
//     this.router.navigateByUrl('/login');
//     return false;
//   }
// }