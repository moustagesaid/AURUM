import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http'; // 1. Import HttpClient

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
  private http = inject(HttpClient); // 2. Inject HttpClient

  @Input() modalMode = false;
  @Output() loginSuccess = new EventEmitter<void>();
  @Output() openSignup = new EventEmitter<void>();
  @Output() openForgotPassword = new EventEmitter<void>();

  loginError = '';
  isLoading = false; // Added loading state for better UX

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

    this.isLoading = true;
    const { email, password } = this.form.getRawValue();

    // 3. Updated Logic: Fetch user from the JSON Database
    this.http.get<any[]>(`http://localhost:3004/users?username=${email}`).subscribe({
      next: (users) => {
        const user = users[0];

        // 4. Verify Password (Local testing only)
        if (user && user.password === password) {
          this.authService.setUser(user); // Ensure your AuthService has this method
          
          console.log(`Welcome back, ${user.name}`);

          if (this.modalMode) {
            this.loginSuccess.emit();
          } else {
            // If the user is an admin, you might want to redirect them to port 4201
            if (user.role === 'admin') {
              window.location.href = 'http://localhost:4201';
            } else {
              this.router.navigate(['/account']);
            }
          }
        } else {
          this.loginError = 'Invalid email or password. Please try again.';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Login connection error:', err);
        this.loginError = 'Could not connect to the authentication server.';
        this.isLoading = false;
      }
    });
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