import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FFF8F2]/90 border-b border-[#D6C9B6]/60 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        <!-- Brand Wordmark Logo -->
        <a href="#" class="flex items-center gap-3 group">
          <img src="assets/wordmark.png" alt="Moi Special Logo" class="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" (error)="onImgError($event)">
          <div class="flex flex-col">
            <span class="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#3B5532]">MOI SPECIAL</span>
            <span class="label-caps text-[9px] text-[#B87333] tracking-[0.2em]">Şanlıurfa • Artisan Patisserie</span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center space-x-8">
          <a href="#hero" class="label-caps text-xs text-[#1F1B14] hover:text-[#526E48] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#526E48] hover:after:w-full after:transition-all">
            Ana Sayfa
          </a>
          <a href="#menu" class="label-caps text-xs text-[#1F1B14] hover:text-[#526E48] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#526E48] hover:after:w-full after:transition-all">
            Menü Koleksiyonu
          </a>
          <a href="#about" class="label-caps text-xs text-[#1F1B14] hover:text-[#526E48] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#526E48] hover:after:w-full after:transition-all">
            Hikayemiz
          </a>
          <a href="#contact" class="label-caps text-xs text-[#1F1B14] hover:text-[#526E48] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#526E48] hover:after:w-full after:transition-all">
            İletişim
          </a>
        </nav>

        <!-- Actions: Cart, Reservation CTA & Mobile Hamburger -->
        <div class="flex items-center gap-3">
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
          <button class="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#B87333] hover:bg-[#784000] active:scale-95 text-white font-medium text-xs tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer">
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
            <a 
              (click)="isMobileMenuOpen.set(false)"
              href="#hero" 
              class="label-caps text-sm text-[#1F1B14] hover:text-[#526E48] py-2 border-b border-[#D6C9B6]/40">
              Ana Sayfa
            </a>
            <a 
              (click)="isMobileMenuOpen.set(false)"
              href="#menu" 
              class="label-caps text-sm text-[#1F1B14] hover:text-[#526E48] py-2 border-b border-[#D6C9B6]/40">
              Menü Koleksiyonu
            </a>
            <a 
              (click)="isMobileMenuOpen.set(false)"
              href="#about" 
              class="label-caps text-sm text-[#1F1B14] hover:text-[#526E48] py-2 border-b border-[#D6C9B6]/40">
              Hikayemiz
            </a>
            <a 
              (click)="isMobileMenuOpen.set(false)"
              href="#contact" 
              class="label-caps text-sm text-[#1F1B14] hover:text-[#526E48] py-2">
              İletişim
            </a>
          </nav>
          
          <button 
            (click)="isMobileMenuOpen.set(false)"
            class="w-full py-3.5 rounded-full bg-[#B87333] text-white font-medium text-xs tracking-wider uppercase text-center shadow-md">
            Masa Rezerve Et
          </button>
        </div>
      }
    </header>
  `
})
export class HeaderComponent {
  public readonly cartService = inject(CartService);
  public readonly isMobileMenuOpen = signal<boolean>(false);

  public onImgError(event: Event): void {
    const target = event.target as HTMLElement;
    target.style.display = 'none';
  }
}
