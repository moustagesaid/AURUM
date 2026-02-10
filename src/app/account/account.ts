import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="account-page">
      <div class="account-container">
        <div class="account-card">
          <h1 class="account-title">My Account</h1>
          <p class="account-subtitle">Welcome back</p>
          @if (authService.user(); as user) {
            <div class="account-profile">
              <span class="account-avatar">{{ authService.initials() }}</span>
              <div class="account-info">
                <p class="account-name">{{ user.fullName || user.email }}</p>
                <p class="account-email">{{ user.email }}</p>
              </div>
            </div>
            <div class="account-actions">
              <a routerLink="/account/orders" class="account-btn">My Orders</a>
              <a routerLink="/products" class="account-btn outline">Continue Shopping</a>
              <button type="button" class="account-btn logout-btn" (click)="logout()">Log Out</button>
            </div>
          } @else {
            <p class="account-guest">Please log in to view your account.</p>
            <a routerLink="/login" class="account-btn">Log In</a>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .account-page {
        min-height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4rem 1.5rem;
        background: var(--bg-color);
      }
      .account-container {
        width: 100%;
        max-width: 480px;
      }
      .account-card {
        background: var(--bg-panel);
        border: 1px solid rgba(212, 175, 55, 0.25);
        border-radius: 20px;
        padding: 2.5rem;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15), 0 0 24px rgba(212, 175, 55, 0.06);
      }
      .account-title {
        font-family: 'Cinzel', serif;
        font-size: 2rem;
        font-weight: 600;
        color: var(--accent-gold);
        margin: 0 0 0.25rem 0;
        letter-spacing: 0.08em;
      }
      .account-subtitle {
        font-family: 'Montserrat', sans-serif;
        font-size: 1rem;
        color: var(--text-muted);
        margin: 0 0 2rem 0;
      }
      .account-profile {
        display: flex;
        align-items: center;
        gap: 1.25rem;
        padding: 1.5rem 0;
        border-top: 1px solid rgba(212, 175, 55, 0.15);
        border-bottom: 1px solid rgba(212, 175, 55, 0.15);
      }
      .account-avatar {
        width: 56px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-light));
        color: var(--bg-color);
        font-family: 'Cinzel', serif;
        font-size: 1.25rem;
        font-weight: 700;
        border-radius: 50%;
      }
      .account-name {
        font-family: 'Cinzel', serif;
        font-size: 1.2rem;
        color: var(--text-color);
        margin: 0 0 0.25rem 0;
      }
      .account-email {
        font-family: 'Montserrat', sans-serif;
        font-size: 0.9rem;
        color: var(--text-muted);
        margin: 0;
      }
      .account-actions {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-top: 1.5rem;
      }
      .account-btn {
        display: block;
        text-align: center;
        padding: 0.85rem 1.5rem;
        font-family: 'Montserrat', sans-serif;
        font-size: 0.9rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-decoration: none;
        border-radius: 8px;
        transition: all 0.25s ease;
      }
      .account-btn:not(.outline) {
        background: linear-gradient(135deg, var(--accent-gold), var(--accent-gold-light));
        color: var(--bg-color);
        border: none;
      }
      .account-btn:not(.outline):hover {
        box-shadow: 0 6px 20px rgba(212, 175, 55, 0.35);
      }
      .account-btn.outline {
        background: transparent;
        color: var(--accent-gold);
        border: 1px solid rgba(212, 175, 55, 0.5);
      }
      .account-btn.outline:hover {
        background: rgba(212, 175, 55, 0.1);
      }
      .account-guest {
        font-family: 'Montserrat', sans-serif;
        color: var(--text-muted);
        margin: 0 0 1rem 0;
      }
      .logout-btn {
        margin-top: 0.5rem;
        cursor: pointer;
      }
    `,
  ],
})
export class Account {
  authService = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
