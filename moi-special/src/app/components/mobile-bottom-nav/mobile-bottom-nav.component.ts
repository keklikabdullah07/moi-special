import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-mobile-bottom-nav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Mobile Fixed Bottom Navigation (App-like PWA experience) -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FFF8F2]/95 backdrop-blur-lg border-t border-[#D6C9B6] px-4 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-safe">
      <div class="flex items-center justify-around">
        
        <!-- Home -->
        <a href="#hero" class="flex flex-col items-center gap-1 text-[#1F1B14] hover:text-[#526E48] py-1 px-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#526E48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="label-caps text-[9px]">Ana Sayfa</span>
        </a>

        <!-- Menu Showcase -->
        <a href="#menu" class="flex flex-col items-center gap-1 text-[#1F1B14] hover:text-[#526E48] py-1 px-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#526E48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span class="label-caps text-[9px]">Menü</span>
        </a>

        <!-- Cart Bag (Reactive Badge) -->
        <button 
          (click)="cartService.toggleDrawer()"
          class="relative flex flex-col items-center gap-1 text-[#1F1B14] py-1 px-3 cursor-pointer">
          <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#B87333]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            @if (cartService.itemCount() > 0) {
              <span class="absolute -top-1.5 -right-2 bg-[#B87333] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {{ cartService.itemCount() }}
              </span>
            }
          </div>
          <span class="label-caps text-[9px]">Sepet</span>
        </button>

        <!-- Reservation CTA -->
        <a href="#contact" class="flex flex-col items-center gap-1 text-[#526E48] py-1 px-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#526E48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="label-caps text-[9px] font-bold">Rezerve</span>
        </a>

      </div>
    </div>
  `
})
export class MobileBottomNavComponent {
  public readonly cartService = inject(CartService);
}
