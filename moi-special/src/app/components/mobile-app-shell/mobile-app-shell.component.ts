import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ReservationService } from '../../services/reservation.service';
import { StoryService } from '../../services/story.service';
import { GooglePlacesService } from '../../services/google-places.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-mobile-app-shell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative bg-[#FFF8F2] min-h-screen pb-24">
      
      <!-- App Header Bar -->
      <header class="sticky top-0 z-40 bg-[#FFF8F2]/95 backdrop-blur-md border-b border-[#D6C9B6]/40 px-4 py-3 flex items-center justify-between shadow-xs">
        
        <!-- Brand & Location -->
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-full bg-[#526E48] text-white font-serif font-bold text-lg flex items-center justify-center shadow-xs">
            M
          </div>
          <div>
            <h2 class="font-serif font-bold text-base text-[#1F1B14] leading-none">Móí Special</h2>
            <span class="label-caps text-[8px] text-[#B87333] tracking-wider block mt-0.5">Sırrın Karşıyaka • Taş Fırın</span>
          </div>
        </div>

        <!-- Cart Quick Badge -->
        <div class="flex items-center gap-2">
          <button 
            (click)="cartService.toggleDrawer()"
            class="relative p-2 rounded-full bg-[#EDE4D8] text-[#1F1B14] hover:bg-[#D6C9B6] transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            @if (cartService.itemCount() > 0) {
              <span class="absolute -top-1 -right-1 bg-[#B87333] text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {{ cartService.itemCount() }}
              </span>
            }
          </button>
        </div>

      </header>

      <!-- App Story Highlights (Instagram / Native App Style) -->
      <div class="py-4 px-4 overflow-x-auto no-scrollbar flex items-center gap-4 border-b border-[#D6C9B6]/40 bg-[#EDE4D8]/30">
        
        <!-- Owner Add Story Button (+) RESTRICTED TO ADMIN ONLY -->
        <button 
          (click)="handleAddStoryClick()"
          class="flex flex-col items-center gap-1.5 shrink-0 group active:scale-95 transition-transform cursor-pointer">
          <div class="w-16 h-16 rounded-full border-2 border-dashed border-[#526E48] bg-[#526E48]/10 flex items-center justify-center text-[#526E48] relative">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span class="absolute -bottom-1 -right-1 bg-[#B87333] text-white rounded-full w-5 h-5 text-[10px] font-bold flex items-center justify-center shadow-sm">
              +
            </span>
          </div>
          <span class="label-caps text-[9px] text-[#526E48] font-bold">
            {{ authService.isAdmin() ? '+ Hikaye Ekle' : 'Yönetici Paylaşımı' }}
          </span>
        </button>

        <!-- Instagram Story Rings -->
        @for (group of storyService.storyGroups(); track group.id) {
          <button 
            (click)="storyService.openGroup(group)"
            class="flex flex-col items-center gap-1.5 shrink-0 group active:scale-95 transition-transform cursor-pointer">
            <div 
              [class.bg-gradient-to-tr]="group.hasUnread"
              [class.from-[#526E48]]="group.hasUnread"
              [class.via-[#B87333]]="group.hasUnread"
              [class.to-[#CFEFC0]]="group.hasUnread"
              [class.bg-[#D6C9B6]]="!group.hasUnread"
              class="w-16 h-16 rounded-full p-[2px] shadow-sm">
              <img [src]="group.avatar" [alt]="group.name" class="w-full h-full rounded-full object-cover border-2 border-[#FFF8F2]" />
            </div>
            <span class="label-caps text-[9px] text-[#1F1B14] max-w-[68px] truncate text-center font-medium">{{ group.name }}</span>
          </button>
        }
      </div>

      <!-- App Native Banner Hero Card -->
      <div class="px-4 pt-4">
        <div class="relative rounded-3xl bg-gradient-to-br from-[#526E48] to-[#3B5532] text-white p-5 overflow-hidden shadow-xl">
          
          <!-- Background Arch Watermark -->
          <div class="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none"></div>

          <div class="relative z-10 space-y-3 max-w-[65%]">
            <span class="inline-block label-caps text-[9px] bg-white/20 text-white px-2.5 py-0.5 rounded-full backdrop-blur-xs">
              Günün Lüks Lezzeti
            </span>
            <h3 class="font-serif text-xl font-bold leading-tight">
              Antep Fıstıklı Artisan Croissant
            </h3>
            <p class="text-[11px] text-white/90 line-clamp-2">
              Kat kat Fransız tereyağlı çıtır hamur, içi bol Antep fıstığı kremasıyla.
            </p>

            <button 
              (click)="addFeaturedToCart()"
              class="mt-2 px-4 py-2 rounded-full bg-[#B87333] hover:bg-[#784000] text-white text-[11px] font-bold uppercase tracking-wider shadow-md active:scale-95 transition-transform flex items-center gap-1.5 cursor-pointer">
              <span>Sipariş Ver • 185 ₺</span>
            </button>
          </div>

          <!-- Hero Image Floating on Card Right -->
          <div class="absolute -right-4 -bottom-4 w-36 h-36 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-white/30 shadow-2xl rotate-3">
            <img src="assets/croissant.jpg" alt="Croissant" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <!-- Native Category Filter Segmented Control -->
      <div id="menu" class="px-4 pt-6 pb-2 scroll-mt-16">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-serif text-lg font-bold text-[#1F1B14]">Menü Koleksiyonu</h3>
          <button (click)="showAllProducts()" class="label-caps text-[10px] text-[#B87333] font-bold underline cursor-pointer active:scale-95 transition-transform">
            Tümünü Gör (Sıfırla)
          </button>
        </div>

        <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          @for (cat of categories; track cat.id) {
            <button 
              (click)="selectedCategory.set(cat.id)"
              [class.bg-[#526E48]]="selectedCategory() === cat.id"
              [class.text-white]="selectedCategory() === cat.id"
              [class.bg-[#EDE4D8]]="selectedCategory() !== cat.id"
              [class.text-[#1F1B14]]="selectedCategory() !== cat.id"
              class="px-4 py-2 rounded-full text-[11px] font-semibold tracking-wider whitespace-nowrap border border-[#D6C9B6]/60 transition-all active:scale-95 cursor-pointer">
              {{ cat.name }}
            </button>
          }
        </div>
      </div>

      <!-- Native App Horizontal Swipeable Product Shelf -->
      <div class="px-4 py-2">
        <div class="flex gap-4 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory">
          @for (product of filteredProducts(); track product.id) {
            <div class="snap-start shrink-0 w-64 bg-[#EDE4D8]/50 border border-[#D6C9B6] rounded-3xl p-3 flex flex-col justify-between shadow-sm active:scale-[0.98] transition-transform">
              
              <!-- Image -->
              <div class="relative w-full h-40 rounded-2xl overflow-hidden mb-3 bg-[#EDE4D8]">
                <img [src]="product.imageUrl" [alt]="product.name" class="w-full h-full object-cover" />
                @if (product.isSpecialty) {
                  <span class="absolute top-2 left-2 bg-[#B87333] text-white label-caps text-[8px] px-2 py-0.5 rounded-full shadow-sm">
                    İmza Lezzet
                  </span>
                }
              </div>

              <!-- Content -->
              <div class="space-y-1 mb-3">
                <h4 class="font-serif font-bold text-sm text-[#1F1B14] line-clamp-1">{{ product.name }}</h4>
                <p class="text-[11px] text-[#434840] line-clamp-2 leading-tight">{{ product.description }}</p>
              </div>

              <!-- Price & Quick Add Button -->
              <div class="flex items-center justify-between pt-2 border-t border-[#D6C9B6]/60">
                <span class="font-serif font-bold text-base text-[#3B5532]">{{ product.price }} ₺</span>
                <button 
                  (click)="cartService.addItem(product)"
                  class="w-9 h-9 rounded-full bg-[#526E48] text-white flex items-center justify-center shadow-md active:scale-90 transition-transform cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

            </div>
          }
        </div>
      </div>

      <!-- Mobile Google Customer Reviews Card -->
      <div class="px-4 py-4">
        <div class="rounded-3xl bg-[#EDE4D8]/60 border border-[#D6C9B6] p-5 space-y-3 shadow-xs">
          <div class="flex items-center justify-between">
            <span class="label-caps text-[9px] text-[#526E48] font-bold">Google Müşteri Yorumları</span>
            <span class="font-serif font-bold text-sm text-[#B87333] flex items-center gap-1">
              ★ {{ liveRating() }} / 5.0 ({{ liveTotalReviews() }} Yorum)
            </span>
          </div>
          
          <p class="font-sans text-xs italic text-[#1F1B14]">
            "{{ firstReviewText() }}"
          </p>
          <div class="flex items-center justify-between pt-2 border-t border-[#D6C9B6]/40 text-[10px] text-[#434840]">
            <span>— {{ firstReviewAuthor() }}</span>
            <a 
              href="https://share.google/P5BMtr0gzI00D3TQj" 
              target="_blank" 
              rel="noopener" 
              class="text-[#526E48] font-bold underline">
              Tüm Yorumları Gör →
            </a>
          </div>
        </div>
      </div>

      <!-- App Action Card: Quick Reservation / Google Maps Location -->
      <div class="px-4 py-2">
        <div class="rounded-3xl bg-[#EDE4D8] border border-[#D6C9B6] p-5 flex items-center justify-between shadow-sm">
          <div class="space-y-1">
            <span class="label-caps text-[9px] text-[#B87333]">Masa & Davet</span>
            <h4 class="font-serif font-bold text-base text-[#1F1B14]">Masa Rezerve Edin</h4>
            <p class="text-[11px] text-[#434840]">Kanalboyu Gap Vadisi Bulvarı şubemizde yerinizi ayırtın.</p>
          </div>
          <button 
            (click)="reservationService.openModal()"
            class="px-4 py-2.5 rounded-full bg-[#B87333] hover:bg-[#784000] text-white text-xs font-bold uppercase tracking-wider shadow-md active:scale-95 transition-transform whitespace-nowrap cursor-pointer">
            Rezerve Et
          </button>
        </div>
      </div>

    </div>
  `
})
export class MobileAppShellComponent {
  public readonly productService = inject(ProductService);
  public readonly cartService = inject(CartService);
  public readonly reservationService = inject(ReservationService);
  public readonly storyService = inject(StoryService);
  public readonly googlePlacesService = inject(GooglePlacesService);
  public readonly authService = inject(AuthService);
  public readonly toastService = inject(ToastService);

  public readonly selectedCategory = signal<string>('all');

  public readonly categories = [
    { id: 'all', name: 'Tüm Lezzetler' },
    { id: 'fistikli', name: 'Fıstıklı Özel' },
    { id: 'pastane', name: 'Artisan Pastane' },
    { id: 'firin', name: 'Taş Fırın & Ekmek' },
    { id: 'icecek', name: 'Gurme İçecekler' }
  ];

  public readonly filteredProducts = computed(() => {
    const cat = this.selectedCategory();
    const all = this.productService.products();
    if (cat === 'all') return all;
    return all.filter(p => p.category === cat);
  });

  public handleAddStoryClick(): void {
    if (this.authService.isAdmin()) {
      this.storyService.isAdminAddOpen.set(true);
    } else {
      this.toastService.show('🔒 Hikaye paylaşımı yalnızca Yönetici (Sayın Abdullah Keklik) tarafından yapılabilir.');
      this.authService.isAuthModalOpen.set(true);
    }
  }

  public showAllProducts(): void {
    this.selectedCategory.set('all');
    if (typeof window !== 'undefined') {
      const elem = document.getElementById('menu');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  public liveRating(): string {
    const live = this.googlePlacesService.placeDetails();
    return live ? live.rating.toFixed(1) : '4.5';
  }

  public liveTotalReviews(): number {
    const live = this.googlePlacesService.placeDetails();
    return live ? live.user_ratings_total : 31;
  }

  public firstReviewText(): string {
    const live = this.googlePlacesService.placeDetails();
    if (live && live.reviews && live.reviews[0]) {
      return live.reviews[0].text;
    }
    return 'Geleneksel Şanlıurfa taş fırın lezzetleri ve harika taze pastalar. Mekan atmosferi çok huzurlu.';
  }

  public firstReviewAuthor(): string {
    const live = this.googlePlacesService.placeDetails();
    if (live && live.reviews && live.reviews[0]) {
      return live.reviews[0].author_name + ' (Google Misafiri)';
    }
    return 'Google Misafiri';
  }

  public addFeaturedToCart(): void {
    const croissant = this.productService.products().find(p => p.id === 'p1');
    if (croissant) {
      this.cartService.addItem(croissant);
    }
  }
}
