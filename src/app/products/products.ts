import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { ToastService } from '../services/toast.service';
import { ProductSliderComponent } from '../product-slider/product-slider.component';

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
  styleUrl: './products.css'
})
export class Products {
  selectedCategory: 'men' | 'women' | 'couples' = 'women';

  constructor(private cartService: CartService, private toastService: ToastService) {}

  products: Product[] = [
    // Women's Products
    {
      id: 1,
      name: 'ROYAL',
      subName: 'Elegance',
      price: 129.99,
      image: '/assets/women1.png',
      category: 'women'
    },
    {
      id: 2,
      name: 'NOCTURNE',
      subName: 'Mystique',
      price: 149.99,
      image: '/assets/women2.png',
      category: 'women'
    },
    {
      id: 3,
      name: 'VELVET',
      subName: 'Rose',
      price: 139.99,
      image: '/assets/women3.png',
      category: 'women'
    },
    {
      id: 4,
      name: 'OPULENCE',
      subName: 'Blossom',
      price: 159.99,
      image: '/assets/women4.png',
      category: 'women'
    },
    {
      id: 4,
      name: 'OPULENCE',
      subName: 'Blossom',
      price: 159.99,
      image: '/assets/women5.png',
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
    this.selectedCategory = category;
  }
}
