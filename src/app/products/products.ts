import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  products: Product[] = [
    // Women's Products
    {
      id: 1,
      name: 'ROYAL',
      subName: 'Elegance',
      price: 129.99,
      image: '/assets/products/women-royal.jpg',
      category: 'women'
    },
    {
      id: 2,
      name: 'NOCTURNE',
      subName: 'Mystique',
      price: 149.99,
      image: '/assets/products/women-nocturne.jpg',
      category: 'women'
    },
    {
      id: 3,
      name: 'VELVET',
      subName: 'Rose',
      price: 139.99,
      image: '/assets/products/women-velvet.jpg',
      category: 'women'
    },
    {
      id: 4,
      name: 'OPULENCE',
      subName: 'Blossom',
      price: 159.99,
      image: '/assets/products/women-opulence.jpg',
      category: 'women'
    },
    // Men's Products
    {
      id: 5,
      name: 'MAJESTIC',
      subName: 'Wood',
      price: 129.99,
      image: '/assets/products/men-majestic.jpg',
      category: 'men'
    },
    {
      id: 6,
      name: 'NOBLE',
      subName: 'Leather',
      price: 149.99,
      image: '/assets/products/men-noble.jpg',
      category: 'men'
    },
    {
      id: 7,
      name: 'EMPIRE',
      subName: 'Spice',
      price: 139.99,
      image: '/assets/products/men-empire.jpg',
      category: 'men'
    },
    {
      id: 8,
      name: 'REGAL',
      subName: 'Tobacco',
      price: 159.99,
      image: '/assets/products/men-regal.jpg',
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

  selectCategory(category: 'men' | 'women' | 'couples'): void {
    this.selectedCategory = category;
  }

  get filteredProducts(): Product[] {
    return this.products.filter(product => product.category === this.selectedCategory);
  }

  get couplesProduct(): Product | undefined {
    return this.filteredProducts.find(product => product.category === 'couples');
  }

  addToCart(product: Product): void {
    console.log('Added to cart:', product);
    // Add cart functionality here
  }
}
