import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService, Order } from '../../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  totalRevenue: number = 0;
  totalOrders: number = 0;
  totalCustomers: number = 0;
  recentOrders: Order[] = [];
  currentUser: any = null;
  isLoading: boolean = true;
  activeSection: string = 'overview';

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        // Calculate total revenue
        this.totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

        // Calculate total orders
        this.totalOrders = orders.length;

        // Calculate total customers (unique customer names)
        const uniqueCustomers = new Set(orders.map(order => order.customerName));
        this.totalCustomers = uniqueCustomers.size;

        // Get recent orders (last 5, sorted by date descending)
        this.recentOrders = orders
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.isLoading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#FFC107'; // Yellow
      case 'shipped':
        return '#28A745'; // Green
      case 'delivered':
        return '#17A2B8'; // Blue
      case 'cancelled':
        return '#DC3545'; // Red
      default:
        return '#6C757D'; // Gray
    }
  }
}