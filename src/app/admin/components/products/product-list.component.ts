import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  status: 'active' | 'inactive' | 'draft';
  dateAdded: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [
    {
      id: 1,
      name: 'Aurum Noir',
      price: 285,
      image: 'https://picsum.photos/seed/aurum1/60/60',
      category: 'Premium',
      stock: 45,
      status: 'active',
      dateAdded: '2024-01-15'
    },
    {
      id: 2,
      name: 'Golden Essence',
      price: 320,
      image: 'https://picsum.photos/seed/aurum2/60/60',
      category: 'Luxury',
      stock: 23,
      status: 'active',
      dateAdded: '2024-01-20'
    },
    {
      id: 3,
      name: 'Midnight Gold',
      price: 195,
      image: 'https://picsum.photos/seed/aurum3/60/60',
      category: 'Classic',
      stock: 67,
      status: 'active',
      dateAdded: '2024-02-01'
    },
    {
      id: 4,
      name: 'Royal Amber',
      price: 410,
      image: 'https://picsum.photos/seed/aurum4/60/60',
      category: 'Signature',
      stock: 12,
      status: 'inactive',
      dateAdded: '2024-02-10'
    },
    {
      id: 5,
      name: 'Celestial Gold',
      price: 375,
      image: 'https://picsum.photos/seed/aurum5/60/60',
      category: 'Limited',
      stock: 8,
      status: 'draft',
      dateAdded: '2024-02-15'
    }
  ];

  filteredProducts: Product[] = [...this.products];
  searchTerm = '';
  categoryFilter = '';
  selectedCategory = 'all';
  selectedStatus = 'all';

  categories = ['all', 'Premium', 'Luxury', 'Classic', 'Signature', 'Limited'];
  statuses = ['all', 'active', 'inactive', 'draft'];

  get lowStockCount(): number {
    return this.products.filter(p => p.stock < 20).length;
  }

  isCreationStudioOpen = false;
  draftProduct: Product = {
    id: 0,
    name: '',
    price: 0,
    image: '',
    category: '',
    stock: 0,
    status: 'draft',
    dateAdded: ''
  };

  ngOnInit(): void {
    this.filterProducts();
  }

  openCreationStudio(): void {
    this.resetDraft();
    this.isCreationStudioOpen = true;
  }

  closeCreationStudio(): void {
    this.isCreationStudioOpen = false;
  }

  private resetDraft(): void {
    this.draftProduct = {
      id: 0,
      name: '',
      price: 0,
      image: '',
      category: '',
      stock: 0,
      status: 'draft',
      dateAdded: ''
    };
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategoryFilter = !this.categoryFilter ||
        product.category.toLowerCase().includes(this.categoryFilter.toLowerCase());
      const matchesCategory = this.selectedCategory === 'all' || product.category === this.selectedCategory;
      const matchesStatus = this.selectedStatus === 'all' || product.status === this.selectedStatus;
      return matchesSearch && matchesCategoryFilter && matchesCategory && matchesStatus;
    });
  }

  getStockClass(stock: number): string {
    if (stock <= 0) return 'stock-out';
    if (stock < 20) return 'stock-low';
    return 'stock-ok';
  }

  getStockLabel(stock: number): string {
    if (stock <= 0) return 'Out of Stock';
    if (stock < 20) return 'Low Stock';
    return 'In Stock';
  }

  onSearchChange(): void {
    this.filterProducts();
  }

  onCategoryChange(): void {
    this.filterProducts();
  }

  onStatusChange(): void {
    this.filterProducts();
  }

  editProduct(product: Product): void {
    console.log('Edit product:', product);
  }

  deleteProduct(product: Product): void {
    if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
      this.products = this.products.filter(p => p.id !== product.id);
      this.filterProducts();
    }
  }

  submitCreation(): void {
    if (
      !this.draftProduct.name ||
      !this.draftProduct.image ||
      !this.draftProduct.category ||
      this.draftProduct.price <= 0
    ) {
      return;
    }

    const nextId = this.products.length
      ? Math.max(...this.products.map((p) => p.id)) + 1
      : 1;

    const created: Product = {
      ...this.draftProduct,
      id: nextId,
      status: 'active',
      dateAdded: new Date().toISOString().slice(0, 10)
    };

    this.products = [created, ...this.products];
    this.filterProducts();
    this.isCreationStudioOpen = false;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'inactive':
        return 'status-inactive';
      case 'draft':
        return 'status-draft';
      default:
        return '';
    }
  }

  getStatusText(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }
}
