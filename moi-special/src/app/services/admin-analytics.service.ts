import { Injectable, signal } from '@angular/core';

export interface TopProductMetric {
  name: string;
  category: string;
  unitsSold: number;
  revenue: number;
}

const ANALYTICS_CACHE_KEY = 'moi_admin_analytics_v1';

@Injectable({
  providedIn: 'root'
})
export class AdminAnalyticsService {
  public readonly totalTurnover = signal<number>(48250);
  public readonly totalOrdersCount = signal<number>(164);
  public readonly totalProductsSold = signal<number>(412);
  public readonly activeReservationsCount = signal<number>(14);

  public readonly topProducts = signal<TopProductMetric[]>([
    { name: 'Antep Fıstıklı Artisan Croissant', category: 'Fıstıklı Özel', unitsSold: 184, revenue: 34040 },
    { name: 'Moi Special Fıstıklı Entremet', category: 'Artisan Pastane', unitsSold: 42, revenue: 20160 },
    { name: 'Safranlı & Fıstıklı Baklava Pastası', category: 'Fıstıklı Özel', unitsSold: 38, revenue: 19760 },
    { name: 'Mezopotamya Taş Fırın Ekmeği', category: 'Taş Fırın & Ekmek', unitsSold: 96, revenue: 9120 },
    { name: 'Antep Fıstığı Kremalı Specialty Latte', category: 'Gurme İçecekler', unitsSold: 52, revenue: 8580 }
  ]);

  constructor() {
    this.loadCachedAnalytics();
  }

  private loadCachedAnalytics(): void {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(ANALYTICS_CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.totalTurnover) this.totalTurnover.set(parsed.totalTurnover);
        if (parsed.totalOrdersCount) this.totalOrdersCount.set(parsed.totalOrdersCount);
        if (parsed.totalProductsSold) this.totalProductsSold.set(parsed.totalProductsSold);
      }
    } catch (e) {}
  }

  public recordNewOrder(totalPrice: number, itemsCount: number): void {
    this.totalTurnover.update(t => t + totalPrice);
    this.totalOrdersCount.update(c => c + 1);
    this.totalProductsSold.update(p => p + itemsCount);
    this.saveAnalytics();
  }

  private saveAnalytics(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(ANALYTICS_CACHE_KEY, JSON.stringify({
        totalTurnover: this.totalTurnover(),
        totalOrdersCount: this.totalOrdersCount(),
        totalProductsSold: this.totalProductsSold()
      }));
    } catch (e) {}
  }
}
