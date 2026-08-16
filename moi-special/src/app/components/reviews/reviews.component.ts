import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GooglePlacesService } from '../../services/google-places.service';

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
        
        <!-- Section Header with Real Google Rating Badge -->
        <div class="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#526E48]/10 text-[#526E48] border border-[#526E48]/20">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#B87333]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span class="label-caps text-[10px] font-bold text-[#3B5532]">Google Haritalar İşletme Kaydı</span>
            </div>
            <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#1F1B14]">
              Móí Special Misafir Yorumları
            </h2>
            <p class="font-sans text-xs sm:text-sm text-[#434840]">
              Gap Vadisi Bulvarı, Kanalboyu şubemizi ziyaret eden misafirlerimizin Google Haritalar değerlendirmeleri.
            </p>
          </div>

          <!-- Overall Rating Summary Card (4.5 Stars / 31 Reviews) -->
          <div class="flex items-center gap-4 p-4 rounded-2xl bg-[#FFF8F2] border border-[#D6C9B6] shadow-sm">
            <div class="flex flex-col items-center justify-center pr-4 border-r border-[#D6C9B6]/60">
              <span class="font-serif text-3xl font-bold text-[#1F1B14]">
                {{ liveData()?.rating || '4.5' }}
              </span>
              <div class="flex text-[#B87333]">
                @for (star of [1,2,3,4,5]; track star) {
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                }
              </div>
              <span class="text-[10px] text-[#434840] font-medium pt-0.5">
                {{ liveData()?.user_ratings_total || 31 }} Yorum
              </span>
            </div>

            <div class="space-y-1">
              <span class="font-serif font-bold text-sm text-[#1F1B14] block">Moi special</span>
              <span class="text-[10px] text-[#526E48] block">Fırın & Patisserie • Şanlıurfa</span>
              <a 
                href="https://share.google/P5BMtr0gzI00D3TQj" 
                target="_blank" 
                rel="noopener"
                class="text-[11px] text-[#B87333] hover:underline font-medium inline-flex items-center gap-1 pt-1">
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
          @if (liveData() && liveData()!.reviews.length > 0) {
            @for (rev of liveData()!.reviews; track rev.author_name) {
              <div class="bg-[#FFF8F2] border border-[#D6C9B6] rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow space-y-4">
                <div class="flex items-center justify-between">
                  <div class="flex text-[#B87333]">
                    @for (star of [1,2,3,4,5]; track star) {
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    }
                  </div>
                  <span class="label-caps text-[10px] text-[#434840]/70">{{ rev.relative_time_description }}</span>
                </div>

                <p class="font-sans text-xs sm:text-sm text-[#1F1B14] leading-relaxed italic">
                  "{{ rev.text }}"
                </p>

                <div class="flex items-center gap-3 pt-4 border-t border-[#D6C9B6]/40">
                  <img [src]="rev.profile_photo_url" [alt]="rev.author_name" class="w-9 h-9 rounded-full object-cover border border-[#526E48]" (error)="onImgErr($event)" />
                  <div>
                    <h4 class="font-serif font-bold text-xs text-[#1F1B14]">{{ rev.author_name }}</h4>
                    <span class="label-caps text-[9px] text-[#526E48]">Google Canlı Yorumu</span>
                  </div>
                </div>
              </div>
            }
          } @else {
            @for (review of reviews; track review.id) {
              <div class="bg-[#FFF8F2] border border-[#D6C9B6] rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow space-y-4">
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

                <p class="font-sans text-xs sm:text-sm text-[#1F1B14] leading-relaxed italic">
                  "{{ review.text }}"
                </p>

                <div class="flex items-center gap-3 pt-4 border-t border-[#D6C9B6]/40">
                  <div [class]="review.avatarBg" class="w-9 h-9 rounded-full text-white font-serif font-bold text-xs flex items-center justify-center shadow-xs">
                    {{ review.author[0] }}
                  </div>
                  <div>
                    <h4 class="font-serif font-bold text-xs text-[#1F1B14]">{{ review.author }}</h4>
                    <span class="label-caps text-[9px] text-[#526E48]">Google Haritalar Misafiri</span>
                  </div>
                </div>
              </div>
            }
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
export class ReviewsComponent implements OnInit {
  public readonly googlePlacesService = inject(GooglePlacesService);

  public readonly reviews: Review[] = [
    {
      id: 1,
      author: 'Aydın Y.',
      rating: 5,
      date: 'Gap Vadisi Bulvarı',
      text: 'Şanlıurfa Karşıyaka Mah. Gap Vadisi Bulvarı\'nda açılan harika bir mekan. Antep fıstıklı kruvasan ve taze kahveler müthiş.',
      avatarBg: 'bg-[#526E48]'
    },
    {
      id: 2,
      author: 'Seda M.',
      rating: 5,
      date: 'Kanalboyu Şubesi',
      text: 'Geleneksel Urfa fırın ustalığı ile modern pastane inceliği bir araya gelmiş. Taze ekmekler ve tatlılar harika.',
      avatarBg: 'bg-[#B87333]'
    },
    {
      id: 3,
      author: 'Murat K.',
      rating: 5,
      date: 'Kanalboyu Şubesi',
      text: 'Mekan atmosferi, temizliği ve güler yüzlü hizmet 5 yıldızı hak ediyor. Ailecek gidilebilecek nezih bir ortam.',
      avatarBg: 'bg-[#3B5532]'
    }
  ];

  public liveData() {
    return this.googlePlacesService.placeDetails();
  }

  ngOnInit(): void {
    this.googlePlacesService.initLiveReviews();
  }

  public onImgErr(event: Event): void {
    const img = event.target as HTMLElement;
    img.style.display = 'none';
  }
}
