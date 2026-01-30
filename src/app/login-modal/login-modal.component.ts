import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Login } from '../login/login';
import { Signup } from '../signup/signup';
import { ForgotPassword } from '../forgot-password/forgot-password';

type AuthView = 'login' | 'signup' | 'forgot-password';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, Login, Signup, ForgotPassword],
  template: `
    <div
      *ngIf="isOpen"
      class="login-modal-backdrop"
      (click)="onBackdropClick($event)"
      role="dialog"
      aria-modal="true"
      [attr.aria-label]="view === 'login' ? 'Log in' : view === 'signup' ? 'Create account' : 'Reset password'"
    >
      <div class="login-modal-container" (click)="$event.stopPropagation()">
        <button
          class="login-modal-close"
          (click)="close()"
          type="button"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        @switch (view) {
          @case ('login') {
            <app-login
              [modalMode]="true"
              (loginSuccess)="onLoginSuccess()"
              (openSignup)="view = 'signup'"
              (openForgotPassword)="view = 'forgot-password'"
            />
          }
          @case ('signup') {
            <app-signup
              [modalMode]="true"
              (signupSuccess)="onSignupSuccess()"
              (backToLogin)="view = 'login'"
            />
          }
          @case ('forgot-password') {
            <app-forgot-password
              [modalMode]="true"
              (backToLogin)="view = 'login'"
              (submitSuccess)="view = 'login'"
            />
          }
        }
      </div>
    </div>
  `,
  styles: [
    `
      .login-modal-backdrop {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        padding: 1.5rem;
      }

      .login-modal-container {
        position: relative;
        width: 100%;
        max-width: 480px;
      }

      .login-modal-close {
        position: absolute;
        top: -12px;
        right: -12px;
        z-index: 10;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(42, 42, 45, 0.95);
        border: 1px solid rgba(200, 164, 79, 0.4);
        border-radius: 50%;
        color: #e5d2a8;
        cursor: pointer;
        transition: background 0.2s, color 0.2s;
      }

      .login-modal-close:hover {
        background: rgba(200, 164, 79, 0.2);
        color: #fff;
      }
    `,
  ],
})
export class LoginModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();

  view: AuthView = 'login';

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpen) {
      this.view = 'login';
    }
  }

  close(): void {
    this.closeModal.emit();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  onLoginSuccess(): void {
    this.close();
    this.router.navigate(['/checkout']);
  }

  onSignupSuccess(): void {
    this.view = 'login';
    this.close();
    this.router.navigate(['/checkout']);
  }
}
