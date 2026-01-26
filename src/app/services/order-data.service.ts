import { Injectable } from '@angular/core';
import { CartItem } from './cart.service';

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface LastOrder {
  customerDetails: CustomerDetails;
  items: CartItem[];
  total: number;
  orderId: string;
  orderDate: string;
  paymentMethod: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderDataService {
  private lastOrder: LastOrder | null = null;

  constructor() { }

  setLastOrder(order: LastOrder): void {
    this.lastOrder = order;
  }

  getLastOrder(): LastOrder | null {
    return this.lastOrder;
  }

  clearLastOrder(): void {
    this.lastOrder = null;
  }

  generateOrderId(): string {
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `AUR-${new Date().getFullYear()}-${randomNum}`;
  }
}