import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  onSubmit() {
    // Handle form submission
    console.log('Form submitted:', this.contactForm);
    // You can add your form submission logic here
    this.showSuccessModal = true;
  }

  closeModal() {
    this.showSuccessModal = false;
  }
}
