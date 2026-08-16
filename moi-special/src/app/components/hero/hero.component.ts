import { Component, ElementRef, ViewChild, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="hero" class="relative overflow-hidden bg-[#FFF8F2] pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-[#D6C9B6]/40">
      
      <!-- Ambient Glow Blobs -->
      <div class="absolute top-1/4 -left-20 w-96 h-96 bg-[#CFEFC0]/30 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div class="absolute bottom-10 right-0 w-96 h-96 bg-[#FFDCC2]/40 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <!-- Text Content Column -->
          <div #heroText class="lg:col-span-7 space-y-8 text-left z-10">
            
            <!-- Eyebrow Badge -->
            <div class="hero-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE4D8] border border-[#D6C9B6] text-[#526E48] transition-all hover:scale-105">
              <span class="w-2 h-2 rounded-full bg-[#526E48] animate-ping"></span>
              <span class="label-caps text-[11px] font-semibold tracking-widest text-[#3B5532]">
                Sırrın Karşıyaka, Şanlıurfa • Modern Artisan Pastane & Fırın
              </span>
            </div>

            <!-- Headline -->
            <h1 class="hero-item font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F1B14] leading-[1.15]">
              Mezopotamya Gün Işığında <br class="hidden sm:inline" />
              <span class="italic font-normal text-[#526E48]">Artisan Fırın Sanatı</span>
            </h1>

            <!-- Subtitle -->
            <p class="hero-item font-sans text-base sm:text-lg text-[#434840] max-w-2xl leading-relaxed">
              Tarihi Şanlıurfa taş fırın kültürünün geleneksel ustalığı, Fransız patisserie inceliği ve zümrüt Antep fıstığının en eşsiz haliyle buluşuyor. Günlük taze pişen lezzetlerimizi keşfedin.
            </p>

            <!-- Action Buttons -->
            <div class="hero-item flex flex-wrap items-center gap-4 pt-2">
              <a href="#menu" class="btn-shimmer px-8 py-4 rounded-full text-white font-medium text-xs tracking-wider uppercase shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:scale-95 transition-all duration-300 inline-flex items-center gap-3 group">
                <span>Menüyü Keşfet</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              
              <a 
                href="https://share.google/P5BMtr0gzI00D3TQj" 
                target="_blank"
                rel="noopener"
                class="px-8 py-4 rounded-full bg-transparent hover:bg-[#EDE4D8]/80 text-[#3B5532] border border-[#526E48] font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-md active:scale-95 inline-flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#526E48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Şubemizi Ziyaret Et (Harita)</span>
              </a>
            </div>

            <!-- Trust / Metric Highlights -->
            <div class="hero-item grid grid-cols-3 gap-6 pt-8 border-t border-[#D6C9B6]/60 max-w-xl">
              <div class="group cursor-pointer">
                <span class="block font-serif text-2xl lg:text-3xl font-bold text-[#526E48] transition-transform group-hover:scale-110">100%</span>
                <span class="label-caps text-[10px] text-[#434840]">Boz Antep Fıstığı</span>
              </div>
              <div class="group cursor-pointer">
                <span class="block font-serif text-2xl lg:text-3xl font-bold text-[#B87333] transition-transform group-hover:scale-110">72 Saat</span>
                <span class="label-caps text-[10px] text-[#434840]">Soğuk Maya Fermentasyonu</span>
              </div>
              <div class="group cursor-pointer">
                <span class="block font-serif text-2xl lg:text-3xl font-bold text-[#526E48] transition-transform group-hover:scale-110">Günlük</span>
                <span class="label-caps text-[10px] text-[#434840]">Taze Fırın Üretimi</span>
              </div>
            </div>

          </div>

          <!-- Arched Hero Image Column -->
          <div #heroImage class="lg:col-span-5 relative flex justify-center">
            
            <!-- Architectural Soft Arch Container (Gentle Levitation Float) -->
            <div class="animate-float relative w-full max-w-md aspect-[3/4] p-3 rounded-t-[10rem] rounded-b-3xl bg-[#EDE4D8] border border-[#D6C9B6] shadow-2xl overflow-hidden group">
              
              <!-- Inner Arch Image -->
              <div class="w-full h-full rounded-t-[9.5rem] rounded-b-2xl overflow-hidden relative">
                <img 
                  src="assets/croissant.jpg" 
                  alt="Moi Special Artisan Pastane Görseli" 
                  class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  (error)="onHeroImgError($event)" />
                
                <div class="absolute inset-0 bg-gradient-to-t from-[#1F1B14]/60 via-transparent to-transparent"></div>

                <!-- Floating Product Badge on Image Base -->
                <div class="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#FFF8F2]/95 backdrop-blur-md border border-[#D6C9B6] shadow-lg transition-transform duration-300 group-hover:-translate-y-1">
                  <div class="flex items-center justify-between">
                    <div>
                      <span class="label-caps text-[10px] text-[#B87333]">Şefin Özel Seçimi</span>
                      <h4 class="font-serif font-bold text-base text-[#1F1B14]">Antep Fıstıklı Artisan Croissant</h4>
                    </div>
                    <span class="font-serif text-lg font-bold text-[#526E48]">185 ₺</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Floating Decorative Stamp Element (Continuous Slow Spin) -->
            <a 
              href="https://share.google/P5BMtr0gzI00D3TQj" 
              target="_blank" 
              rel="noopener"
              class="absolute -bottom-6 -left-6 hidden sm:flex w-24 h-24 rounded-full bg-[#526E48] text-white items-center justify-center p-2 text-center shadow-xl animate-spin-slow cursor-pointer hover:bg-[#3B5532] transition-colors">
              <span class="label-caps text-[9px] leading-tight text-center font-bold tracking-normal">
                Şanlıurfa • Lüks Artisan Lezzet •
              </span>
            </a>

          </div>

        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
  @ViewChild('heroText') heroText!: ElementRef;
  @ViewChild('heroImage') heroImage!: ElementRef;

  constructor() {
    afterNextRender(() => {
      if (this.heroText?.nativeElement && this.heroImage?.nativeElement) {
        const items = this.heroText.nativeElement.querySelectorAll('.hero-item');
        gsap.fromTo(
          items,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
        );
        gsap.fromTo(
          this.heroImage.nativeElement,
          { opacity: 0, scale: 0.9, rotate: -2 },
          { opacity: 1, scale: 1, rotate: 0, duration: 1.2, delay: 0.3, ease: 'power3.out' }
        );
      }
    });
  }

  public onHeroImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/hero-bakery.jpg';
  }
}
