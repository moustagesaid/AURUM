import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, NgZone, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OrderService, Order } from '../../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { gsap } from 'gsap';
import { Chart, ChartConfiguration, registerables, ScriptableContext } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('salesChart') salesChartRef!: ElementRef<HTMLCanvasElement>;

  totalRevenue: number = 0;
  totalOrders: number = 0;
  totalCustomers: number = 0;
  conversionRate: number = 0;

  // Animated display values for GSAP
  displayRevenue: number = 0;
  displayOrders: number = 0;
  displayConversionRate: number = 0;

  recentOrders: Order[] = [];
  currentUser: any = null;
  isLoading: boolean = true;
  activeSection: string = 'overview';

  // Product Vault (add product)
  newProduct = {
    name: '',
    price: null as number | null,
    image: ''
  };
  isSavingProduct = false;
  productSuccessMessage = '';
  productErrorMessage = '';

  private salesChart: any = null;
  private hasViewInit = false;
  private hasDataLoaded = false;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadDashboardData();
  }

  ngAfterViewInit(): void {
    this.hasViewInit = true;
    if (this.hasDataLoaded) {
      this.initSalesChart();
    }
  }

  loadDashboardData(): void {
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        // Calculate total revenue
        this.totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

        // Calculate total orders
        this.totalOrders = orders.length;

        // Calculate total customers (unique customer names)
        const uniqueCustomers = new Set(orders.map(order => order.customerName));
        this.totalCustomers = uniqueCustomers.size;

        // Simple conversion rate: orders per customer
        this.conversionRate = this.totalCustomers
          ? (this.totalOrders / this.totalCustomers) * 100
          : 0;

        // Get recent orders (last 5, sorted by date descending)
        this.recentOrders = orders
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);

        this.isLoading = false;
        this.hasDataLoaded = true;

        this.animateCounters();
        if (this.hasViewInit) {
          this.initSalesChart();
        }
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.isLoading = false;
      }
    });
  }

  private animateCounters(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.displayRevenue = this.totalRevenue;
      this.displayOrders = this.totalOrders;
      this.displayConversionRate = this.conversionRate;
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      gsap.to(this, {
        duration: 1.2,
        displayRevenue: this.totalRevenue,
        ease: 'power2.out'
      });
      gsap.to(this, {
        duration: 1.0,
        displayOrders: this.totalOrders,
        ease: 'power2.out',
        delay: 0.1
      });
      gsap.to(this, {
        duration: 1.0,
        displayConversionRate: this.conversionRate,
        ease: 'power2.out',
        delay: 0.2
      });
    });
  }

  private initSalesChart(): void {
    if (!isPlatformBrowser(this.platformId) || !this.salesChartRef?.nativeElement) {
      return;
    }

    const ctx = this.salesChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.salesChart) {
      this.salesChart.destroy();
    }

    const sorted = [...this.recentOrders].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const labels = sorted.map(o => o.date);
    const data = sorted.map(o => o.total);

    const config: any = {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Revenue',
            data,
            borderColor: '#C8A44F',
            backgroundColor: (context: any) => {
              const chart = context.chart;
              const { ctx } = chart;
              const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
              gradient.addColorStop(0, 'rgba(200, 164, 79, 0.35)');
              gradient.addColorStop(1, 'rgba(200, 164, 79, 0)');
              return gradient;
            },
            tension: 0.35,
            fill: true,
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              color: '#BDBDBD',
              font: { family: 'Montserrat, sans-serif', size: 11 }
            },
            grid: {
              display: false
            }
          },
          y: {
            ticks: {
              color: '#BDBDBD',
              font: { family: 'Montserrat, sans-serif', size: 11 }
            },
            grid: {
              color: 'rgba(255,255,255,0.03)'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    };

    this.salesChart = new Chart(ctx, config);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#FFC107'; // Yellow
      case 'shipped':
        return '#28A745'; // Green
      case 'delivered':
        return '#17A2B8'; // Blue
      case 'cancelled':
        return '#DC3545'; // Red
      default:
        return '#6C757D'; // Gray
    }
  }

  onAddProduct(): void {
    if (!this.newProduct.name || this.newProduct.price == null || !this.newProduct.image) {
      this.productErrorMessage = 'Please fill out all fragrance fields.';
      this.productSuccessMessage = '';
      return;
    }

    this.isSavingProduct = true;
    this.productErrorMessage = '';
    this.productSuccessMessage = '';

    const payload = {
      name: this.newProduct.name,
      price: Number(this.newProduct.price),
      image: this.newProduct.image
    };

    this.http.post('http://localhost:3000/products', payload).subscribe({
      next: () => {
        this.productSuccessMessage = 'Fragrance published to collection.';
        this.productErrorMessage = '';
        this.isSavingProduct = false;
        this.newProduct = { name: '', price: null, image: '' };
      },
      error: (error) => {
        console.error('Error publishing fragrance:', error);
        this.productErrorMessage = 'Unable to publish fragrance. Please try again.';
        this.productSuccessMessage = '';
        this.isSavingProduct = false;
      }
    });
  }
}