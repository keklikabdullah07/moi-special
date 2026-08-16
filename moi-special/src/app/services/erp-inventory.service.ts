import { Injectable, signal, computed } from '@angular/core';

export interface InventoryItem {
  id: string;
  name: string;
  category: 'ham_madde' | 'mamul_urun';
  stockQuantity: number;
  unit: 'kg' | 'lt' | 'paket' | 'adet';
  minimumThreshold: number;
  unitPrice: number;
  supplier: string;
}

const INV_CACHE_KEY = 'moi_erp_inventory_v1';

@Injectable({
  providedIn: 'root'
})
export class ErpInventoryService {
  public readonly items = signal<InventoryItem[]>([
    { id: 'i1', name: 'Ekşi Mayalık Özel Taş Fırın Unu', category: 'ham_madde', stockQuantity: 45, unit: 'kg', minimumThreshold: 50, unitPrice: 38, supplier: 'Urfa Un Tarım A.Ş.' },
    { id: 'i2', name: 'Saf Fransız Tereyağı (%82 Yağ)', category: 'ham_madde', stockQuantity: 12, unit: 'kg', minimumThreshold: 15, unitPrice: 280, supplier: 'Lactalis Gurme' },
    { id: 'i3', name: 'Zümrüt Boz Antep Fıstığı (İç)', category: 'ham_madde', stockQuantity: 28, unit: 'kg', minimumThreshold: 20, unitPrice: 850, supplier: 'Gaziantep Fıstıkçılık' },
    { id: 'i4', name: 'Belçika Kuvertür Çikolatası', category: 'ham_madde', stockQuantity: 18, unit: 'kg', minimumThreshold: 10, unitPrice: 420, supplier: 'Callebaut Türkiye' },
    { id: 'i5', name: 'Antep Fıstıklı Artisan Croissant', category: 'mamul_urun', stockQuantity: 34, unit: 'adet', minimumThreshold: 15, unitPrice: 185, supplier: 'Móí Üretim Mutfak' },
    { id: 'i6', name: 'Móí Special Entremet Pasta', category: 'mamul_urun', stockQuantity: 8, unit: 'adet', minimumThreshold: 5, unitPrice: 480, supplier: 'Móí Üretim Mutfak' }
  ]);

  // Computed Signal for Critical Stock Alerts
  public readonly criticalStockAlerts = computed(() => 
    this.items().filter(item => item.stockQuantity <= item.minimumThreshold)
  );

  constructor() {
    this.loadCache();
  }

  public updateStockQuantity(id: string, delta: number): void {
    this.items.update(list => 
      list.map(item => item.id === id ? { ...item, stockQuantity: Math.max(0, item.stockQuantity + delta) } : item)
    );
    this.saveCache();
  }

  public addItem(item: InventoryItem): void {
    this.items.update(list => [item, ...list]);
    this.saveCache();
  }

  private loadCache(): void {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(INV_CACHE_KEY);
      if (raw) this.items.set(JSON.parse(raw));
    } catch (e) {}
  }

  private saveCache(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(INV_CACHE_KEY, JSON.stringify(this.items()));
    } catch (e) {}
  }
}
