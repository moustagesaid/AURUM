import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  showSuccessModal = false;

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    // Handle form submission
    console.log('Form submitted:', this.contactForm);
    // You can add your form submission logic here (e.g., API call)

    this.showSuccessModal = true;
  }

  closeModal(form?: NgForm) {
    this.showSuccessModal = false;
    if (form) {
      form.resetForm();
    }
    this.contactForm = { name: '', email: '', message: '' };
  }
}
