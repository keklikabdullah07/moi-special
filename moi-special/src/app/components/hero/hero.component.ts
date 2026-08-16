import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="hero" class="relative overflow-hidden bg-[#FFF8F2] pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-[#D6C9B6]/40">
      
      <!-- Background Ambient Glow -->
      <div class="absolute top-1/4 -left-20 w-96 h-96 bg-[#CFEFC0]/30 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-10 right-0 w-96 h-96 bg-[#FFDCC2]/40 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <!-- Text Content Column -->
          <div #heroText class="lg:col-span-7 space-y-8 text-left z-10">
            
            <!-- Eyebrow Badge -->
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE4D8] border border-[#D6C9B6] text-[#526E48]">
              <span class="w-2 h-2 rounded-full bg-[#526E48] animate-pulse"></span>
              <span class="label-caps text-[11px] font-semibold tracking-widest text-[#3B5532]">
                Şanlıurfa • Modern Artisan Pastane & Fırın
              </span>
            </div>

            <!-- Headline -->
            <h1 class="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1F1B14] leading-[1.15]">
              Mezopotamya Gün Işığında <br class="hidden sm:inline" />
              <span class="italic font-normal text-[#526E48]">Artisan Fırın Sanatı</span>
            </h1>

            <!-- Subtitle -->
            <p class="font-sans text-base sm:text-lg text-[#434840] max-w-2xl leading-relaxed">
              Tarihi Şanlıurfa taş fırın kültürünün geleneksel ustalığı, Fransız patisserie inceliği ve zümrüt Antep fıstığının en eşsiz haliyle buluşuyor. Günlük taze pişen lezzetlerimizi keşfedin.
            </p>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center gap-4 pt-2">
              <a href="#menu" class="px-8 py-4 rounded-full bg-[#B87333] hover:bg-[#784000] text-white font-medium text-xs tracking-wider uppercase transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center gap-3 group">
                <span>Menüyü Keşfet</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              
              <a href="#contact" class="px-8 py-4 rounded-full bg-transparent hover:bg-[#EDE4D8]/60 text-[#3B5532] border border-[#526E48] font-semibold text-xs tracking-wider uppercase transition-all duration-300">
                Şubemizi Ziyaret Et
              </a>
            </div>

            <!-- Trust / Metric Highlights -->
            <div class="grid grid-cols-3 gap-6 pt-8 border-t border-[#D6C9B6]/60 max-w-xl">
              <div>
                <span class="block font-serif text-2xl lg:text-3xl font-bold text-[#526E48]">100%</span>
                <span class="label-caps text-[10px] text-[#434840]">Boz Antep Fıstığı</span>
              </div>
              <div>
                <span class="block font-serif text-2xl lg:text-3xl font-bold text-[#B87333]">72 Saat</span>
                <span class="label-caps text-[10px] text-[#434840]">Soğuk Maya Fermentasyonu</span>
              </div>
              <div>
                <span class="block font-serif text-2xl lg:text-3xl font-bold text-[#526E48]">Günlük</span>
                <span class="label-caps text-[10px] text-[#434840]">Taze Fırın Üretimi</span>
              </div>
            </div>

          </div>

          <!-- Arched Hero Image Column -->
          <div #heroImage class="lg:col-span-5 relative flex justify-center">
            
            <!-- Architectural Soft Arch Container -->
            <div class="relative w-full max-w-md aspect-[3/4] p-3 rounded-t-[10rem] rounded-b-3xl bg-[#EDE4D8] border border-[#D6C9B6] shadow-2xl overflow-hidden group">
              
              <!-- Inner Arch Image -->
              <div class="w-full h-full rounded-t-[9.5rem] rounded-b-2xl overflow-hidden relative">
                <img 
                  src="assets/croissant.jpg" 
                  alt="Moi Special Artisan Pastane Görseli" 
                  class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  (error)="onHeroImgError($event)" />
                
                <div class="absolute inset-0 bg-gradient-to-t from-[#1F1B14]/60 via-transparent to-transparent"></div>

                <!-- Floating Product Badge on Image Base -->
                <div class="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#FFF8F2]/95 backdrop-blur-md border border-[#D6C9B6] shadow-lg">
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

            <!-- Floating Decorative Stamp Element -->
            <div class="absolute -bottom-6 -left-6 hidden sm:flex w-24 h-24 rounded-full bg-[#526E48] text-white items-center justify-center p-2 text-center shadow-xl rotate-12">
              <span class="label-caps text-[9px] leading-tight text-center font-bold tracking-normal">
                Şanlıurfa Merkezli Lüks Lezzet
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  `
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('heroText') heroText!: ElementRef;
  @ViewChild('heroImage') heroImage!: ElementRef;

  public ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      gsap.fromTo(
        this.heroText.nativeElement,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        this.heroImage.nativeElement,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.2, delay: 0.2, ease: 'power3.out' }
      );
    }
  }

  public onHeroImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/hero-bakery.jpg';
  }
}
