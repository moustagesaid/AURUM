import { Injectable, computed, signal } from '@angular/core';

export type OrderStatus = 'Completed' | 'Pending' | 'Cancelled' | 'Processing';

export interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: OrderStatus;
  date: Date;
  avatarUrl?: string;
}

export interface KpiMetric {
  title: string;
  value: string | number;
  trend: number; // percentage change
  icon: string; // Material icon name
  isCurrency?: boolean;
  subtitle?: string; // Optional subtitle (e.g., "15 pending dispatch")
}

export interface DashboardMetrics {
  totalRevenue: KpiMetric;
  activeOrders: KpiMetric;
  vipMembers: KpiMetric;
  conversionRate: KpiMetric;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly ordersState = signal<Order[]>([]);
  private readonly metricsState = signal<DashboardMetrics | null>(null);

  // Exposed read signals (kept compatible with current AdminDashboardComponent bindings)
  readonly metrics = computed(() => this.metricsState());
  readonly recentOrders = computed(() => this.ordersState().slice(0, 10));

  // Convenience computed values requested by the spec
  readonly revenue = computed(() => this.metricsState()?.totalRevenue ?? null);
  readonly activeOrders = computed(() => this.metricsState()?.activeOrders ?? null);

  constructor() {
    this.seedMockData();
  }

  private seedMockData(): void {
    const metrics: DashboardMetrics = {
      totalRevenue: {
        title: 'Total Revenue',
        value: 1240500,
        trend: 12.5,
        icon: 'account_balance_wallet',
        isCurrency: true
      },
      activeOrders: {
        title: 'Active Orders',
        value: 45,
        trend: 0,
        icon: 'receipt_long',
        subtitle: '15 pending dispatch'
      },
      vipMembers: {
        title: 'VIP Customers',
        value: '12 New',
        trend: 4.2,
        icon: 'diamond'
      },
      conversionRate: {
        title: 'Conversion Rate',
        value: '3.2%',
        trend: 0.8,
        icon: 'trending_up'
      }
    };

    const orders: Order[] = [
      {
        id: '#AU-7829',
        customer: 'Isabella M.',
        product: 'Royal Oak Chronograph',
        amount: 45000.0,
        status: 'Completed',
        date: new Date('2023-10-24T14:30:00')
      },
      {
        id: '#AU-7830',
        customer: 'Jonathan K.',
        product: 'Diamond Tennis Bracelet',
        amount: 12500.0,
        status: 'Processing',
        date: new Date('2023-10-24T16:15:00')
      },
      {
        id: '#AU-7831',
        customer: 'Elena R.',
        product: 'Midnight Noir Collection',
        amount: 5000.0,
        status: 'Pending',
        date: new Date('2023-10-25T09:00:00')
      },
      {
        id: '#AU-7832',
        customer: 'Marcus T.',
        product: 'Royal Oud Edition',
        amount: 12000.0,
        status: 'Completed',
        date: new Date('2023-10-25T10:30:00')
      },
      {
        id: '#AU-7833',
        customer: 'Sophia L.',
        product: 'Rose Gold Mist',
        amount: 8500.0,
        status: 'Processing',
        date: new Date('2023-10-25T11:45:00')
      }
    ];

    this.metricsState.set(metrics);
    this.ordersState.set(orders);
  }
}
