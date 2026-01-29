import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.css',
  standalone: true,
  imports: [RouterLink, NgStyle]
})
export class Hero {
  // Background images (use existing assets; swap as needed)
  readonly defaultBg = 'url("assets/herosection.png")';
  readonly menBg = 'url("assets/menhome.png")';
  readonly womenBg = 'url("assets/bgwomenhero.jpg")';

  currentBackgroundImage = this.defaultBg;

  setBackground(type: 'men' | 'women' | 'default') {
    if (type === 'men') this.currentBackgroundImage = this.menBg;
    else if (type === 'women') this.currentBackgroundImage = this.womenBg;
    else this.currentBackgroundImage = this.defaultBg;
  }
}
