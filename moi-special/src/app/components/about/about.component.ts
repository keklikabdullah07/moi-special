import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="py-20 bg-[#FFF8F2] relative overflow-hidden border-b border-[#D6C9B6]/40">
      
      <!-- Background Ambient Blobs -->
      <div class="absolute -top-20 right-0 w-96 h-96 bg-[#CFEFC0]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-20 -left-20 w-96 h-96 bg-[#FFDCC2]/30 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Image Showcase Column -->
          <div class="lg:col-span-5 relative flex justify-center">
            <div class="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-[#D6C9B6] shadow-2xl group">
              <img 
                src="assets/hero-bakery.jpg" 
                alt="Moi Special Taş Fırın Ustalığı" 
                class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105" />
              
              <div class="absolute inset-0 bg-gradient-to-t from-[#1F1B14]/80 via-transparent to-transparent"></div>

              <div class="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span class="label-caps text-[9px] text-[#CFEFC0]">Gelenek & Ustalık</span>
                <h4 class="font-serif text-xl font-bold">Geleneksel Şanlıurfa Taş Fırını</h4>
                <p class="text-xs text-white/80">Odun ateşinde 72 saat dinlendirilen ekşi maya hamurlar.</p>
              </div>
            </div>

            <!-- Floating Badge -->
            <div class="absolute -bottom-5 -right-5 bg-[#526E48] text-white p-4 rounded-2xl shadow-xl hidden sm:block">
              <span class="block font-serif font-bold text-2xl">2026</span>
              <span class="label-caps text-[9px] text-[#CFEFC0]">Kuruluş Yılı</span>
            </div>
          </div>

          <!-- Content Column -->
          <div class="lg:col-span-7 space-y-6 text-left">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE4D8] border border-[#D6C9B6] text-[#526E48]">
              <span class="w-2 h-2 rounded-full bg-[#526E48]"></span>
              <span class="label-caps text-[10px] font-semibold text-[#3B5532]">Hikayemiz & Felsefemiz</span>
            </div>

            <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F1B14] leading-tight">
              Tarihi Taş Fırın Kültürü, <br />
              <span class="italic font-normal text-[#526E48]">Fransız Zarafetiyle Buluşuyor</span>
            </h2>

            <p class="font-sans text-sm sm:text-base text-[#434840] leading-relaxed">
              Móí Special, Şanlıurfa'nın köklü taş fırın geleneğini modern Fransız patisserie ustalığı ile harmanlayarak doğdu. Sırrın Karşıyaka / Gap Vadisi Bulvarı şubemizde her sabah gün ışımadan başlayan pişirim yolculuğumuzda, katkısız saf tereyağı ve bölgenin en seçkin zümrüt Antep fıstıkları kullanılır.
            </p>

            <!-- 3 Pillar Features -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div class="p-4 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] space-y-1">
                <span class="font-serif font-bold text-lg text-[#526E48]">100% Saf</span>
                <h4 class="font-bold text-xs text-[#1F1B14]">Boz Antep Fıstığı</h4>
                <p class="text-[11px] text-[#434840]">Sadece bölgenin en taze lezzetleri.</p>
              </div>

              <div class="p-4 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] space-y-1">
                <span class="font-serif font-bold text-lg text-[#B87333]">72 Saat</span>
                <span class="font-bold text-xs text-[#1F1B14] block">Ekşi Maya Fermentasyonu</span>
                <p class="text-[11px] text-[#434840]">Karaköprü taş fırın pişiği.</p>
              </div>

              <div class="p-4 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] space-y-1">
                <span class="font-serif font-bold text-lg text-[#526E48]">84 Katman</span>
                <h4 class="font-bold text-xs text-[#1F1B14]">Fransız Tereyağlı Hamur</h4>
                <p class="text-[11px] text-[#434840]">Çıtır croissant katmanları.</p>
              </div>
            </div>

            <div class="pt-4 flex flex-wrap items-center gap-4">
              <button 
                (click)="reservationService.openModal()"
                class="px-8 py-3.5 rounded-full bg-[#B87333] hover:bg-[#784000] text-white text-xs font-semibold uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer">
                Masa Rezerve Et
              </button>
              <a 
                href="https://share.google/P5BMtr0gzI00D3TQj" 
                target="_blank" 
                rel="noopener"
                class="px-8 py-3.5 rounded-full border border-[#526E48] text-[#526E48] hover:bg-[#526E48] hover:text-white text-xs font-semibold uppercase tracking-wider transition-all">
                Haritada Konum Al
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  `
})
export class AboutComponent {
  public readonly reservationService = inject(ReservationService);
}
