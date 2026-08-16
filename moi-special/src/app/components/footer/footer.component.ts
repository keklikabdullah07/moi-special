import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer id="contact" class="bg-[#1F1B14] text-[#EDE4D8] pt-16 pb-12 border-t border-[#D6C9B6]/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#EDE4D8]/10">
          
          <!-- Brand Column -->
          <div class="space-y-4 md:col-span-1">
            <div class="flex flex-col">
              <span class="font-serif text-2xl font-bold tracking-tight text-[#CFEFC0]">MOI SPECIAL</span>
              <span class="label-caps text-[9px] text-[#B87333] tracking-[0.2em]">Şanlıurfa • Artisan Patisserie</span>
            </div>
            <p class="font-sans text-xs text-[#D6C9B6]/80 leading-relaxed">
              Tarihin ve lezzetin buluştuğu nokta. Geleneksel taş fırın ustalığı ve Fransız patisserie zarafeti.
            </p>
          </div>

          <!-- Quick Links -->
          <div class="space-y-3">
            <h4 class="label-caps text-xs text-[#CFEFC0]">Keşfedin</h4>
            <ul class="space-y-2 text-xs text-[#D6C9B6]/80 font-sans">
              <li><a href="#hero" class="hover:text-white transition-colors">Ana Sayfa</a></li>
              <li><a href="#menu" class="hover:text-white transition-colors">Menü Koleksiyonu</a></li>
              <li><a href="#about" class="hover:text-white transition-colors">Hikayemiz & Felsefemiz</a></li>
              <li><a href="#branches" class="hover:text-white transition-colors">Şanlıurfa Şubelerimiz</a></li>
            </ul>
          </div>

          <!-- Working Hours -->
          <div class="space-y-3">
            <h4 class="label-caps text-xs text-[#CFEFC0]">Çalışma Saatleri</h4>
            <div class="space-y-1 text-xs text-[#D6C9B6]/80">
              <p><strong class="text-white font-medium">Hafta İçi:</strong> 07:30 - 23:30</p>
              <p><strong class="text-white font-medium">Hafta Sonu:</strong> 08:00 - 00:00</p>
              <p class="text-[10px] text-[#B87333] pt-1">Her sabah taze taş fırın üretimi</p>
            </div>
          </div>

          <!-- Location & Contact -->
          <div class="space-y-3">
            <h4 class="label-caps text-xs text-[#CFEFC0]">İletişim & Konum</h4>
            <p class="text-xs text-[#D6C9B6]/80 leading-relaxed">
              Karaköprü / Şanlıurfa<br />
              Rezervasyon: +90 (414) 000 00 00<br />
              info&#64;moispecial.com
            </p>
          </div>

        </div>

        <!-- Copyright Bottom -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#D6C9B6]/50">
          <p>© 2026 Moi Special Artisan Patisserie. Tüm hakları saklıdır.</p>
          <div class="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" class="hover:text-white transition-colors">Gizlilik Politikası</a>
            <a href="#" class="hover:text-white transition-colors">Kullanım Şartları</a>
            <a href="#" class="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {}
