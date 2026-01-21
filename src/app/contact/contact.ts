import { NgForm } from '@angular/forms';

export class Contact {
  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  showSuccessModal: boolean = false;

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
