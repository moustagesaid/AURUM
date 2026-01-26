import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class Checkout implements OnInit, OnDestroy {
  checkoutForm: FormGroup;
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      postalCode: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9\s\-]+$/)]],
      country: ['Morocco', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.cartService.cartItems$.subscribe(items => {
        this.cartItems = items;
      })
    );

    this.subscriptions.add(
      this.cartService.totalPrice$.subscribe(price => {
        this.totalPrice = price;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      this.submitOrder();
    } else {
      // Mark all fields as touched to show validation errors
      this.checkoutForm.markAllAsTouched();
    }
  }

  private submitOrder(): void {
    // Here you would typically send the order to your backend
    const orderData = {
      customer: this.checkoutForm.value,
      items: this.cartItems,
      total: this.totalPrice,
      paymentMethod: 'COD',
      orderDate: new Date().toISOString()
    };

    console.log('Order placed:', orderData);

    // Clear the cart
    this.cartService.clearCart();

    // Navigate to order confirmation page with order details
    this.router.navigate(['/order-confirmed'], {
      state: { orderDetails: orderData }
    });
  }

  getTotalItems(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Helper methods for form validation
  getFieldError(fieldName: string): string {
    const field = this.checkoutForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['pattern']) {
        if (fieldName === 'phone') {
          return 'Please enter a valid phone number';
        }
        if (fieldName === 'postalCode') {
          return 'Please enter a valid postal code';
        }
      }
    }
    return '';
  }
}