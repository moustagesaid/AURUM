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

  // 4. Start with an empty list (it will fill up from the database)
  products: Product[] = [];

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
