import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { SiteAssetService } from '../../services/site-asset.service';

@Component({
  selector: 'app-menu-showcase',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="menu" class="py-20 bg-[#FFF8F2] relative border-b border-[#D6C9B6]/40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <!-- Section Header -->
        <div class="text-center space-y-4 max-w-2xl mx-auto">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE4D8] border border-[#D6C9B6] text-[#526E48]">
            <span class="w-2 h-2 rounded-full bg-[#526E48]"></span>
            <span class="label-caps text-[10px] font-semibold text-[#3B5532]">Günlük Taş Fırın Üretimi</span>
          </div>

          <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F1B14]">
            Artisan Lezzet Koleksiyonu
          </h2>

          <p class="font-sans text-sm sm:text-base text-[#434840]">
            Şanlıurfa Taş Fırınımızdan her sabah sıcacık çıkan, %100 saf tereyağı ve zümrüt Antep fıstığı ile üretilen imza ürünlerimiz.
          </p>

          <!-- SUPER ADMIN WEBCMS ADD NEW PRODUCT BUTTON -->
          @if (assetService.isEditMode()) {
            <div class="pt-2">
              <button 
                (click)="openAddProductModal()"
                class="px-6 py-2.5 rounded-full bg-[#B87333] hover:bg-[#784000] text-white text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2 mx-auto active:scale-95 transition-all cursor-pointer">
                <span>+ Menüye Yeni Ürün Ekle</span>
              </button>
            </div>
          }
        </div>

        <!-- Category Filter Tabs -->
        <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button 
            (click)="setCategory('all')"
            [class.bg-[#526E48]]="productService.selectedCategory() === 'all'"
            [class.text-white]="productService.selectedCategory() === 'all'"
            [class.bg-[#EDE4D8]]="productService.selectedCategory() !== 'all'"
            [class.text-[#1F1B14]]="productService.selectedCategory() !== 'all'"
            class="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#D6C9B6] hover:border-[#526E48] transition-all cursor-pointer">
            Tüm Lezzetler
          </button>

          <button 
            (click)="setCategory('fistikli')"
            [class.bg-[#526E48]]="productService.selectedCategory() === 'fistikli'"
            [class.text-white]="productService.selectedCategory() === 'fistikli'"
            [class.bg-[#EDE4D8]]="productService.selectedCategory() !== 'fistikli'"
            [class.text-[#1F1B14]]="productService.selectedCategory() !== 'fistikli'"
            class="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#D6C9B6] hover:border-[#526E48] transition-all cursor-pointer">
            Fıstıklı Özel
          </button>

          <button 
            (click)="setCategory('pastane')"
            [class.bg-[#526E48]]="productService.selectedCategory() === 'pastane'"
            [class.text-white]="productService.selectedCategory() === 'pastane'"
            [class.bg-[#EDE4D8]]="productService.selectedCategory() !== 'pastane'"
            [class.text-[#1F1B14]]="productService.selectedCategory() !== 'pastane'"
            class="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#D6C9B6] hover:border-[#526E48] transition-all cursor-pointer">
            Artisan Pastane
          </button>

          <button 
            (click)="setCategory('firin')"
            [class.bg-[#526E48]]="productService.selectedCategory() === 'firin'"
            [class.text-white]="productService.selectedCategory() === 'firin'"
            [class.bg-[#EDE4D8]]="productService.selectedCategory() !== 'firin'"
            [class.text-[#1F1B14]]="productService.selectedCategory() !== 'firin'"
            class="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#D6C9B6] hover:border-[#526E48] transition-all cursor-pointer">
            Taş Fırın & Ekmek
          </button>

          <button 
            (click)="setCategory('icecek')"
            [class.bg-[#526E48]]="productService.selectedCategory() === 'icecek'"
            [class.text-white]="productService.selectedCategory() === 'icecek'"
            [class.bg-[#EDE4D8]]="productService.selectedCategory() !== 'icecek'"
            [class.text-[#1F1B14]]="productService.selectedCategory() !== 'icecek'"
            class="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#D6C9B6] hover:border-[#526E48] transition-all cursor-pointer">
            Gurme İçecekler
          </button>
        </div>

        <!-- Product Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (prod of productService.filteredProducts(); track prod.id) {
            <div class="group bg-[#FFF8F2] border border-[#D6C9B6] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative">
              
              <!-- SUPER ADMIN INLINE WEBCMS EDIT & DELETE BUTTONS ON CARD -->
              @if (assetService.isEditMode()) {
                <div class="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-auto">
                  <button 
                    (click)="editProduct(prod)"
                    class="px-3 py-1.5 rounded-full bg-[#B87333] hover:bg-[#784000] text-white text-[10px] font-bold uppercase tracking-wider shadow-lg border border-white flex items-center gap-1 cursor-pointer">
                    <span>✏️ Düzenle</span>
                  </button>
                  <button 
                    (click)="deleteProduct(prod)"
                    class="px-3 py-1.5 rounded-full bg-red-800 hover:bg-red-900 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg border border-white flex items-center gap-1 cursor-pointer">
                    <span>🗑️ Sil</span>
                  </button>
                </div>
              }

              <!-- Image Header Container -->
              <div class="relative aspect-[4/3] overflow-hidden bg-[#EDE4D8]">
                <img 
                  [src]="prod.imageUrl" 
                  [alt]="prod.name" 
                  class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  (error)="onImgError($event)" />

                <!-- Category & Specialty Tags -->
                <div class="absolute top-4 right-4 flex flex-col gap-1 items-end">
                  @for (tag of prod.tags; track tag) {
                    <span class="px-3 py-1 rounded-full bg-[#FFF8F2]/90 backdrop-blur-md text-[#526E48] font-bold text-[9px] uppercase tracking-wider shadow-xs">
                      {{ tag }}
                    </span>
                  }
                </div>
              </div>

              <!-- Product Info Body -->
              <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div class="space-y-2">
                  <div class="flex items-start justify-between gap-2">
                    <h3 class="font-serif font-bold text-xl text-[#1F1B14] group-hover:text-[#526E48] transition-colors">
                      {{ prod.name }}
                    </h3>
                    <span class="font-serif font-bold text-lg text-[#526E48] whitespace-nowrap">
                      {{ prod.price }} ₺
                    </span>
                  </div>

                  <p class="font-sans text-xs text-[#434840] leading-relaxed line-clamp-2">
                    {{ prod.description }}
                  </p>
                </div>

                <!-- Add to Cart Action Button -->
                <button 
                  (click)="addToCart(prod)"
                  class="w-full py-3 rounded-full bg-[#EDE4D8] hover:bg-[#526E48] text-[#1F1B14] hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-md cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Sepete Ekle</span>
                </button>
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
  public readonly toastService = inject(ToastService);
  public readonly assetService = inject(SiteAssetService);

  public setCategory(cat: string): void {
    this.productService.selectedCategory.set(cat);
  }

  public addToCart(product: Product): void {
    this.cartService.addItem(product);
    this.toastService.show(`"${product.name}" sepete eklendi! 🛒`);
  }

  public editProduct(product: Product): void {
    this.productService.editingProduct.set(product);
    this.assetService.openSectionEditor('menu');
  }

  public deleteProduct(product: Product): void {
    if (confirm(`"${product.name}" ürününü menüden silmek istediğinize emin misiniz?`)) {
      this.productService.deleteProduct(product.id);
      this.toastService.show(`"${product.name}" menüden silindi.`);
    }
  }

  public openAddProductModal(): void {
    this.productService.editingProduct.set(null);
    this.assetService.openSectionEditor('menu');
  }

  public onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/croissant.jpg';
  }
}
