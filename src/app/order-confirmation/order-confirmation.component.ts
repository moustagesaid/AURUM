import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderDataService, LastOrder } from '../services/order-data.service';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  orderDetails: LastOrder | null = null;

  constructor(
    private router: Router,
    private orderDataService: OrderDataService
  ) {}

  ngOnInit(): void {
    // Get order details from OrderDataService
    this.orderDetails = this.orderDataService.getLastOrder();

    // Fallback for direct navigation - create dummy data for testing
    if (!this.orderDetails) {
      this.orderDetails = {
        orderId: this.orderDataService.generateOrderId(),
        customerDetails: { firstName: 'John', lastName: 'Doe', email: '', phone: '', address: '', city: '', postalCode: '', country: '' },
        items: [
          {
            id: 1,
            name: 'AURUM AXIS',
            subName: 'Eau de Parfum',
            price: 129.99,
            basePrice: 129.99,
            image: '/assets/aurumaxis.png',
            category: 'men',
            selectedSize: '100ml',
            quantity: 2
          },
          {
            id: 2,
            name: 'AURUM VANT',
            subName: 'Eau de Toilette',
            price: 89.99,
            basePrice: 89.99,
            image: '/assets/aurumvant.png',
            category: 'women',
            selectedSize: '50ml',
            quantity: 1
          }
        ],
        total: 349.97, // 2 * 129.99 + 1 * 89.99
        orderDate: new Date().toISOString(),
        paymentMethod: 'COD'
      };
    }
  }



  continueShopping(): void {
    this.router.navigate(['/']);
  }

  trackOrder(): void {
    // For now, just show an alert. In a real app, this would navigate to order tracking
    alert(`Order tracking for ${this.orderDetails?.orderId} will be available soon!`);
  }

  getEstimatedDelivery(): string {
    return '2-4 Business Days';
  }

  getCustomerName(): string {
    if (!this.orderDetails || !this.orderDetails.customerDetails) return 'VALUED CUSTOMER';
    return `${this.orderDetails.customerDetails.firstName.toUpperCase()} ${this.orderDetails.customerDetails.lastName.toUpperCase()}`;
  }
}