import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  subName?: string;
  price: number;
  image: string;
  category: 'men' | 'women' | 'couples';
  badge?: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private totalCountSubject = new BehaviorSubject<number>(0);
  private totalPriceSubject = new BehaviorSubject<number>(0);

  // Public observables
  cartItems$ = this.cartItemsSubject.asObservable();
  totalCount$ = this.totalCountSubject.asObservable();
  totalPrice$ = this.totalPriceSubject.asObservable();

  constructor() {
    // Calculate initial values
    this.updateTotals();
  }

  addToCart(product: any): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItemIndex = currentItems.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
      // Item already exists, increase quantity
      currentItems[existingItemIndex].quantity += 1;
    } else {
      // Add new item
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        subName: product.subName,
        price: product.price,
        image: product.image,
        category: product.category,
        badge: product.badge,
        quantity: 1
      };
      currentItems.push(newItem);
    }

    this.cartItemsSubject.next([...currentItems]);
    this.updateTotals();
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartItemsSubject.value.filter(item => item.id !== productId);
    this.cartItemsSubject.next(currentItems);
    this.updateTotals();
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentItems = this.cartItemsSubject.value;
    const itemIndex = currentItems.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
      currentItems[itemIndex].quantity = quantity;
      this.cartItemsSubject.next([...currentItems]);
      this.updateTotals();
    }
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    this.updateTotals();
  }

  private updateTotals(): void {
    const currentItems = this.cartItemsSubject.value;
    const totalCount = currentItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = currentItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    this.totalCountSubject.next(totalCount);
    this.totalPriceSubject.next(totalPrice);
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  getTotalCount(): number {
    return this.totalCountSubject.value;
  }

  getTotalPrice(): number {
    return this.totalPriceSubject.value;
  }
}