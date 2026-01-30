import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { OrderHistoryService } from '../services/order-history.service';
import { LastOrder } from '../services/order-data.service';

@Component({
  selector: 'app-orders-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './orders-history.component.html',
  styleUrl: './orders-history.component.css',
})
export class OrdersHistoryComponent implements OnInit {
  private authService = inject(AuthService);
  private orderHistoryService = inject(OrderHistoryService);
  private router = inject(Router);

  orders: LastOrder[] = [];
  isLoading = true;

  ngOnInit(): void {
    const user = this.authService.user();
    if (!user?.email) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/account/orders' } });
      return;
    }
    this.orders = this.orderHistoryService.getOrdersForUser(user.email);
    this.isLoading = false;
  }

  formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  formatTotal(total: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(total);
  }
}
