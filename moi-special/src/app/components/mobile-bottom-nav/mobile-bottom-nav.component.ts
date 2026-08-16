import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ReservationService } from '../../services/reservation.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mobile-bottom-nav',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Mobile Fixed Bottom Navigation (Native App PWA Experience) -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFF8F2]/95 backdrop-blur-xl border-t border-[#D6C9B6] px-1 py-2 shadow-[0_-4px_25px_rgba(0,0,0,0.1)] pb-safe select-none">
      <div class="flex items-center justify-around">
        
        <!-- Home Button -->
        <button 
          (click)="scrollToSection('mobile-hero')"
          class="flex flex-col items-center gap-1 text-[#1F1B14] hover:text-[#526E48] py-1.5 px-2 rounded-xl active:bg-[#EDE4D8] active:scale-95 transition-all cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#526E48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="label-caps text-[9px] font-bold">Ana Sayfa</span>
        </button>

        <!-- Menu Showcase Scroll Button -->
        <button 
          (click)="scrollToSection('menu')"
          class="flex flex-col items-center gap-1 text-[#1F1B14] hover:text-[#526E48] py-1.5 px-2 rounded-xl active:bg-[#EDE4D8] active:scale-95 transition-all cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#526E48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span class="label-caps text-[9px] font-bold">Menü</span>
        </button>

        <!-- Cart Bag (Reactive Badge) -->
        <button 
          (click)="cartService.toggleDrawer()"
          class="relative flex flex-col items-center gap-1 text-[#1F1B14] py-1.5 px-2 rounded-xl active:bg-[#EDE4D8] active:scale-95 transition-all cursor-pointer">
          <div class="relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#B87333]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            @if (cartService.itemCount() > 0) {
              <span class="absolute -top-1.5 -right-2 bg-[#B87333] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {{ cartService.itemCount() }}
              </span>
            }
          </div>
          <span class="label-caps text-[9px] font-bold">Sepet</span>
        </button>

        <!-- Reservation Modal Trigger -->
        <button 
          (click)="reservationService.openModal()"
          class="flex flex-col items-center gap-1 text-[#526E48] py-1.5 px-2 rounded-xl active:bg-[#526E48]/10 active:scale-95 transition-all cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#526E48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="label-caps text-[9px] font-bold">Rezerve</span>
        </button>

        <!-- Account / Profile Trigger Button -->
        <button 
          (click)="handleAccountClick()"
          class="flex flex-col items-center gap-1 text-[#1F1B14] hover:text-[#526E48] py-1.5 px-2 rounded-xl active:bg-[#EDE4D8] active:scale-95 transition-all cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" [class.text-[#B87333]]="authService.isAdmin()" [class.text-[#526E48]]="!authService.isAdmin()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="label-caps text-[9px] font-bold">
            {{ authService.isLoggedIn() ? (authService.isAdmin() ? 'Yönetici' : 'Hesabım') : 'Giriş' }}
          </span>
        </button>

      </div>
    </nav>
  `
})
export class MobileBottomNavComponent {
  public readonly cartService = inject(CartService);
  public readonly reservationService = inject(ReservationService);
  public readonly authService = inject(AuthService);

  public handleAccountClick(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.isProfileModalOpen.set(true);
    } else {
      this.authService.isAuthModalOpen.set(true);
    }
  }

  public scrollToSection(id: string): void {
    if (typeof window === 'undefined') return;

    if (id === 'mobile-hero' || id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const elem = document.getElementById(id);
    if (elem) {
      const yOffset = -70;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}
