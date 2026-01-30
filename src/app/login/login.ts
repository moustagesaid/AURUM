import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  @Input() modalMode = false;
  @Output() loginSuccess = new EventEmitter<void>();
  @Output() openSignup = new EventEmitter<void>();
  @Output() openForgotPassword = new EventEmitter<void>();

  loginError = '';

  readonly form = new FormGroup({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  onSubmit(): void {
    this.loginError = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue();
    const ok = this.authService.login(email, password);
    if (ok) {
      if (this.modalMode) {
        this.loginSuccess.emit();
      } else {
        this.router.navigate(['/account']);
      }
    } else {
      this.loginError = 'Invalid email or password. Please try again.';
    }
  }

  onForgotPasswordClick(e: Event): void {
    if (this.modalMode) {
      e.preventDefault();
      this.openForgotPassword.emit();
    }
  }

  onSignupClick(e: Event): void {
    if (this.modalMode) {
      e.preventDefault();
      this.openSignup.emit();
    }
  }
}

