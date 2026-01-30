import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LastOrder } from './order-data.service';

const STORAGE_PREFIX = 'aurum_order_history_';

@Injectable({ providedIn: 'root' })
export class OrderHistoryService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getOrdersForUser(email: string): LastOrder[] {
    if (!isPlatformBrowser(this.platformId) || !email) return [];
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + email);
      if (!raw) return [];
      const data = JSON.parse(raw) as LastOrder[];
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }

  addOrder(order: LastOrder): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const email = order?.customerDetails?.email;
    if (!email) return;
    try {
      const existing = this.getOrdersForUser(email);
      const updated = [{ ...order }, ...existing];
      localStorage.setItem(STORAGE_PREFIX + email, JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
  }
}
