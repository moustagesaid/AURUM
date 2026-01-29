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

    // Load theme from localStorage on initialization
    const savedTheme = localStorage.getItem('aurum-theme') as Theme;
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      this._currentTheme.set(savedTheme);
    }

    // Apply theme on initialization
    this.applyTheme();
  }

  /**
   * Toggle between dark and light themes
   */
  toggleTheme(): void {
    const newTheme = this._currentTheme() === 'dark' ? 'light' : 'dark';
    this._currentTheme.set(newTheme);
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