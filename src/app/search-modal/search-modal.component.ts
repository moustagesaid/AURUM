import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SearchService, Product } from '../services/search.service';
import { CartService } from '../services/cart.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.css'
})
export class SearchModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef<HTMLInputElement>;

  searchQuery = '';
  searchResults: Product[] = [];
  isSearching = false;
  hasSearched = false;

  constructor(
    private searchService: SearchService,
    private cartService: CartService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.isOpen) {
      this.focusSearchInput();
    }
  }

  ngAfterViewInit(): void {
    if (this.isOpen) {
      this.focusSearchInput();
    }
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  onSearchInput(): void {
    this.hasSearched = true;
    if (this.searchQuery.trim().length === 0) {
      this.searchResults = [];
      return;
    }

    this.isSearching = true;
    // Simulate slight delay for better UX
    setTimeout(() => {
      this.searchResults = this.searchService.searchProducts(this.searchQuery);
      this.isSearching = false;
    }, 150);
  }

  onClose(): void {
    this.searchQuery = '';
    this.searchResults = [];
    this.hasSearched = false;
    this.closeModal.emit();
  }

  onProductClick(product: Product): void {
    this.onClose();
    this.router.navigate(['/products'], {
      queryParams: { category: product.category }
    });
  }

  addToCart(product: Product, event: Event): void {
    event.stopPropagation();
    this.cartService.addToCart(product);
    const productName = `${product.name} ${product.subName || ''}`.trim();
    this.toastService.show(`${productName} added to cart!`);
  }

  onBackdropClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('search-modal-backdrop')) {
      this.onClose();
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.onClose();
    }
  }

  private focusSearchInput(): void {
    setTimeout(() => {
      if (this.searchInput) {
        this.searchInput.nativeElement.focus();
      }
    }, 100);
  }

  getCategoryLabel(category: string): string {
    const labels: { [key: string]: string } = {
      'men': 'Men',
      'women': 'Women',
      'couples': 'Couples'
    };
    return labels[category] || category;
  }
}
