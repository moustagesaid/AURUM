import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
<<<<<<< HEAD
import { ToastService } from '../services/toast.service';
import { ProductSliderComponent } from '../product-slider/product-slider.component';
=======
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';
>>>>>>> 46fa8902fe2d15d74845763da46df3dd9aae9b1b

export interface Product {
  id: number;
  name: string;
  subName?: string;
  price: number;
  image: string;
  category: 'men' | 'women' | 'couples';
  badge?: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductSliderComponent],
  templateUrl: './products.html',
  styleUrl: './products.css',
  animations: [
    trigger('categoryTransition', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(100%)' }),
          stagger(100, [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true }),
        query(':leave', [
          stagger(100, [
            animate('400ms ease-in', style({ opacity: 0, transform: 'translateX(-100%)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('productSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(-50px)' }))
      ])
    ])
  ]
})
export class Products implements OnInit, OnDestroy {
  selectedCategory: 'men' | 'women' | 'couples' = 'women';
  private autoCycleInterval: any;
  private readonly CYCLE_INTERVAL = 8000; // 8 seconds per category

  constructor(private cartService: CartService, private toastService: ToastService) {}

  ngOnInit() {
    this.startAutoCycle();
  }

  ngOnDestroy() {
    this.stopAutoCycle();
  }

  private startAutoCycle() {
    this.autoCycleInterval = setInterval(() => {
      this.cycleToNextCategory();
    }, this.CYCLE_INTERVAL);
  }

  private stopAutoCycle() {
    if (this.autoCycleInterval) {
      clearInterval(this.autoCycleInterval);
    }
  }

  private cycleToNextCategory() {
    const categories: ('men' | 'women' | 'couples')[] = ['women', 'men', 'couples'];
    const currentIndex = categories.indexOf(this.selectedCategory);
    const nextIndex = (currentIndex + 1) % categories.length;
    this.selectedCategory = categories[nextIndex];
  }

  products: Product[] = [
    // Women's Products
    {
      id: 1,
      name: 'AURUM',
      subName: 'MIRA',
      price: 129.99,
      image: '/assets/mira.png',
      category: 'women'
    },
    {
      id: 2,
      name: 'AURUM',
      subName: 'LYRA',
      price: 149.99,
      image: '/assets/lyra.png',
      category: 'women'
    },
    {
      id: 3,
      name: 'AURUM',
      subName: 'MODA',
      price: 139.99,
      image: '/assets/moda.png',
      category: 'women'
    },
    {
      id: 4,
      name: 'AURUM',
      subName: 'NOVA',
      price: 159.99,
      image: '/assets/nova.png',
      category: 'women'
    },
    {
      id: 4,
      name: 'AURUM',
      subName: 'SOLIS',
      price: 159.99,
      image: '/assets/Solis.png',
      category: 'women'
    },
    {
      id: 4,
      name: 'OPULENCE',
      subName: 'Blossom',
      price: 159.99,
      image: '/assets/women6.png',
      category: 'women'
    },
    // Men's Products
    {
      id: 5,
      name: 'AURUM',
      subName: 'AXIS',
      price: 129.99,
      image: '/assets/aurumaxis.png',
      category: 'men'
    },
    {
      id: 6,
      name: 'AURUM',
      subName: 'VANT',
      price: 149.99,
      image: '/assets/aurumvant.png',
      category: 'men'
    },
    {
      id: 7,
      name: 'AURUM',
      subName: 'CORE',
      price: 139.99,
      image: '/assets/aurumcore.png',
      category: 'men'
    },
    {
      id: 8,
      name: 'AURUM',
      subName: ' LUXE',
      price: 159.99,
      image: '/assets/aurumluxe.png',
      category: 'men'
    },
    // Couples Product
    {
      id: 9,
      name: 'HIS & HERS',
      subName: 'Collection',
      price: 249.99,
      image: '/assets/products/couples-collection.jpg',
      category: 'couples',
      badge: 'SAVE 10%'
    }
  ];


  get filteredProducts(): Product[] {
    return this.products.filter(product => product.category === this.selectedCategory);
  }

  get couplesProduct(): Product | undefined {
    return this.filteredProducts.find(product => product.category === 'couples');
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.toastService.show(`${product.name}${product.subName ? ' ' + product.subName : ''} added to cart successfully!`);
  }

  selectCategory(category: 'men' | 'women' | 'couples'): void {
    this.stopAutoCycle();
    this.selectedCategory = category;
    // Restart auto-cycle after 15 seconds of user inactivity
    setTimeout(() => {
      this.startAutoCycle();
    }, 15000);
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }

  getProgressPercentage(): number {
    const categories: ('men' | 'women' | 'couples')[] = ['women', 'men', 'couples'];
    const currentIndex = categories.indexOf(this.selectedCategory);
    return ((currentIndex + 1) / categories.length) * 100;
  }
}
