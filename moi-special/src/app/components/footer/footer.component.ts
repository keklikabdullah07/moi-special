import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteAssetService } from '../../services/site-asset.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer id="contact" class="bg-[#1F1B14] text-white pt-16 pb-12 border-t border-[#B87333]/30 relative group/footer">
      
      <!-- WEBCMS LIVE EDIT OVERLAY BADGE FOR FOOTER -->
      @if (assetService.isEditMode()) {
        <div class="absolute top-4 right-4 z-30 animate-bounce">
          <button 
            (click)="assetService.openSectionEditor('footer')"
            class="px-5 py-2.5 rounded-full bg-[#526E48] hover:bg-[#3B5532] text-white text-xs font-bold uppercase tracking-wider shadow-2xl border-2 border-white flex items-center gap-2 active:scale-95 transition-all cursor-pointer">
            <span>✏️ Footer, Saatler & Adresi Canlı Düzenle</span>
          </button>
        </div>
      }

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <!-- Column 1: Brand Info -->
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#526E48] text-white font-serif font-bold text-xl flex items-center justify-center">
                M
              </div>
              <span class="font-serif text-2xl font-bold tracking-tight text-white">
                {{ assetService.brandName() }}
              </span>
            </div>

            <p class="font-sans text-xs text-white/70 leading-relaxed">
              Şanlıurfa Sırrın Karşıyaka / Gap Vadisi Bulvarı şubemizde geleneksel taş fırın ustalığı ve Fransız patisserie inceliği.
            </p>

            <div class="pt-2">
              <span class="label-caps text-[9px] text-[#CFEFC0] block font-bold">Gerçek Google Puanı</span>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-amber-400 text-sm">★★★★★</span>
                <span class="font-serif font-bold text-sm text-white">4.5 / 5</span>
                <span class="text-[10px] text-white/60">(31 Yorum)</span>
              </div>
            </div>
          </div>

          <!-- Column 2: Quick Links -->
          <div class="space-y-3">
            <span class="label-caps text-[10px] text-[#B87333] font-bold">Hızlı Navigasyon</span>
            <ul class="space-y-2 text-xs font-medium text-white/80">
              <li>
                <button (click)="scrollToSection('hero')" class="hover:text-[#CFEFC0] transition-colors cursor-pointer">
                  {{ assetService.navHome() }}
                </button>
              </li>
              <li>
                <button (click)="scrollToSection('menu')" class="hover:text-[#CFEFC0] transition-colors cursor-pointer">
                  {{ assetService.navMenu() }}
                </button>
              </li>
              <li>
                <button (click)="scrollToSection('about')" class="hover:text-[#CFEFC0] transition-colors cursor-pointer">
                  {{ assetService.navStory() }}
                </button>
              </li>
              <li>
                <button (click)="scrollToSection('contact')" class="hover:text-[#CFEFC0] transition-colors cursor-pointer">
                  {{ assetService.navContact() }}
                </button>
              </li>
            </ul>
          </div>

          <!-- Column 3: Store Hours & Phone -->
          <div class="space-y-3">
            <span class="label-caps text-[10px] text-[#B87333] font-bold">Çalışma Saatleri & İletişim</span>
            <div class="space-y-2 text-xs text-white/80">
              <p class="font-bold text-[#CFEFC0]">{{ assetService.workingHours() }}</p>
              <p>
                <strong>Telefon:</strong> 
                <a href="tel:05550860594" class="hover:text-white underline ml-1">{{ assetService.storePhone() }}</a>
              </p>
              <p><strong>Açık Adres:</strong> {{ assetService.storeAddress() }}</p>
            </div>
          </div>

          <!-- Column 4: Google Maps Location CTA -->
          <div class="space-y-3">
            <span class="label-caps text-[10px] text-[#B87333] font-bold">Konum & Yol Tarifi</span>
            <p class="text-xs text-white/70">Gap Vadisi Bulvarı, Kanalboyu Haliliye şubemize yol tarifi alın.</p>
            
            <a 
              href="https://share.google/P5BMtr0gzI00D3TQj" 
              target="_blank" 
              rel="noopener"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#526E48] hover:bg-[#3B5532] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95">
              <span>📍 Google Haritalar'da Aç</span>
            </a>
          </div>

        </div>

        <!-- Bottom Copyright & Disclaimer -->
        <div class="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/50">
          <span>{{ assetService.footerCopyright() }}</span>
          <span>Designed for Móí Special Taş Fırın & Pastane</span>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {
  public readonly assetService = inject(SiteAssetService);

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
