import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { SiteAssetService } from '../../services/site-asset.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- 1. FULL DESKTOP HEADER (AT TOP OF PAGE) -->
    <header class="relative z-40 bg-[#FFF8F2] border-b border-[#D6C9B6]/50 select-none">
      
      <!-- WEBCMS LIVE EDIT OVERLAY BADGE FOR HEADER -->
      @if (assetService.isEditMode()) {
        <div class="absolute top-2 left-4 z-50 animate-pulse">
          <button 
            (click)="assetService.openSectionEditor('header')"
            class="px-4 py-1.5 rounded-full bg-[#B87333] hover:bg-[#784000] text-white text-[10px] font-bold uppercase tracking-wider shadow-lg border border-white flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer">
            <span>Header & Menü Linklerini Canlı Düzenle</span>
          </button>
        </div>
      }

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-24 sm:h-28">
          
          <!-- GRAND LUXURY MOÍ BRAND LOGO EMBLEM -->
          <div (click)="scrollToSection('hero')" class="flex items-center gap-3 cursor-pointer group py-1">
            <div class="flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
              <svg viewBox="0 0 240 70" class="h-16 sm:h-20 w-auto shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="moiLuxeGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#C68244" />
                    <stop offset="50%" stop-color="#B87333" />
                    <stop offset="100%" stop-color="#784000" />
                  </linearGradient>
                </defs>
                <text x="2" y="46" font-family="'Playfair Display', Georgia, serif" font-weight="900" font-size="52" fill="url(#moiLuxeGold)" letter-spacing="2">MOÍ</text>
                <path d="M142 16 Q150 10 158 18 Q150 26 142 16 Z" fill="#526E48" />
                <path d="M146 24 Q154 18 162 26 Q154 34 146 24 Z" fill="#526E48" />
                <path d="M150 32 Q158 26 166 34 Q158 42 150 32 Z" fill="#B87333" />
                <path d="M144 48 C146 36 150 24 160 12" stroke="#526E48" stroke-width="2.5" stroke-linecap="round" />
                <text x="4" y="64" font-family="'Inter', sans-serif" font-weight="700" font-size="9" fill="#B87333" letter-spacing="3">ŞANLIURFA • ARTISAN PATISSERIE</text>
              </svg>
            </div>
          </div>

          <!-- FULL HEADER NAVIGATION MENU BAR -->
          <nav class="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-[#EDE4D8]/60 border border-[#D6C9B6] shadow-xs">
            <button 
              (click)="scrollToSection('hero')" 
              [class.bg-[#526E48]]="activeNav() === 'hero'"
              [class.text-white]="activeNav() === 'hero'"
              [class.shadow-sm]="activeNav() === 'hero'"
              [class.text-[#1F1B14]]="activeNav() !== 'hero'"
              class="px-6 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#526E48] hover:text-white transition-all duration-300 cursor-pointer">
              {{ assetService.navHome() }}
            </button>
            
            <button 
              (click)="scrollToSection('menu')" 
              [class.bg-[#526E48]]="activeNav() === 'menu'"
              [class.text-white]="activeNav() === 'menu'"
              [class.shadow-sm]="activeNav() === 'menu'"
              [class.text-[#1F1B14]]="activeNav() !== 'menu'"
              class="px-6 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#526E48] hover:text-white transition-all duration-300 cursor-pointer">
              {{ assetService.navMenu() }}
            </button>

            <button 
              (click)="scrollToSection('about')" 
              [class.bg-[#526E48]]="activeNav() === 'about'"
              [class.text-white]="activeNav() === 'about'"
              [class.shadow-sm]="activeNav() === 'about'"
              [class.text-[#1F1B14]]="activeNav() !== 'about'"
              class="px-6 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#526E48] hover:text-white transition-all duration-300 cursor-pointer">
              {{ assetService.navStory() }}
            </button>

            <button 
              (click)="scrollToSection('contact')" 
              [class.bg-[#526E48]]="activeNav() === 'contact'"
              [class.text-white]="activeNav() === 'contact'"
              [class.shadow-sm]="activeNav() === 'contact'"
              [class.text-[#1F1B14]]="activeNav() !== 'contact'"
              class="px-6 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#526E48] hover:text-white transition-all duration-300 cursor-pointer">
              {{ assetService.navContact() }}
            </button>
          </nav>

          <!-- Right Action Bar (User Account & Cart Pill) -->
          <div class="flex items-center gap-4">
            <button 
              (click)="handleUserButtonClick()"
              class="px-5 py-2.5 rounded-full border border-[#D6C9B6] hover:border-[#526E48] bg-[#EDE4D8]/50 hover:bg-[#EDE4D8] text-[#1F1B14] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer">
              <span class="w-2.5 h-2.5 rounded-full" [class.bg-emerald-600]="authService.isLoggedIn()" [class.bg-amber-600]="!authService.isLoggedIn()"></span>
              <span>
                @if (authService.currentUser()) {
                  {{ authService.currentUser()?.name }}
                } @else {
                  Giriş Yap
                }
              </span>
            </button>

            <button 
              (click)="cartService.toggleDrawer()" 
              class="relative p-3 rounded-full bg-[#526E48] text-white hover:bg-[#3B5532] shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              @if (cartService.itemCount() > 0) {
                <span class="absolute -top-1 -right-1 bg-[#B87333] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FFF8F2] animate-bounce">
                  {{ cartService.itemCount() }}
                </span>
              }
            </button>
          </div>

        </div>
      </div>
    </header>

    <!-- 2. TRUE FLOATING ISLAND PILL NAVBAR (ON SCROLL DOWN - YÜZEN ADA KAPSÜL MENÜSÜ) -->
    @if (isScrolled) {
      <div class="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-3xl animate-fadeInDown">
        <div class="w-full flex items-center justify-between px-6 py-2.5 rounded-full bg-[#FFF8F2]/95 backdrop-blur-2xl border-2 border-[#B87333]/40 shadow-[0_20px_50px_rgba(31,27,20,0.18)] transition-all duration-300">
          
          <!-- Floating Island Mini Logo Mark -->
          <div (click)="scrollToSection('hero')" class="flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform">
            <span class="font-serif font-black text-xl text-[#B87333] tracking-widest">MOÍ</span>
            <span class="text-xs text-[#526E48]">🌾</span>
          </div>

          <div class="w-px h-5 bg-[#D6C9B6]"></div>

          <!-- Floating Island Nav Tabs -->
          <nav class="flex items-center gap-1 bg-[#EDE4D8]/60 p-1 rounded-full border border-[#D6C9B6]/60">
            <button 
              (click)="scrollToSection('hero')" 
              [class.bg-[#526E48]]="activeNav() === 'hero'"
              [class.text-white]="activeNav() === 'hero'"
              [class.shadow-xs]="activeNav() === 'hero'"
              [class.text-[#1F1B14]]="activeNav() !== 'hero'"
              class="px-4 py-1.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:text-white transition-all cursor-pointer">
              {{ assetService.navHome() }}
            </button>
            
            <button 
              (click)="scrollToSection('menu')" 
              [class.bg-[#526E48]]="activeNav() === 'menu'"
              [class.text-white]="activeNav() === 'menu'"
              [class.shadow-xs]="activeNav() === 'menu'"
              [class.text-[#1F1B14]]="activeNav() !== 'menu'"
              class="px-4 py-1.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:text-white transition-all cursor-pointer">
              {{ assetService.navMenu() }}
            </button>

            <button 
              (click)="scrollToSection('about')" 
              [class.bg-[#526E48]]="activeNav() === 'about'"
              [class.text-white]="activeNav() === 'about'"
              [class.shadow-xs]="activeNav() === 'about'"
              [class.text-[#1F1B14]]="activeNav() !== 'about'"
              class="px-4 py-1.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:text-white transition-all cursor-pointer">
              {{ assetService.navStory() }}
            </button>

            <button 
              (click)="scrollToSection('contact')" 
              [class.bg-[#526E48]]="activeNav() === 'contact'"
              [class.text-white]="activeNav() === 'contact'"
              [class.shadow-xs]="activeNav() === 'contact'"
              [class.text-[#1F1B14]]="activeNav() !== 'contact'"
              class="px-4 py-1.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:text-white transition-all cursor-pointer">
              {{ assetService.navContact() }}
            </button>
          </nav>

          <div class="w-px h-5 bg-[#D6C9B6]"></div>

          <!-- Floating Island Actions -->
          <div class="flex items-center gap-2">
            <button 
              (click)="handleUserButtonClick()"
              class="px-3.5 py-1.5 rounded-full border border-[#D6C9B6] bg-[#EDE4D8]/60 hover:bg-[#EDE4D8] text-[#1F1B14] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer">
              <span class="w-2 h-2 rounded-full" [class.bg-emerald-600]="authService.isLoggedIn()" [class.bg-amber-600]="!authService.isLoggedIn()"></span>
              <span>
                @if (authService.currentUser()) {
                  {{ authService.currentUser()?.name }}
                } @else {
                  Giriş
                }
              </span>
            </button>

            <button 
              (click)="cartService.toggleDrawer()" 
              class="relative p-2 rounded-full bg-[#526E48] hover:bg-[#3B5532] text-white shadow-md active:scale-95 transition-transform cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              @if (cartService.itemCount() > 0) {
                <span class="absolute -top-1 -right-1 bg-[#B87333] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {{ cartService.itemCount() }}
                </span>
              }
            </button>
          </div>

        </div>
      </div>
    }
  `
})
export class HeaderComponent {
  public isScrolled = false;
  public readonly activeNav = signal<'hero' | 'menu' | 'about' | 'contact'>('hero');
  public readonly cartService = inject(CartService);
  public readonly authService = inject(AuthService);
  public readonly assetService = inject(SiteAssetService);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 120;
    
    // Auto active nav update on scroll
    if (typeof window !== 'undefined') {
      const scrollPos = window.scrollY + 200;
      const isAtBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 180);
      
      const menuSection = document.getElementById('menu');
      const aboutSection = document.getElementById('about');
      const contactSection = document.getElementById('contact');

      if (isAtBottom || (contactSection && scrollPos >= contactSection.offsetTop)) {
        this.activeNav.set('contact');
      } else if (aboutSection && scrollPos >= aboutSection.offsetTop) {
        this.activeNav.set('about');
      } else if (menuSection && scrollPos >= menuSection.offsetTop) {
        this.activeNav.set('menu');
      } else {
        this.activeNav.set('hero');
      }
    }
  }

  public handleUserButtonClick(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.isProfileModalOpen.set(true);
    } else {
      this.authService.isAuthModalOpen.set(true);
    }
  }

  public scrollToSection(id: 'hero' | 'menu' | 'about' | 'contact'): void {
    this.activeNav.set(id);
    if (typeof window === 'undefined') return;
    const elem = document.getElementById(id);
    if (elem) {
      const yOffset = -90;
      const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}
