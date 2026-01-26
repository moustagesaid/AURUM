import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

interface OrderDetails {
  orderId: string;
  customer: any;
  items: any[];
  total: number;
  orderDate: string;
}

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  orderDetails: OrderDetails | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get order details from router state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['orderDetails']) {
      this.orderDetails = navigation.extras.state['orderDetails'];
      // Generate a random order ID if not provided
      if (this.orderDetails && !this.orderDetails.orderId) {
        this.orderDetails.orderId = this.generateOrderId();
      }
    } else {
      // Fallback for direct navigation - create dummy data for testing
      this.orderDetails = {
        orderId: this.generateOrderId(),
        customer: { firstName: 'John', lastName: 'Doe' },
        items: [
          {
            id: 1,
            name: 'AURUM AXIS',
            subName: 'Eau de Parfum',
            price: 129.99,
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
            image: '/assets/aurumvant.png',
            category: 'women',
            selectedSize: '50ml',
            quantity: 1
          }
        ],
        total: 349.97, // 2 * 129.99 + 1 * 89.99
        orderDate: new Date().toISOString()
      };
    }
  }

  private generateOrderId(): string {
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `AUR-${new Date().getFullYear()}-${randomNum}`;
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
    if (!this.orderDetails || !this.orderDetails.customer) return 'VALUED CUSTOMER';
    return `${this.orderDetails.customer.firstName.toUpperCase()} ${this.orderDetails.customer.lastName.toUpperCase()}`;
  }
}