import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
  avatarBg: string;
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="reviews" class="py-16 bg-[#EDE4D8]/40 border-t border-b border-[#D6C9B6]/60">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header with Google Rating Badge -->
        <div class="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#526E48]/10 text-[#526E48] border border-[#526E48]/20">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#B87333]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span class="label-caps text-[10px] font-bold text-[#3B5532]">Google Haritalar İşletme Bilgisi</span>
            </div>
            <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#1F1B14]">
              Misafirlerimizin Deneyimleri & Görüşleri
            </h2>
            <p class="font-sans text-xs sm:text-sm text-[#434840]">
              Sırrın Karşıyaka / Kanalboyu şubemizde ağırladığımız misafirlerimizin görüşleri ve Google Haritalar yönlendirmesi.
            </p>
          </div>

          <!-- Overall Rating Summary Card -->
          <div class="flex items-center gap-4 p-4 rounded-2xl bg-[#FFF8F2] border border-[#D6C9B6] shadow-sm">
            <div class="flex flex-col items-center justify-center pr-4 border-r border-[#D6C9B6]/60">
              <span class="font-serif text-3xl font-bold text-[#1F1B14]">5.0</span>
              <div class="flex text-[#B87333]">
                @for (star of [1,2,3,4,5]; track star) {
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                }
              </div>
            </div>

            <div class="space-y-1">
              <span class="font-serif font-bold text-sm text-[#1F1B14] block">Moi Fırın (Moi Special)</span>
              <a 
                href="https://share.google/P5BMtr0gzI00D3TQj" 
                target="_blank" 
                rel="noopener"
                class="text-[11px] text-[#B87333] hover:underline font-medium inline-flex items-center gap-1">
                <span>Google'da Yorum Değerlendirmesi Yap</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Customer Reviews Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          @for (review of reviews; track review.id) {
            <div class="bg-[#FFF8F2] border border-[#D6C9B6] rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow space-y-4">
              
              <!-- Stars & Date -->
              <div class="flex items-center justify-between">
                <div class="flex text-[#B87333]">
                  @for (star of [1,2,3,4,5]; track star) {
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  }
                </div>
                <span class="label-caps text-[10px] text-[#434840]/70">{{ review.date }}</span>
              </div>

              <!-- Review Quote -->
              <p class="font-sans text-xs sm:text-sm text-[#1F1B14] leading-relaxed italic">
                "{{ review.text }}"
              </p>

              <!-- Author Info -->
              <div class="flex items-center gap-3 pt-4 border-t border-[#D6C9B6]/40">
                <div [class]="review.avatarBg" class="w-9 h-9 rounded-full text-white font-serif font-bold text-xs flex items-center justify-center shadow-xs">
                  {{ review.author[0] }}
                </div>
                <div>
                  <h4 class="font-serif font-bold text-xs text-[#1F1B14]">{{ review.author }}</h4>
                  <span class="label-caps text-[9px] text-[#526E48]">Şanlıurfa Şubesi Misafiri</span>
                </div>
              </div>

            </div>
          }
        </div>

        <!-- Google Write Review Action Banner -->
        <div class="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="https://share.google/P5BMtr0gzI00D3TQj" 
            target="_blank" 
            rel="noopener"
            class="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#526E48] hover:bg-[#3B5532] text-white text-xs font-semibold uppercase tracking-wider shadow-lg active:scale-95 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#CFEFC0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Google Haritalar'da Değerlendirme Bırakın</span>
          </a>
        </div>

      </div>
    </section>
  `
})
export class ReviewsComponent {
  public readonly reviews: Review[] = [
    {
      id: 1,
      author: 'Gözde C.',
      rating: 5,
      date: 'Kanalboyu Şubesi',
      text: 'Sırrın Karşıyaka\'da açılan Moi Fırın mükemmel bir mekan olmuş! Antep fıstıklı kruvasan ve taze döküm kahveler kesinlikle denenmeli.',
      avatarBg: 'bg-[#526E48]'
    },
    {
      id: 2,
      author: 'Serkan B.',
      rating: 5,
      date: 'Kanalboyu Şubesi',
      text: 'Geleneksel Urfa odun fırını lezzeti ile Fransız patisserie ustaları bir araya gelmiş. Ekşi mayalı ekmekler ve mekan atmosferi harika.',
      avatarBg: 'bg-[#B87333]'
    },
    {
      id: 3,
      author: 'Ayşe K.',
      rating: 5,
      date: 'Kanalboyu Şubesi',
      text: 'Mekan tasarımı, çalışanların nezaketi ve fıstıklı entremet pastanın lezzeti tek kelimeyle kusursuz. Ailemizle çok keyif aldık.',
      avatarBg: 'bg-[#3B5532]'
    }
  ];
}
