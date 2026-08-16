import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ReservationService } from '../../services/reservation.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FFF8F2]/95 border-b border-[#D6C9B6]/60 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        <!-- Brand Wordmark Logo -->
        <button (click)="scrollToSection('hero')" class="flex items-center gap-3 group text-left cursor-pointer">
          <img src="assets/wordmark.png" alt="Moi Special Logo" class="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" (error)="onImgError($event)">
          <div class="flex flex-col">
            <span class="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#3B5532]">MOI SPECIAL</span>
            <span class="label-caps text-[9px] text-[#B87333] tracking-[0.2em]">Şanlıurfa • Artisan Patisserie</span>
          </div>
        </button>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center space-x-8">
          <button (click)="scrollToSection('hero')" class="label-caps text-xs text-[#1F1B14] hover:text-[#526E48] py-1 relative group transition-colors cursor-pointer">
            <span>Ana Sayfa</span>
            <span class="absolute bottom-0 left-0 w-0 h-[2px] bg-[#526E48] transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button (click)="scrollToSection('menu')" class="label-caps text-xs text-[#1F1B14] hover:text-[#526E48] py-1 relative group transition-colors cursor-pointer">
            <span>Menü Koleksiyonu</span>
            <span class="absolute bottom-0 left-0 w-0 h-[2px] bg-[#526E48] transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button (click)="scrollToSection('about')" class="label-caps text-xs text-[#1F1B14] hover:text-[#526E48] py-1 relative group transition-colors cursor-pointer">
            <span>Hikayemiz</span>
            <span class="absolute bottom-0 left-0 w-0 h-[2px] bg-[#526E48] transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button (click)="scrollToSection('contact')" class="label-caps text-xs text-[#1F1B14] hover:text-[#526E48] py-1 relative group transition-colors cursor-pointer">
            <span>İletişim</span>
            <span class="absolute bottom-0 left-0 w-0 h-[2px] bg-[#526E48] transition-all duration-300 group-hover:w-full"></span>
          </button>
        </nav>

        <!-- Actions: User Profile, Cart, Reservation CTA & Mobile Hamburger -->
        <div class="flex items-center gap-3">
          
          <!-- User Profile / Auth Login Button -->
          @if (authService.isLoggedIn()) {
            <button 
              (click)="authService.isProfileModalOpen.set(true)"
              class="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#D6C9B6] bg-[#EDE4D8]/80 hover:bg-[#EDE4D8] text-[#1F1B14] transition-all active:scale-95 cursor-pointer">
              <div 
                [class.bg-[#526E48]]="!authService.isAdmin()"
                [class.bg-[#B87333]]="authService.isAdmin()"
                class="w-7 h-7 rounded-full text-white font-serif font-bold text-xs flex items-center justify-center">
                {{ authService.currentUser()?.name?.[0] }}
              </div>
              <span class="label-caps text-xs font-bold hidden sm:inline">
                {{ authService.isAdmin() ? '👑 Yönetici' : authService.currentUser()?.name }}
              </span>
            </button>
          } @else {
            <button 
              (click)="authService.isAuthModalOpen.set(true)"
              class="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#D6C9B6] bg-[#EDE4D8]/60 hover:bg-[#EDE4D8] text-[#1F1B14] transition-all active:scale-95 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#526E48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="label-caps text-xs font-bold">Giriş Yap</span>
            </button>
          }

          <!-- Shopping Bag Button -->
          <button 
            (click)="cartService.toggleDrawer()" 
            aria-label="Sepeti Aç"
            class="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full border border-[#D6C9B6] bg-[#EDE4D8]/60 hover:bg-[#EDE4D8] text-[#1F1B14] transition-all active:scale-95 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#526E48]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span class="label-caps text-xs hidden sm:inline">Sepet</span>
            <span class="bg-[#B87333] text-white text-[11px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-sm">
              {{ cartService.itemCount() }}
            </span>
          </button>

          <!-- Reservation Button (Desktop) -->
          <button 
            (click)="reservationService.openModal()"
            class="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#B87333] hover:bg-[#784000] active:scale-95 text-white font-medium text-xs tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer">
            Masa Rezerve Et
          </button>

          <!-- Mobile Hamburger Toggle -->
          <button 
            (click)="isMobileMenuOpen.set(!isMobileMenuOpen())"
            aria-label="Menüyü Aç/Kapat"
            class="md:hidden p-2 rounded-full text-[#1F1B14] hover:bg-[#EDE4D8] transition-colors cursor-pointer">
            @if (!isMobileMenuOpen()) {
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#526E48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-[#B87333]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            }
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Navigation Menu -->
      @if (isMobileMenuOpen()) {
        <div class="md:hidden bg-[#FFF8F2] border-b border-[#D6C9B6] px-6 py-6 space-y-4 shadow-xl animate-fadeIn">
          <nav class="flex flex-col space-y-3">
            <button 
              (click)="scrollToSection('hero')" 
              class="label-caps text-sm text-[#1F1B14] hover:text-[#526E48] py-2 border-b border-[#D6C9B6]/40 text-left font-bold cursor-pointer">
              Ana Sayfa
            </button>
            <button 
              (click)="scrollToSection('menu')" 
              class="label-caps text-sm text-[#1F1B14] hover:text-[#526E48] py-2 border-b border-[#D6C9B6]/40 text-left font-bold cursor-pointer">
              Menü Koleksiyonu
            </button>
            <button 
              (click)="scrollToSection('about')" 
              class="label-caps text-sm text-[#1F1B14] hover:text-[#526E48] py-2 border-b border-[#D6C9B6]/40 text-left font-bold cursor-pointer">
              Hikayemiz
            </button>
            <button 
              (click)="scrollToSection('contact')" 
              class="label-caps text-sm text-[#1F1B14] hover:text-[#526E48] py-2 text-left font-bold cursor-pointer">
              İletişim
            </button>
          </nav>
          
          <button 
            (click)="isMobileMenuOpen.set(false); reservationService.openModal()"
            class="w-full py-3.5 rounded-full bg-[#B87333] text-white font-medium text-xs tracking-wider uppercase text-center shadow-md cursor-pointer">
            Masa Rezerve Et
          </button>
        </div>
      }
    </header>
  `
})
export class HeaderComponent {
  public readonly cartService = inject(CartService);
  public readonly reservationService = inject(ReservationService);
  public readonly authService = inject(AuthService);

  public readonly isMobileMenuOpen = signal<boolean>(false);

  public scrollToSection(id: string): void {
    this.isMobileMenuOpen.set(false);
    if (typeof window === 'undefined') return;

    if (id === 'hero' || id === 'mobile-hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const elem = document.getElementById(id);
    if (elem) {
      const yOffset = -80; // Header offset
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  public onImgError(event: Event): void {
    const target = event.target as HTMLElement;
    target.style.display = 'none';
  }
}
