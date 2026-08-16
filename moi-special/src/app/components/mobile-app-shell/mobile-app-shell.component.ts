import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-mobile-app-shell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Dedicated Mobile Native App Shell (Visible only on < md screens) -->
    <div class="md:hidden flex flex-col bg-[#FFF8F2] min-h-screen pb-24 select-none">
      
      <!-- Native Mobile Header Bar -->
      <header class="sticky top-0 z-30 bg-[#FFF8F2]/95 backdrop-blur-xl border-b border-[#D6C9B6]/60 px-4 py-3 flex items-center justify-between shadow-xs">
        
        <!-- Location Picker Pill -->
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-full bg-[#526E48]/10 border border-[#526E48]/20 flex items-center justify-center text-[#526E48]">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="label-caps text-[9px] text-[#B87333] tracking-wider">Teslimat / Şube</span>
            <span class="font-serif text-xs font-bold text-[#1F1B14] flex items-center gap-1">
              Karaköprü, Şanlıurfa
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-[#526E48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>

        <!-- Right Quick Actions (Cart & Notification) -->
        <div class="flex items-center gap-2">
          <button 
            (click)="cartService.toggleDrawer()"
            class="relative w-10 h-10 rounded-full bg-[#EDE4D8] border border-[#D6C9B6] flex items-center justify-center text-[#1F1B14] active:scale-90 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#526E48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            @if (cartService.itemCount() > 0) {
              <span class="absolute -top-1 -right-1 bg-[#B87333] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {{ cartService.itemCount() }}
              </span>
            }
          </button>
        </div>

      </header>

      <!-- App Story Highlights (Instagram / Native App Style) -->
      <div class="py-4 px-4 overflow-x-auto no-scrollbar flex items-center gap-4 border-b border-[#D6C9B6]/40 bg-[#EDE4D8]/30">
        @for (story of stories; track story.id) {
          <button 
            (click)="selectStory(story)"
            class="flex flex-col items-center gap-1.5 shrink-0 group active:scale-95 transition-transform cursor-pointer">
            <div class="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-[#526E48] via-[#B87333] to-[#CFEFC0] shadow-sm">
              <img [src]="story.image" [alt]="story.name" class="w-full h-full rounded-full object-cover border-2 border-[#FFF8F2]" />
            </div>
            <span class="label-caps text-[9px] text-[#1F1B14] max-w-[68px] truncate text-center font-medium">{{ story.name }}</span>
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
              class="mt-2 px-4 py-2 rounded-full bg-[#B87333] hover:bg-[#784000] text-white text-[11px] font-bold uppercase tracking-wider shadow-md active:scale-95 transition-transform flex items-center gap-1.5">
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
      <div class="px-4 pt-6 pb-2">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-serif text-lg font-bold text-[#1F1B14]">Menü Koleksiyonu</h3>
          <span class="label-caps text-[10px] text-[#B87333]">Tümünü Gör</span>
        </div>

        <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          @for (cat of productService.categories(); track cat.id) {
            <button 
              (click)="selectedCategory.set(cat.id)"
              [class.bg-[#526E48]]="selectedCategory() === cat.id"
              [class.text-white]="selectedCategory() === cat.id"
              [class.bg-[#EDE4D8]]="selectedCategory() !== cat.id"
              [class.text-[#1F1B14]]="selectedCategory() !== cat.id"
              class="px-4 py-2 rounded-full text-[11px] font-semibold tracking-wider whitespace-nowrap border border-[#D6C9B6]/60 transition-all active:scale-95">
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

      <!-- App Action Card: Quick Reservation -->
      <div class="px-4 py-4">
        <div class="rounded-3xl bg-[#EDE4D8] border border-[#D6C9B6] p-5 flex items-center justify-between shadow-sm">
          <div class="space-y-1">
            <span class="label-caps text-[9px] text-[#B87333]">Masa & Davet</span>
            <h4 class="font-serif font-bold text-base text-[#1F1B14]">Masa Rezerve Edin</h4>
            <p class="text-[11px] text-[#434840]">Şanlıurfa şubemizde yerinizi ayırtın.</p>
          </div>
          <button class="px-4 py-2.5 rounded-full bg-[#B87333] text-white text-xs font-bold uppercase tracking-wider shadow-md active:scale-95 transition-transform whitespace-nowrap">
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

  public readonly selectedCategory = signal<string>('all');

  public readonly filteredProducts = computed(() => {
    const cat = this.selectedCategory();
    const all = this.productService.products();
    if (cat === 'all') return all;
    return all.filter(p => p.category === cat);
  });

  public readonly stories = [
    { id: 1, name: 'Günün Taze', image: 'assets/croissant.jpg' },
    { id: 2, name: 'Entremet', image: 'assets/entremet.jpg' },
    { id: 3, name: 'Taş Fırın', image: 'assets/hero-bakery.jpg' },
    { id: 4, name: 'Kahveler', image: 'assets/croissant.jpg' },
    { id: 5, name: 'Şubemiz', image: 'assets/entremet.jpg' }
  ];

  public selectStory(story: any): void {
    // Scroll to menu or filter
    this.selectedCategory.set('all');
  }

  public addFeaturedToCart(): void {
    const croissant = this.productService.products().find(p => p.id === 'fistikli-croissant');
    if (croissant) {
      this.cartService.addItem(croissant);
    }
  }
}
