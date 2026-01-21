import { Component } from '@angular/core';
<<<<<<< HEAD
import { CommonModule } from '@angular/common';
=======
import { FormsModule } from '@angular/forms';
>>>>>>> b0480f1c874c66255037b7bc5846b2745125da05
import { RouterModule } from '@angular/router';
import { Hero } from '../hero/hero';
import { Collection } from '../collection/collection';

@Component({
  selector: 'app-home',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, RouterModule, Hero, Collection],
=======
  imports: [Hero, Collection, FormsModule, RouterModule],
>>>>>>> b0480f1c874c66255037b7bc5846b2745125da05
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
<<<<<<< HEAD
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
=======
  // New data arrays and objects
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

  // New methods
  submitReview() {
    if (this.newReview.name && this.newReview.comment) {
      this.reviews.push({ ...this.newReview });
      this.newReview = { name: '', rating: 5, comment: '' };
    }
  }

  addToCart(product: any) {
    console.log('Added to cart:', product);
  }
>>>>>>> b0480f1c874c66255037b7bc5846b2745125da05
}
