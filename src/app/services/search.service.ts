import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  subName?: string;
  price: number;
  image: string;
  category: 'men' | 'women' | 'couples';
  badge?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private allProducts: Product[] = [
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
      id: 5,
      name: 'AURUM',
      subName: 'SOLIS',
      price: 159.99,
      image: '/assets/Solis.png',
      category: 'women'
    },
    {
      id: 6,
      name: 'OPULENCE',
      subName: 'Blossom',
      price: 159.99,
      image: '/assets/women6.png',
      category: 'women'
    },
    // Men's Products
    {
      id: 7,
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
      id: 9,
      name: 'AURUM',
      subName: 'Foundation',
      price: 159.99,
      image: '/assets/f1.png',
      category: 'men'
    },
    {
      id: 10,
      name: 'AURUM',
      subName: 'Celebration',
      price: 159.99,
      image: '/assets/f4.png',
      category: 'men'
    },
    {
      id: 11,
      name: 'AURUM',
      subName: 'AXIS',
      price: 129.99,
      image: '/assets/aurum axis.png',
      category: 'men'
    },
    {
      id: 12,
      name: 'AURUM',
      subName: 'VANT',
      price: 149.99,
      image: '/assets/aurum vant.png',
      category: 'men'
    },
    {
      id: 13,
      name: 'AURUM',
      subName: 'CORE',
      price: 139.99,
      image: '/assets/aurum core.png',
      category: 'men'
    },
    {
      id: 14,
      name: 'AURUM',
      subName: 'LUXE',
      price: 159.99,
      image: '/assets/aurumluxe.png',
      category: 'men'
    },
    {
      id: 15,
      name: 'AURUM',
      subName: 'Ferrum',
      price: 159.99,
      image: '/assets/AURUM Ferrum.png',
      category: 'men'
    },
    {
      id: 16,
      name: 'AURUM',
      subName: 'Titanium',
      price: 159.99,
      image: '/assets/AURUM Titanium.png',
      category: 'men'
    },
    {
      id: 17,
      name: 'AURUM',
      subName: 'Cuprum',
      price: 159.99,
      image: '/assets/AURUM Cuprum.png',
      category: 'men'
    },
    // Couples Product
    {
      id: 18,
      name: 'HIS & HERS',
      subName: 'Collection',
      price: 249.99,
      image: '/assets/products/couples-collection.jpg',
      category: 'couples',
      badge: 'SAVE 10%'
    }
  ];

  /**
   * Search products by query string
   * Searches in name, subName, and category
   */
  searchProducts(query: string): Product[] {
    if (!query || query.trim().length === 0) {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();
    
    return this.allProducts.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(searchTerm);
      const subNameMatch = product.subName?.toLowerCase().includes(searchTerm);
      const categoryMatch = product.category.toLowerCase().includes(searchTerm);
      const fullNameMatch = `${product.name} ${product.subName || ''}`.toLowerCase().includes(searchTerm);
      
      return nameMatch || subNameMatch || categoryMatch || fullNameMatch;
    });
  }

  /**
   * Get all products
   */
  getAllProducts(): Product[] {
    return this.allProducts;
  }
}
