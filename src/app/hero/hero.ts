import { Component, inject, signal, computed } from '@angular/core';
import { NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  standalone: true,
  imports: [RouterLink, NgStyle]
})
export class Hero {
  private themeService = inject(ThemeService);

  // Background images (use existing assets; swap as needed)
  readonly defaultBg = 'url("assets/heros.png")';
  readonly lightBg = 'url("assets/lighthero.png")';
  readonly menBg = 'url("assets/menhome.png")';
<<<<<<< HEAD
  readonly womenBg = 'url("assets/womenherobg.png")';
=======
  readonly womenBg = 'url("assets/bgwomen.png")';
>>>>>>> 563f5d67f9103d97e4ab6dd1c9f0874b3bd24475

  /** Which hero variant is active (default uses theme to pick dark/light bg) */
  private section = signal<'default' | 'men' | 'women'>('default');

  /** Hero background image: theme-aware in default, men/women on hover */
  currentBackgroundImage = computed(() => {
    const s = this.section();
    if (s === 'men') return this.menBg;
    if (s === 'women') return this.womenBg;
    return this.themeService.currentTheme() === 'light' ? this.lightBg : this.defaultBg;
  });

  setBackground(type: 'men' | 'women' | 'default') {
    this.section.set(type);
  }
}
