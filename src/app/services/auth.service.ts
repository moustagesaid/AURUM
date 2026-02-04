import { Injectable, signal, computed, inject } from '@angular/core';
import { io, Socket } from 'socket.io-client';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role?: string;
  avatar?: string;
}

const STORAGE_KEY = 'aurum-user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(null);
  private socket: Socket; // 1. Add Socket property

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
    // 2. Connect to the Bridge Server
    this.socket = io('http://localhost:3000');
  }

  private loadFromStorage(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as User;
        if (data?.email) {
          this._user.set(data);
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

  // Use this for simple login verification
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

  // 3. UPDATED REGISTER: Now notifies the Admin Dashboard live
  register(email: string, password: string, fullName: string): boolean {
    const newUser = {
      id: `user-${Date.now()}`,
      username: email.trim().toLowerCase(), // Admin uses 'username' field
      email: email.trim().toLowerCase(),
      name: fullName.trim(),
      fullName: fullName.trim(),
      password: password, // In real life, don't send raw passwords!
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      role: 'customer'
    };

    // Save to local Frontend state
    this.setUser(newUser);

    // THE BRIDGE: Emit event to server.js
    // This makes the user appear in the Admin project automatically
    this.socket.emit('new_user_registered', newUser);

    return true;
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
      avatar: user.avatar,
      role: user.role || 'customer'
    };
    this._user.set(mappedUser);
    this.persist(mappedUser);
  }
}