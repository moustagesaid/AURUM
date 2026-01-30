import { Component, OnInit, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup implements OnInit {
  private authService = inject(AuthService);

  @Input() modalMode = false;
  @Output() signupSuccess = new EventEmitter<void>();
  @Output() backToLogin = new EventEmitter<void>();

  form!: FormGroup;
  signupError = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ mismatch: true });
    } else {
      const errors = confirmPassword?.errors;
      if (errors) {
        delete errors['mismatch'];
        confirmPassword?.setErrors(Object.keys(errors).length ? errors : null);
      }
    }
    return null;
  }

  onSubmit() {
    this.signupError = '';
    if (this.form.valid) {
      const { fullName, email, password } = this.form.value;
      const ok = this.authService.register(email!, password!, fullName!);
      if (ok) {
        if (this.modalMode) {
          this.signupSuccess.emit();
        } else {
          this.router.navigate(['/login']);
        }
      } else {
        this.signupError = 'Registration failed. Please try again.';
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  onBackToLoginClick(e: Event): void {
    if (this.modalMode) {
      e.preventDefault();
      this.backToLogin.emit();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }

  get fullName() { return this.form.get('fullName'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get confirmPassword() { return this.form.get('confirmPassword'); }
}