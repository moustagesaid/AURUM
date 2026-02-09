import { Component, OnInit, OnDestroy, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // 1. Import HttpClient
import { CartService } from '../services/cart.service';
import { ToastService } from '../services/toast.service';
import { io, Socket } from 'socket.io-client'; // 2. Import Socket

export interface Product {
  id: any;
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
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit, OnDestroy {
  // 3. Inject dependencies for API and Live Updates
  private http = inject(HttpClient);
  private ngZone = inject(NgZone);
  private socket!: Socket;

  selectedCategory: 'men' | 'women' | 'couples' = 'women';

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
      id: 8,
      name: 'AURUM',
      subName: 'Back-end',
      price: 159.99,
      image: '/assets/f3.png',
      category: 'men'
    },
    {
      id: 8,
      name: 'AURUM',
      subName: 'Front-end',
      price: 159.99,
      image: '/assets/f2.png',
      category: 'men'
    },
    {
      id: 8,
      name: 'AURUM',
      subName: 'Foundation',
      price: 159.99,
      image: '/assets/f1.png',
      category: 'men'
    },
    {
      id: 8,
      name: 'AURUM',
      subName: 'Celebration',
      price: 159.99,
      image: '/assets/f4.png',
      category: 'men'
    },
    {
      id: 5,
      name: 'AURUM',
      subName: 'AXIS',
      price: 129.99,
      image: '/assets/aurum axis.png',
      category: 'men'
    },
    {
      id: 6,
      name: 'AURUM',
      subName: 'VANT',
      price: 149.99,
      image: '/assets/aurum vant.png',
      category: 'men'
    },

    {
      id: 7,
      name: 'AURUM',
      subName: 'CORE',
      price: 139.99,
      image: '/assets/aurum core.png',
      category: 'men'
    },
    {
      id: 8,
      name: 'AURUM',
      subName: 'LUXE',
      price: 159.99,
      image: '/assets/aurumluxe.png',
      category: 'men'
    },
    {
      id: 8,
      name: 'AURUM',
      subName: 'Ferrum',
      price: 159.99,
      image: '/assets/AURUM Ferrum.png',
      category: 'men'
    },
    {
      id: 8,
      name: 'AURUM',
      subName: 'Titanium',
      price: 159.99,
      image: '/assets/AURUM Titanium.png',
      category: 'men'
    },
    {
      id: 8,
      name: 'AURUM',
      subName: 'Cuprum',
      price: 159.99,
      image: '/assets/AURUM Cuprum.png',
      category: 'men'
    },

    // Packs Products
    {
      id: 9,
      name: 'MEN\'S PACK',
      subName: 'Essential Collection',
      price: 459.99,
      image: '/assets/mpack1.png',
      category: 'couples'
    },
    {
      id: 10,
      name: 'WOMEN\'S PACK',
      subName: 'Luxury Collection',
      price: 399.99,
      image: '/assets/wpack1.png',
      category: 'couples'
    }
  ];

  constructor(
    private cartService: CartService,
    private toastService: ToastService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // 5. Initial Load: Get products from db.json
    this.loadProducts();

    this.route.queryParams.subscribe((params) => {
      const category = params['category'];
      if (category === 'men' || category === 'women' || category === 'couples') {
        this.selectedCategory = category;
      }
    });

    // 6. Connect to Bridge Server to listen for updates
    this.socket = io('http://localhost:3000');

    // 7. LISTEN: When Admin adds a product, this runs automatically
    this.socket.on('refresh_product_list', () => {
      console.log('✨ Update detected! Refreshing catalog...');
      this.ngZone.run(() => {
        this.loadProducts();
      });
    });
  }

  // 8. The Logic to Fetch and Map Data
  loadProducts() {
    this.http.get<any[]>('http://localhost:3004/products').subscribe({
      next: (serverProducts) => {
        // We map the DB format (imageUrl, FOR WOMEN) to Frontend format (image, women)
        this.products = serverProducts.map(p => ({
          id: p.id,
          name: p.name,
          subName: p.subName || '',
          price: p.price,
          // Admin uses 'imageUrl', Frontend uses 'image'
          image: p.imageUrl || p.image || '/assets/default.png',
          // Map categories: 'FOR WOMEN' -> 'women'
          category: this.mapCategory(p.category),
          badge: p.stock < 5 && p.stock > 0 ? 'Low Stock' : (p.stock === 0 ? 'Sold Out' : p.badge)
        }));
      },
      error: (err) => console.error('Failed to load products:', err)
    });
  }

  // Helper to convert Admin categories to Frontend categories
  private mapCategory(adminCategory: string): 'men' | 'women' | 'couples' {
    const cat = adminCategory.toUpperCase();
    if (cat.includes('WOMEN')) return 'women';
    if (cat.includes('MEN')) return 'men';
    return 'couples';
  }

  get filteredProducts(): Product[] {
    return this.products.filter(product => product.category === this.selectedCategory);
  }

  get couplesProducts(): Product[] {
    return this.filteredProducts.filter(product => product.category === 'couples');
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.toastService.show(`${product.name} ${product.subName || ''} added to cart!`);
  }

  selectCategory(category: 'men' | 'women' | 'couples'): void {
    this.selectedCategory = category;
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
