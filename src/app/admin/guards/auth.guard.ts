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
    // Only allow access in the browser when we have a valid session
    if (!isPlatformBrowser(this.platformId)) {
      return false; // Block during SSR; client will run guard again after hydration
    }

    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
      return true;
    }

    this.router.navigate(['/admin/login']);
    return false;
  }
}