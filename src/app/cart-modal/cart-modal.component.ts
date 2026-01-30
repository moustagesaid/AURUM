import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css'
})
export class CartModalComponent implements OnInit, OnDestroy {
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() requestLogin = new EventEmitter<void>();

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  private subscriptions: Subscription = new Subscription();

  constructor(private cartService: CartService) {}

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

  close(): void {
    this.closeModal.emit();
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  updateSize(productId: number, size: '50ml' | '100ml'): void {
    this.cartService.updateSize(productId, size);
  }

  proceedToCheckout(): void {
    this.close();
    this.requestLogin.emit();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}