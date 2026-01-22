import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';

export interface Order {
  id: number;
  customerName: string;
  total: number;
  status: string;
  date: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  name: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  recentOrders: Order[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getDashboardStats(): Observable<DashboardStats> {
    const orders$ = this.http.get<Order[]>(`${this.apiUrl}/orders`);
    const users$ = this.http.get<User[]>(`${this.apiUrl}/users`);

    return forkJoin([orders$, users$]).pipe(
      map(([orders, users]) => {
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const totalOrders = orders.length;
        const totalCustomers = users.length;

        // Get last 5 orders, sorted by date descending
        const recentOrders = orders
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);

        return {
          totalRevenue,
          totalOrders,
          totalCustomers,
          recentOrders
        };
      })
    );
  }
}