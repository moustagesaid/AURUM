import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { ToastService } from '../services/toast.service';

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
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  selectedCategory: 'men' | 'women' | 'couples' = 'women';

  constructor(private cartService: CartService, private toastService: ToastService) {}

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
    this.toastService.show(`${product.name} ${product.subName || ''} added to cart!`);
  }

  selectCategory(category: 'men' | 'women' | 'couples'): void {
    this.selectedCategory = category;
  }
}
