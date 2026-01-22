import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.apiUrl}/users?username=${username}&password=${password}&role=admin`)
      .pipe(
        map(users => {
          console.log('Auth service - users found:', users);
          if (users && users.length > 0) {
            const user = users[0];
            const sessionData = {
              id: user.id,
              username: user.username,
              name: user.name,
              role: user.role
            };
            localStorage.setItem('adminSession', JSON.stringify(sessionData));
            console.log('Auth service - session stored:', sessionData);
            return true;
          }
          console.log('Auth service - no users found');
          return false;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('adminSession');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('adminSession');
  }

  getCurrentUser(): any {
    const session = localStorage.getItem('adminSession');
    return session ? JSON.parse(session) : null;
  }
}