import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-menu-showcase',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="menu" class="py-20 lg:py-28 bg-[#FFF8F2]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span class="label-caps text-xs text-[#B87333]">Geleneksel & Modern Seçki</span>
          <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F1B14]">
            Moi Special Menü Koleksiyonu
          </h2>
          <p class="font-sans text-sm sm:text-base text-[#434840]">
            Şanlıurfa'nın bereketli topraklarından ilham alan, her biri usta ellerce hazırlanan özel lezzetlerimiz.
          </p>
        </div>

        <!-- Category Filter Tabs -->
        <div class="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar gap-2 sm:gap-3 pb-6 mb-10 border-b border-[#D6C9B6]/40">
          @for (cat of productService.categories(); track cat.id) {
            <button 
              (click)="selectedCategory.set(cat.id)"
              [class.bg-[#526E48]]="selectedCategory() === cat.id"
              [class.text-white]="selectedCategory() === cat.id"
              [class.bg-[#EDE4D8]]="selectedCategory() !== cat.id"
              [class.text-[#1F1B14]]="selectedCategory() !== cat.id"
              class="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 border border-[#D6C9B6] hover:border-[#526E48] whitespace-nowrap cursor-pointer">
              {{ cat.name }}
            </button>
          }
        </div>

        <!-- Product Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          @for (product of filteredProducts(); track product.id) {
            
            <!-- Soft Arch Product Card -->
            <div class="group flex flex-col bg-[#EDE4D8]/40 border border-[#D6C9B6] rounded-[2.5rem] p-4 transition-all duration-300 hover:shadow-xl hover:bg-[#EDE4D8]/80 hover:-translate-y-1">
              
              <!-- Arch Image Top -->
              <div class="relative w-full aspect-[4/3] rounded-t-[2.2rem] rounded-b-xl overflow-hidden bg-[#EDE4D8] mb-5">
                <img 
                  [src]="product.imageUrl" 
                  [alt]="product.name" 
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  (error)="onImgError($event)" />

                <!-- Specialty Ribbon -->
                @if (product.isSpecialty) {
                  <span class="absolute top-3 left-3 bg-[#B87333] text-white label-caps text-[10px] px-3 py-1 rounded-full shadow-md">
                    Şefin Özel
                  </span>
                }
              </div>

              <!-- Content Body -->
              <div class="flex-1 flex flex-col justify-between space-y-4 px-2 pb-2">
                
                <div class="space-y-2">
                  <!-- Tags -->
                  <div class="flex flex-wrap gap-1.5">
                    @for (tag of product.tags; track tag) {
                      <span class="label-caps text-[9px] text-[#526E48] bg-[#CFEFC0]/40 px-2 py-0.5 rounded-full">
                        {{ tag }}
                      </span>
                    }
                  </div>

                  <!-- Name -->
                  <h3 class="font-serif text-xl font-bold text-[#1F1B14] group-hover:text-[#526E48] transition-colors">
                    {{ product.name }}
                  </h3>

                  <!-- Description -->
                  <p class="font-sans text-xs text-[#434840] line-clamp-2 leading-relaxed">
                    {{ product.description }}
                  </p>
                </div>

                <!-- Footer Price & Add to Bag CTA -->
                <div class="pt-3 border-t border-[#D6C9B6]/60 flex items-center justify-between">
                  <div class="flex flex-col">
                    <span class="label-caps text-[9px] text-[#434840]">Fiyat</span>
                    <span class="font-serif text-xl font-bold text-[#3B5532]">{{ product.price }} ₺</span>
                  </div>

                  <button 
                    (click)="cartService.addItem(product)"
                    class="px-5 py-2.5 rounded-full bg-[#526E48] hover:bg-[#3B5532] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 group/btn cursor-pointer">
                    <span>Sepete Ekle</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform group-hover/btn:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

              </div>

            </div>

          }
        </div>

      </div>
    </section>
  `
})
export class MenuShowcaseComponent {
  public readonly productService = inject(ProductService);
  public readonly cartService = inject(CartService);

  public readonly selectedCategory = signal<string>('all');

  public readonly filteredProducts = computed(() => {
    const cat = this.selectedCategory();
    const all = this.productService.products();
    if (cat === 'all') return all;
    return all.filter(p => p.category === cat);
  });

  public onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/croissant.jpg';
  }
}
