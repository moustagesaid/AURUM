import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    // Only access localStorage in browser environment
    if (isPlatformBrowser(this.platformId)) {
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

    // During SSR, allow access (will be checked client-side)
    return true;
  }
}