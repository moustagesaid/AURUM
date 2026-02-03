import { Injectable, signal, computed } from '@angular/core';

export interface User {
  id: string;
  email: string;
  fullName: string;
}

const STORAGE_KEY = 'aurum-user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(null);

  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => this._user() !== null);
  readonly displayName = computed(() => {
    const u = this._user();
    if (!u) return '';
    return u.fullName?.trim() || u.email?.split('@')[0] || 'Account';
  });
  readonly initials = computed(() => {
    const u = this._user();
    if (!u) return '?';
    const name = (u.fullName || u.email).trim();
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  });

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as User;
        if (data?.email) {
          this._user.set({
            id: data.id || `user-${Date.now()}`,
            email: data.email,
            fullName: data.fullName ?? '',
          });
        }
      }
    } catch {
      this._user.set(null);
    }
  }

  private persist(user: User | null): void {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  login(email: string, password: string, fullName?: string): boolean {
    const name = fullName?.trim() || email.split('@')[0] || 'Guest';
    const user: User = {
      id: `user-${Date.now()}`,
      email: email.trim().toLowerCase(),
      fullName: name,
    };
    this._user.set(user);
    this.persist(user);
    return true;
  }

  register(email: string, password: string, fullName: string): boolean {
    return this.login(email, password, fullName);
  }

  logout(): void {
    this._user.set(null);
    this.persist(null);
  }

  setUser(user: any): void {
    const mappedUser: User = {
      id: user.id || `user-${Date.now()}`,
      email: user.email || user.username,
      fullName: user.name || user.fullName || '',
    };
    this._user.set(mappedUser);
    this.persist(mappedUser);
  }
}
