import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  isSidebarCollapsed = false;
  isMobileSidebarOpen = false;
  activeSection = 'dashboard';
  currentUser = {
    name: 'Admin',
    role: 'Master Curator'
  };

  navigationItems = [
    { id: 'dashboard', icon: '◆', title: 'Dashboard' },
    { id: 'products', icon: '⚗', title: 'Product Vault' },
    { id: 'orders', icon: '📦', title: 'Orders' },
    { id: 'customers', icon: '👤', title: 'Customers' },
    { id: 'analytics', icon: '📈', title: 'Analytics' }
  ];

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

  setActiveSection(sectionId: string) {
    this.activeSection = sectionId;
  }

  logout() {
    // Handle logout logic
    console.log('Logout clicked');
  }
}
