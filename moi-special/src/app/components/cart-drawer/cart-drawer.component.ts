import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Backdrop Overlay -->
    @if (cartService.isDrawerOpen()) {
      <div 
        (click)="cartService.closeDrawer()" 
        class="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 transition-opacity duration-300">
      </div>
    }

    <!-- Drawer Panel -->
    <div 
      [class.translate-x-full]="!cartService.isDrawerOpen()"
      [class.translate-x-0]="cartService.isDrawerOpen()"
      class="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#FFF8F2] border-l border-[#D6C9B6] z-50 transition-transform duration-300 ease-in-out shadow-2xl flex flex-col">
      
      <!-- Drawer Header -->
      <div class="p-6 border-b border-[#D6C9B6] flex items-center justify-between bg-[#EDE4D8]/50">
        <div class="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#526E48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h3 class="font-serif text-xl font-bold text-[#1F1B14]">Sipariş Çantanız</h3>
          <span class="bg-[#526E48] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
            {{ cartService.itemCount() }} Ürün
          </span>
        </div>

        <button 
          (click)="cartService.closeDrawer()"
          aria-label="Kapat"
          class="p-2 rounded-full hover:bg-[#D6C9B6]/40 text-[#1F1B14] transition-colors cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Drawer Body: Items List -->
      <div class="flex-1 overflow-y-auto p-6 space-y-4">
        @if (cartService.items().length === 0) {
          <div class="h-full flex flex-col items-center justify-center text-center space-y-4 text-[#434840]">
            <div class="w-16 h-16 rounded-full bg-[#EDE4D8] flex items-center justify-center text-[#526E48]">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p class="font-serif text-lg font-bold text-[#1F1B14]">Çantanız Henüz Boş</p>
            <p class="text-xs max-w-xs">Menüden zümrüt fıstıklı kruvasan veya taze lezzetlerimizden ekleyebilirsiniz.</p>
            <button 
              (click)="cartService.closeDrawer()"
              class="px-6 py-2.5 rounded-full bg-[#526E48] text-white text-xs font-semibold uppercase tracking-wider">
              Lezzetleri İncele
            </button>
          </div>
        } @else {
          @for (item of cartService.items(); track item.product.id) {
            <div class="flex items-center gap-4 p-4 rounded-2xl bg-[#EDE4D8]/40 border border-[#D6C9B6]">
              <img [src]="item.product.imageUrl" [alt]="item.product.name" class="w-16 h-16 rounded-xl object-cover" />
              <div class="flex-1">
                <h4 class="font-serif font-bold text-sm text-[#1F1B14] line-clamp-1">{{ item.product.name }}</h4>
                <span class="text-xs text-[#526E48] font-bold">{{ item.product.price }} ₺ / adet</span>
                
                <div class="flex items-center gap-3 mt-2">
                  <button 
                    (click)="cartService.updateQuantity(item.product.id, -1)"
                    class="w-6 h-6 rounded-full bg-[#FFF8F2] border border-[#D6C9B6] text-xs font-bold hover:bg-[#D6C9B6] transition-colors flex items-center justify-center">
                    -
                  </button>
                  <span class="text-xs font-bold text-[#1F1B14] min-w-[16px] text-center">{{ item.quantity }}</span>
                  <button 
                    (click)="cartService.updateQuantity(item.product.id, 1)"
                    class="w-6 h-6 rounded-full bg-[#FFF8F2] border border-[#D6C9B6] text-xs font-bold hover:bg-[#D6C9B6] transition-colors flex items-center justify-center">
                    +
                  </button>
                </div>
              </div>

              <div class="flex flex-col items-end gap-2">
                <span class="font-serif font-bold text-sm text-[#B87333]">
                  {{ item.product.price * item.quantity }} ₺
                </span>
                <button 
                  (click)="cartService.removeItem(item.product.id)"
                  class="text-[10px] text-red-600 hover:underline">
                  Kaldır
                </button>
              </div>
            </div>
          }
        }
      </div>

      <!-- Drawer Footer -->
      @if (cartService.items().length > 0) {
        <div class="p-6 border-t border-[#D6C9B6] bg-[#EDE4D8]/50 space-y-4">
          <div class="flex items-center justify-between text-sm">
            <span class="label-caps text-xs text-[#434840]">Toplam Ara Tutar</span>
            <span class="font-serif text-2xl font-bold text-[#3B5532]">
              {{ cartService.totalPrice() }} ₺
            </span>
          </div>

          <button class="w-full py-4 rounded-full bg-[#B87333] hover:bg-[#784000] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-xl cursor-pointer">
            Siparişi Tamamla (Paket / Masa)
          </button>
        </div>
      }
    </div>
  `
})
export class CartDrawerComponent {
  public readonly cartService = inject(CartService);
}
