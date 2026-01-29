import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="theme-toggle-btn"
      (click)="toggleTheme()"
      [attr.aria-label]="isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'"
      type="button">
      <!-- Sun icon for dark mode (shows sun to switch to light) -->
      <svg
        *ngIf="isDarkMode()"
        class="theme-icon sun-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>

      <!-- Moon icon for light mode (shows moon to switch to dark) -->
      <svg
        *ngIf="!isDarkMode()"
        class="theme-icon moon-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </button>
  `,
  styles: [`
    .theme-toggle-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border: none;
      background: transparent;
      color: var(--text-color);
      cursor: pointer;
      border-radius: 50%;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .theme-toggle-btn:hover {
      background: rgba(191, 158, 96, 0.1);
      transform: scale(1.05);
    }

    .theme-toggle-btn:active {
      transform: scale(0.95);
    }

    .theme-icon {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      flex-shrink: 0;
    }

    .sun-icon {
      color: var(--accent-gold);
    }

    .moon-icon {
      color: var(--accent-gold);
    }

    .theme-toggle-btn:hover .sun-icon {
      color: var(--accent-gold-light);
      transform: rotate(15deg);
    }

    .theme-toggle-btn:hover .moon-icon {
      color: var(--accent-gold-light);
      transform: scale(1.1);
    }
  `]
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);

  // Computed signal to check if current theme is dark
  isDarkMode = computed(() => this.themeService.currentTheme() === 'dark');

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}