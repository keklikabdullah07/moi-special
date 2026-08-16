import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'admin' | 'bakery' | 'cart' | 'warning';

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  type: ToastType;
  icon: string;
  durationMs: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public readonly activeToasts = signal<ToastItem[]>([]);

  public show(message: string, title: string = 'Móí Special', type: ToastType = 'success', durationMs: number = 3200): void {
    const iconMap: Record<ToastType, string> = {
      bakery: '🥖',
      admin: '👑',
      cart: '🥐',
      success: '✨',
      warning: '⚠️'
    };

    const newToast: ToastItem = {
      id: 'toast_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      title,
      message,
      type,
      icon: iconMap[type] || '✨',
      durationMs
    };

    this.activeToasts.update(list => [newToast, ...list.slice(0, 2)]); // Keep max 3 toasts stacked gracefully

    setTimeout(() => {
      this.dismiss(newToast.id);
    }, durationMs);
  }

  public showBakery(message: string, title: string = 'Taze Fırın Lezzeti 🥖'): void {
    this.show(message, title, 'bakery', 3500);
  }

  public showAdmin(message: string, title: string = 'Süper Yönetici Bildirimi 👑'): void {
    this.show(message, title, 'admin', 3800);
  }

  public showCart(message: string, title: string = 'Nefis Seçim! 🥐'): void {
    this.show(message, title, 'cart', 3000);
  }

  public showSuccess(message: string, title: string = 'İşlem Başarılı ✨'): void {
    this.show(message, title, 'success', 3000);
  }

  public showWarning(message: string, title: string = 'Bilgilendirme ⚠️'): void {
    this.show(message, title, 'warning', 3500);
  }

  public dismiss(id: string): void {
    this.activeToasts.update(list => list.filter(t => t.id !== id));
  }
}
