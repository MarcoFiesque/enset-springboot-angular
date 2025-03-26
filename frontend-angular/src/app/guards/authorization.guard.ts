import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

export const AuthorizationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if(authService.isAuthenticated){
    let requiredRoles = route.data['roles'];
    let userRoles: String[] = authService.roles;
    for(let role of userRoles){
        if(requiredRoles.includes(role)){
            return true;
        }
    }
    // router.navigateByUrl('/admin/home');
    return false;
  }
  router.navigateByUrl('/login');
  return false;

};