import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword implements OnInit {
  @Input() modalMode = false;
  @Output() backToLogin = new EventEmitter<void>();
  @Output() submitSuccess = new EventEmitter<void>();

  form!: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Forgot password form submitted:', this.form.value);
      this.isSubmitted = true;

      if (this.modalMode) {
        setTimeout(() => {
          this.submitSuccess.emit();
        }, 2000);
      } else {
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
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

  get email() { return this.form.get('email'); }
}