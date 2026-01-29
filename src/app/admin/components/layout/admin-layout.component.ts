import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  isSidebarCollapsed = false;
  isMobileSidebarOpen = false;
  currentUser = {
    name: 'Alexander V.',
    role: 'Admin'
  };

  navigationItems = [
    { path: '/admin/dashboard', exact: true, icon: '◆', title: 'Dashboard' },
    { path: '/admin/products', exact: true, icon: '⚗', title: 'Products' },
    { path: '/admin/orders', exact: true, icon: '📦', title: 'Orders' },
    { path: '/admin/customers', exact: true, icon: '👤', title: 'Customers' },
    { path: '/admin/analytics', exact: true, icon: '📈', title: 'Analytics' }
  ];

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}
