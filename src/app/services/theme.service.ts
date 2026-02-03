import { Injectable, signal, computed, inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private document = inject(DOCUMENT);

  // Signal for current theme
  private _currentTheme = signal<Theme>('dark');

  // Computed signal for theme state
  public currentTheme = computed(() => this._currentTheme());

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);

    // Always use dark mode - remove light mode support
    this._currentTheme.set('dark');

    // Apply theme on initialization
    this.applyTheme();
  }

  /**
   * Toggle between dark and light themes
   * DISABLED: Light mode removed - always dark mode
   */
  toggleTheme(): void {
    // Light mode removed - always stay in dark mode
    this._currentTheme.set('dark');
    this.applyTheme();
    this.saveTheme();
  }

  /**
   * Set a specific theme
   */
  setTheme(theme: Theme): void {
    this._currentTheme.set(theme);
    this.applyTheme();
    this.saveTheme();
  }

  /**
   * Apply the current theme to the document
   */
  private applyTheme(): void {
    const theme = this._currentTheme();
    if (theme === 'light') {
      this.renderer.setAttribute(this.document.documentElement, 'data-theme', 'light');
    } else {
      this.renderer.removeAttribute(this.document.documentElement, 'data-theme');
    }
  }

  /**
   * Save theme preference to localStorage
   */
  private saveTheme(): void {
    localStorage.setItem('aurum-theme', this._currentTheme());
  }
}