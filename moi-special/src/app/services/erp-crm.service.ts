import { Injectable, signal } from '@angular/core';

export interface CustomerCrmProfile {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  birthDate: string;
  tier: 'VIP' | 'Gold' | 'Silver' | 'Bronze';
  loyaltyPoints: number;
  totalSpent: number;
  lastOrderDate: string;
}

const CRM_CACHE_KEY = 'moi_erp_crm_v1';

@Injectable({
  providedIn: 'root'
})
export class ErpCrmService {
  public readonly customers = signal<CustomerCrmProfile[]>([
    { id: 'c1', fullName: 'Zeynep Yıldız', phone: '0532 888 77 66', email: 'zeynep.yildiz@gmail.com', birthDate: '08-24', tier: 'VIP', loyaltyPoints: 850, totalSpent: 14200, lastOrderDate: '2026-08-14' },
    { id: 'c2', fullName: 'Mustafa Demir', phone: '0542 777 66 55', email: 'mustafa.demir@gmail.com', birthDate: '09-12', tier: 'Gold', loyaltyPoints: 420, totalSpent: 7800, lastOrderDate: '2026-08-12' },
    { id: 'c3', fullName: 'Ayşe Karahan', phone: '0555 666 55 44', email: 'ayse.karahan@gmail.com', birthDate: '08-18', tier: 'Silver', loyaltyPoints: 190, totalSpent: 3400, lastOrderDate: '2026-08-10' }
  ]);

  constructor() {
    this.loadCache();
  }

  public addPoints(customerId: string, points: number): void {
    this.customers.update(list => 
      list.map(c => c.id === customerId ? { ...c, loyaltyPoints: c.loyaltyPoints + points } : c)
    );
    this.saveCache();
  }

  private loadCache(): void {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(CRM_CACHE_KEY);
      if (raw) this.customers.set(JSON.parse(raw));
    } catch (e) {}
  }

  private saveCache(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(CRM_CACHE_KEY, JSON.stringify(this.customers()));
    } catch (e) {}
  }
}
