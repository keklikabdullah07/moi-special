import { Injectable, signal, computed } from '@angular/core';

export type CustomOrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered';

export interface CustomPastryOrder {
  id: string;
  orderNo: string;
  customerName: string;
  phone: string;
  cakeType: string;
  portionCount: number;
  eventDate: string;
  status: CustomOrderStatus;
  totalPrice: number;
  depositPaid: number;
  specialNotes: string;
}

const KANBAN_CACHE_KEY = 'moi_erp_kanban_v1';

@Injectable({
  providedIn: 'root'
})
export class ErpKanbanService {
  public readonly orders = signal<CustomPastryOrder[]>([
    { id: 'o1', orderNo: 'ORD-1042', customerName: 'Selin & Caner Çifti', phone: '0532 999 00 11', cakeType: '3 Katlı Safranlı & Antep Fıstıklı Nişan Pastası', portionCount: 80, eventDate: '2026-08-20', status: 'preparing', totalPrice: 4800, depositPaid: 2000, specialNotes: 'Üst katmanda gerçek canlı beyaz güller ve altın varak süsleme.' },
    { id: 'o2', orderNo: 'ORD-1043', customerName: 'Dr. Murat Yılmaz', phone: '0544 888 11 22', cakeType: 'Belçika Çikolatalı & Fıstıklı Doğum Günü Entremet', portionCount: 20, eventDate: '2026-08-18', status: 'pending', totalPrice: 1950, depositPaid: 1000, specialNotes: 'Üzerine "İyi ki Doğdun Murat" yazılacak.' },
    { id: 'o3', orderNo: 'ORD-1044', customerName: 'Karaköprü Medikal A.Ş.', phone: '0555 777 22 33', cakeType: 'Toplu Taş Fırın İkramlık & Croissant Kutuları', portionCount: 150, eventDate: '2026-08-17', status: 'ready', totalPrice: 6500, depositPaid: 6500, specialNotes: 'Sabah 08:30 şube teslim.' }
  ]);

  public readonly pendingOrders = computed(() => this.orders().filter(o => o.status === 'pending'));
  public readonly preparingOrders = computed(() => this.orders().filter(o => o.status === 'preparing'));
  public readonly readyOrders = computed(() => this.orders().filter(o => o.status === 'ready'));
  public readonly deliveredOrders = computed(() => this.orders().filter(o => o.status === 'delivered'));

  constructor() {
    this.loadCache();
  }

  public updateOrderStatus(orderId: string, newStatus: CustomOrderStatus): void {
    this.orders.update(list => 
      list.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
    );
    this.saveCache();
  }

  private loadCache(): void {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(KANBAN_CACHE_KEY);
      if (raw) this.orders.set(JSON.parse(raw));
    } catch (e) {}
  }

  private saveCache(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(KANBAN_CACHE_KEY, JSON.stringify(this.orders()));
    } catch (e) {}
  }
}
