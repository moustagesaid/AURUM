import { Component, OnInit, OnDestroy, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { ThemeToggleComponent } from '../theme-toggle.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    CartModalComponent,
    LoginModalComponent,
    ThemeToggleComponent,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  authService = inject(AuthService);
  private cartService = inject(CartService);

  cartItemCount = 0;
  isCartModalOpen = false;
  isLoginModalOpen = false;
  isProfileOpen = false;
  private subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.cartService.totalCount$.subscribe(count => {
        this.cartItemCount = count;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (this.isProfileOpen && !target.closest('.profile-trigger-wrap')) {
      this.isProfileOpen = false;
    }
  }

  openCartModal(): void {
    this.isCartModalOpen = true;
  }

  closeCartModal(): void {
    this.isCartModalOpen = false;
  }

  openLoginModal(): void {
    this.isCartModalOpen = false;
    this.isLoginModalOpen = true;
  }

  closeLoginModal(): void {
    this.isLoginModalOpen = false;
  }

  toggleProfileDropdown(): void {
    this.isProfileOpen = !this.isProfileOpen;
  }

  closeProfileDropdown(): void {
    this.isProfileOpen = false;
  }

  logout(): void {
    this.authService.logout();
  }
}
