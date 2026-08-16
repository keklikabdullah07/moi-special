import { Injectable, signal, computed } from '@angular/core';

export interface FinancialExpense {
  id: string;
  category: 'ham_madde' | 'fatura' | 'kira' | 'maas' | 'diger';
  title: string;
  amount: number;
  date: string;
}

export interface PaymentMethodBreakdown {
  cash: number;
  card: number;
  online: number;
}

const FIN_CACHE_KEY = 'moi_erp_financials_v1';

@Injectable({
  providedIn: 'root'
})
export class ErpFinancialService {
  public readonly cashRevenue = signal<number>(14200);
  public readonly cardRevenue = signal<number>(28450);
  public readonly onlineRevenue = signal<number>(5600);

  public readonly expenses = signal<FinancialExpense[]>([
    { id: 'e1', category: 'ham_madde', title: 'Boz Antep Fıstığı 50kg Alımı', amount: 18500, date: '2026-08-14' },
    { id: 'e2', category: 'ham_madde', title: 'Saf Fransız Tereyağı 25kg', amount: 6200, date: '2026-08-15' },
    { id: 'e3', category: 'fatura', title: 'Fırın Elektrik & Doğalgaz Faturası', amount: 4800, date: '2026-08-10' },
    { id: 'e4', category: 'kira', title: 'Gap Vadisi Bulvarı Şube Kirası', amount: 12000, date: '2026-08-01' }
  ]);

  public readonly totalRevenue = computed(() => 
    this.cashRevenue() + this.cardRevenue() + this.onlineRevenue()
  );

  public readonly totalExpenses = computed(() => 
    this.expenses().reduce((sum, item) => sum + item.amount, 0)
  );

  public readonly netProfit = computed(() => 
    this.totalRevenue() - this.totalExpenses()
  );

  constructor() {
    this.loadCache();
  }

  public addExpense(title: string, amount: number, category: FinancialExpense['category']): void {
    const newExpense: FinancialExpense = {
      id: 'exp_' + Date.now(),
      title,
      amount,
      category,
      date: new Date().toISOString().split('T')[0]
    };
    this.expenses.update(list => [newExpense, ...list]);
    this.saveCache();
  }

  private loadCache(): void {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(FIN_CACHE_KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p.cash) this.cashRevenue.set(p.cash);
        if (p.card) this.cardRevenue.set(p.card);
        if (p.online) this.onlineRevenue.set(p.online);
      }
    } catch (e) {}
  }

  private saveCache(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(FIN_CACHE_KEY, JSON.stringify({
        cash: this.cashRevenue(),
        card: this.cardRevenue(),
        online: this.onlineRevenue()
      }));
    } catch (e) {}
  }
}
