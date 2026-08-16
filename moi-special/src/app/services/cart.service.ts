import { Injectable, signal, computed, inject } from '@angular/core';
import { CartItem, Product } from '../models/product.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly toastService = inject(ToastService);

  private readonly cartItemsSignal = signal<CartItem[]>([]);
  public readonly isDrawerOpenSignal = signal<boolean>(false);

  // Read-only signals for components
  public readonly items = this.cartItemsSignal.asReadonly();
  public readonly isDrawerOpen = this.isDrawerOpenSignal.asReadonly();

  // Computed signals
  public readonly itemCount = computed(() =>
    this.cartItemsSignal().reduce((total, item) => total + item.quantity, 0)
  );

  public readonly totalPrice = computed(() =>
    this.cartItemsSignal().reduce((total, item) => total + item.product.price * item.quantity, 0)
  );

  public addItem(product: Product): void {
    this.cartItemsSignal.update(items => {
      const existingIndex = items.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1
        };
        return updated;
      }
      return [...items, { product, quantity: 1 }];
    });
    this.toastService.show(`"${product.name}" sepete eklendi! 🥐`);
  }

  public removeItem(productId: string): void {
    this.cartItemsSignal.update(items => items.filter(item => item.product.id !== productId));
  }

  public updateQuantity(productId: string, delta: number): void {
    this.cartItemsSignal.update(items => {
      return items.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter((item): item is CartItem => item !== null);
    });
  }

  public clearCart(): void {
    this.cartItemsSignal.set([]);
  }

  public openDrawer(): void {
    this.isDrawerOpenSignal.set(true);
  }

  public closeDrawer(): void {
    this.isDrawerOpenSignal.set(false);
  }

  public toggleDrawer(): void {
    this.isDrawerOpenSignal.update(open => !open);
  }
}
