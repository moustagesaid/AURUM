import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../services/cart.service';
import { OrderDataService } from '../services/order-data.service';
import { OrderHistoryService } from '../services/order-history.service';
import { Subscription } from 'rxjs';

// 1. Import the socket client
import { io, Socket } from 'socket.io-client';

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
  
  // 2. Initialize the socket property
  private socket!: Socket;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderDataService: OrderDataService,
    private orderHistoryService: OrderHistoryService,
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
    // 3. Connect to your Bridge Server (Port 3000)
    this.socket = io('http://localhost:3000');

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
    // 4. Disconnect when leaving the page
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      this.submitOrder();
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }

  private submitOrder(): void {
    const orderId = this.orderDataService.generateOrderId();

    const orderData = {
      customerDetails: this.checkoutForm.value,
      items: this.cartItems,
      total: this.totalPrice,
      orderId: orderId,
      orderDate: new Date().toISOString(),
      paymentMethod: 'COD'
    };

    console.log('Order placed:', orderData);

    // 5. THE BRIDGE: Send the order signal to the Admin Dashboard
    // This triggers the 'new_order_notification' in your Admin app
    this.socket.emit('place_order', orderData);

    // Save order data locally
    this.orderDataService.setLastOrder(orderData);
    this.orderHistoryService.addOrder(orderData);

    // Clear the cart
    this.cartService.clearCart();

    // Navigate to order confirmation
    this.router.navigate(['/order-confirmed']);
  }

  getTotalItems(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  getFieldError(fieldName: string): string {
    const field = this.checkoutForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['minlength']) return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['pattern']) return `Invalid ${fieldName} format`;
    }
    return '';
  }
}