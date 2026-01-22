import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Hero } from '../hero/hero';
import { Collection } from '../collection/collection';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Hero, Collection],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  // Featured fragrances data
  featuredFragrances = [
    {
      id: 'aurum',
      title: 'AURUM',
      description: 'A majestic blend of rare oudh and saffron, embodying the essence of pure luxury and timeless elegance.',
      image: 'assets/aurum-fragrance.jpg'
    },
    {
      id: 'nocturne',
      title: 'NOCTURNE',
      description: 'An intoxicating midnight symphony of dark amber, vanilla, and exotic spices that unfolds like a secret.',
      image: 'assets/nocturne-fragrance.jpg'
    }
  ];

  reviews = [
    {
      name: 'Sophia Rodriguez',
      rating: 5,
      comment: 'Aurum has transformed my signature scent. The craftsmanship is unparalleled.'
    },
    {
      name: 'Marcus Chen',
      rating: 5,
      comment: 'Every note tells a story. This fragrance is pure poetry in a bottle.'
    },
    {
      name: 'Isabella Thompson',
      rating: 5,
      comment: 'The longevity and depth of Nocturne is remarkable. Worth every moment of anticipation.'
    }
  ];

  newReview = {
    name: '',
    rating: 5,
    comment: ''
  };

  // Methods
  submitReview() {
    if (this.newReview.name && this.newReview.comment) {
      this.reviews.push({ ...this.newReview });
      this.newReview = { name: '', rating: 5, comment: '' };
    }
  }

  addToCart(product: any) {
    console.log('Added to cart:', product);
  }
}
