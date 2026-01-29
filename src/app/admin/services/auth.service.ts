import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  name: string;
}

interface DbJson {
  users: User[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** Credentials are validated against users in assets/data/db.json */
  private dbUrl = 'assets/data/db.json';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<DbJson>(this.dbUrl).pipe(
      map(db => {
        const users = db?.users ?? [];
        const user = users.find(
          u => u.role === 'admin' && u.username === username && u.password === password
        );
        if (user) {
          const sessionData = {
            id: user.id,
            username: user.username,
            name: user.name,
            role: user.role
          };
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('adminSession', JSON.stringify(sessionData));
          }
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('adminSession');
    }
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('adminSession');
    }
    return false;
  }

  getCurrentUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      const session = localStorage.getItem('adminSession');
      return session ? JSON.parse(session) : null;
    }
    return null;
  }
}