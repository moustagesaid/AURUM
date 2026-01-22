import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AdminService, DashboardStats } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  dashboardStats: DashboardStats | null = null;
  currentUser: any = null;
  isLoading: boolean = true;
  activeSection: string = 'overview';

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.adminService.getDashboardStats().subscribe({
      next: (stats) => {
        this.dashboardStats = stats;
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