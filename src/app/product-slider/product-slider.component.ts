import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
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
  selector: 'app-product-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.css'
})
export class ProductSliderComponent implements OnChanges {
  @Input() products: Product[] = [];
  @Input() sectionTitle: string = 'PRODUCTS';

  currentIndex = 0;

  constructor(private cartService: CartService, private toastService: ToastService) {}

  get transformStyle(): string {
    const translateX = this.currentIndex * 33.333;
    return `translateX(-${translateX}%)`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      this.currentIndex = 0;
    }
  }

  next(): void {
    if (this.currentIndex < this.products.length - 3) {
      this.currentIndex++;
    }
  }

  previous(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.toastService.show(`${product.name}${product.subName ? ' ' + product.subName : ''} added to cart successfully!`);
  }

}