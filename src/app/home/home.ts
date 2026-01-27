import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Hero } from '../hero/hero';
import { OrderService, Order } from '../services/order.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Hero, FormsModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  // Video state management
  videoActive = false;
  textHidden = false;
  indicatorHidden = false;

  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>;

  // Signature Collection with Olfactory Pyramid
  signatureCollection = [
    {
      id: 'aurum',
      name: 'AURUM',
      tagline: 'A majestic blend of rare oudh and saffron, embodying the essence of pure luxury and timeless elegance.',
      image: '/assets/aurumaxis.png',
      notes: [
        {
          name: 'Saffron',
          type: 'Top',
          icon: '🌸',
          description: 'Rare Persian saffron threads, harvested at dawn for their golden essence.'
        },
        {
          name: 'Oudh',
          type: 'Heart',
          icon: '🌿',
          description: 'Precious agarwood essence, aged for decades in sacred forests.'
        },
        {
          name: 'Amber',
          type: 'Base',
          icon: '💎',
          description: 'Fossilised tree resin, warmed by ancient sunlight and time.'
        }
      ]
    },
    {
      id: 'nocturne',
      name: 'NOCTURNE',
      tagline: 'An intoxicating midnight symphony of dark amber, vanilla, and exotic spices that unfolds like a secret.',
      image: '/assets/aurumvant.png',
      notes: [
        {
          name: 'Bergamot',
          type: 'Top',
          icon: '🍊',
          description: 'Italian bergamot essence, bright and citrus-fresh from Calabrian groves.'
        },
        {
          name: 'Jasmine',
          type: 'Heart',
          icon: '🌸',
          description: 'Night-blooming jasmine sambac, picked at midnight for maximum potency.'
        },
        {
          name: 'Vanilla',
          type: 'Base',
          icon: '🌰',
          description: 'Bourbon vanilla pods from Madagascar, cured for two years in darkness.'
        }
      ]
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


  constructor(private orderService: OrderService) {}

  // Video control methods
  onPlayButtonClick() {
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.play();
      this.videoActive = true;
      this.textHidden = true;
      this.indicatorHidden = true;
    }
  }

  onVideoEnd() {
    this.videoActive = false;
    this.textHidden = false;
    this.indicatorHidden = false;
  }

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
