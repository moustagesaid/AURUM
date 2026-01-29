import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  template: `
    <div class="layout">
      <aside class="sidebar">
        <div class="sidebar__brand">
          <div class="brand">
            <div class="brand__title">AURUM</div>
            <div class="brand__subtitle">Command Center</div>
          </div>
        </div>

        <nav class="nav" aria-label="Admin navigation">
          <a class="nav__item nav__item--active" href="#">
            <span class="material-icons-outlined nav__icon">dashboard</span>
            <span class="nav__label">Dashboard</span>
          </a>
          <a class="nav__item" href="#">
            <span class="material-icons-outlined nav__icon">shopping_bag</span>
            <span class="nav__label">Orders</span>
          </a>
          <a class="nav__item" href="#">
            <span class="material-icons-outlined nav__icon">people</span>
            <span class="nav__label">VIP Clients</span>
          </a>
          <a class="nav__item" href="#">
            <span class="material-icons-outlined nav__icon">inventory_2</span>
            <span class="nav__label">Inventory</span>
          </a>
        </nav>

        <div class="sidebar__footer">
          <div class="user">
            <div class="user__avatar" aria-hidden="true">A</div>
            <div class="user__meta">
              <div class="user__name">{{ userName() }}</div>
              <button type="button" class="user__action" (click)="onLogoutClick()">Sign Out</button>
            </div>
          </div>
        </div>
      </aside>

      <main class="content">
        <div class="content__glow" aria-hidden="true"></div>
        <ng-content></ng-content>
      </main>
    </div>
  `,
  styleUrl: './dashboard-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardLayoutComponent {
  userName = input<string>('Admin');
  logout = input<() => void>(() => {});

  onLogoutClick(): void {
    this.logout()();
  }
}

