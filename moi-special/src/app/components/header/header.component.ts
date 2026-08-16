import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { SiteAssetService } from '../../services/site-asset.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header 
      [class.bg-[#FFF8F2]/90]="isScrolled"
      [class.backdrop-blur-md]="isScrolled"
      [class.shadow-md]="isScrolled"
      [class.bg-[#FFF8F2]]="!isScrolled"
      class="sticky top-0 z-40 transition-all duration-300 border-b border-[#D6C9B6]/40 relative group/header">
      
      <!-- WEBCMS LIVE EDIT OVERLAY BADGE FOR HEADER -->
      @if (assetService.isEditMode()) {
        <div class="absolute top-2 left-4 z-50 animate-pulse">
          <button 
            (click)="assetService.openSectionEditor('header')"
            class="px-4 py-1.5 rounded-full bg-[#B87333] hover:bg-[#784000] text-white text-[10px] font-bold uppercase tracking-wider shadow-lg border border-white flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer">
            <span>✏️ Header & Menü Linklerini Canlı Düzenle</span>
          </button>
        </div>
      }

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          <!-- Logo Brand Mark -->
          <div (click)="scrollToSection('hero')" class="flex items-center gap-3 cursor-pointer group">
            <div class="w-10 h-10 rounded-full bg-[#526E48] text-white font-serif font-bold text-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              M
            </div>
            <div class="space-y-0.5">
              <span class="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1F1B14] block">
                {{ assetService.brandName() }}
              </span>
              <span class="label-caps text-[9px] text-[#B87333] tracking-widest block font-bold">
                Artisan Fırın & Pastane
              </span>
            </div>
          </div>

          <!-- Desktop Navigation Bar Links -->
          <nav class="hidden md:flex items-center gap-8">
            <button 
              (click)="scrollToSection('hero')" 
              class="font-sans text-xs font-semibold uppercase tracking-widest text-[#1F1B14] hover:text-[#526E48] transition-colors cursor-pointer">
              {{ assetService.navHome() }}
            </button>
            
            <button 
              (click)="scrollToSection('menu')" 
              class="font-sans text-xs font-semibold uppercase tracking-widest text-[#1F1B14] hover:text-[#526E48] transition-colors cursor-pointer">
              {{ assetService.navMenu() }}
            </button>

            <button 
              (click)="scrollToSection('about')" 
              class="font-sans text-xs font-semibold uppercase tracking-widest text-[#1F1B14] hover:text-[#526E48] transition-colors cursor-pointer">
              {{ assetService.navStory() }}
            </button>

            <button 
              (click)="scrollToSection('contact')" 
              class="font-sans text-xs font-semibold uppercase tracking-widest text-[#1F1B14] hover:text-[#526E48] transition-colors cursor-pointer">
              {{ assetService.navContact() }}
            </button>
          </nav>

          <!-- Right Action Bar (User Account & Cart Pill) -->
          <div class="flex items-center gap-4">
            
            <!-- User Login / Profile Avatar Button -->
            <button 
              (click)="handleUserButtonClick()"
              class="px-4 py-2 rounded-full border border-[#D6C9B6] hover:border-[#526E48] bg-[#EDE4D8]/50 hover:bg-[#EDE4D8] text-[#1F1B14] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer">
              <span class="w-2 h-2 rounded-full" [class.bg-emerald-600]="authService.isLoggedIn()" [class.bg-amber-600]="!authService.isLoggedIn()"></span>
              <span>
                @if (authService.currentUser()) {
                  {{ authService.currentUser()?.name }}
                } @else {
                  Giriş Yap
                }
              </span>
            </button>

            <!-- Cart Pill Trigger -->
            <button 
              (click)="cartService.toggleCart()" 
              class="relative p-2.5 rounded-full bg-[#526E48] text-white hover:bg-[#3B5532] shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              @if (cartService.totalItems() > 0) {
                <span class="absolute -top-1 -right-1 bg-[#B87333] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FFF8F2] animate-bounce">
                  {{ cartService.totalItems() }}
                </span>
              }
            </button>

          </div>

        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  public isScrolled = false;
  public readonly cartService = inject(CartService);
  public readonly authService = inject(AuthService);
  public readonly assetService = inject(SiteAssetService);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  public handleUserButtonClick(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.isProfileModalOpen.set(true);
    } else {
      this.authService.isAuthModalOpen.set(true);
    }
  }

  public scrollToSection(id: string): void {
    if (typeof window === 'undefined') return;
    const elem = document.getElementById(id);
    if (elem) {
      const yOffset = -80;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}
