import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const adminSession = localStorage.getItem('adminSession');
    console.log('AuthGuard - checking session:', adminSession);

    if (adminSession) {
      console.log('AuthGuard - session found, allowing access');
      return true;
    } else {
      console.log('AuthGuard - no session found, redirecting to login');
      this.router.navigate(['/admin/login']);
      return false;
    }
  }
}