import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Hero } from '../hero/hero';
import { Collection } from '../collection/collection';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, Hero, Collection],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  featuredFragrances = [
    {
      name: 'AUREUM',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing it fragrance',
      image: 'assets/herosection.png',
      route: ['/product', 'aurum']
    },
    {
      name: 'NOCTURNE',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing it fragrance',
      image: 'assets/bg%20man.png',
      route: ['/product', 'nocturne']
    }
  ];
}
