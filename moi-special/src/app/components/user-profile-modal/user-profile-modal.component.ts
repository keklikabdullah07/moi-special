import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { StoryService } from '../../services/story.service';
import { ToastService } from '../../services/toast.service';
import { AdminAnalyticsService } from '../../services/admin-analytics.service';
import { SiteAssetService } from '../../services/site-asset.service';

@Component({
  selector: 'app-user-profile-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (authService.isProfileModalOpen() && authService.currentUser()) {
      <!-- Backdrop Overlay -->
      <div 
        (click)="authService.isProfileModalOpen.set(false)"
        class="fixed inset-0 z-50 bg-[#1F1B14]/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
        
        <!-- Modal Card Container -->
        <div 
          (click)="$event.stopPropagation()"
          class="relative w-full max-w-2xl bg-[#FFF8F2] border border-[#D6C9B6] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto no-scrollbar">
          
          <!-- Header & User Badge -->
          <div class="flex items-center justify-between border-b border-[#D6C9B6]/60 pb-4">
            <div class="flex items-center gap-3">
              <div 
                [class.bg-[#B87333]]="authService.isSuperAdmin()"
                [class.bg-[#526E48]]="!authService.isSuperAdmin() && authService.isAdmin()"
                [class.bg-[#434840]]="!authService.isAdmin()"
                class="w-12 h-12 rounded-full text-white font-serif font-bold text-lg flex items-center justify-center shadow-md">
                {{ authService.currentUser()?.name?.[0] }}
              </div>
              <div class="space-y-0.5">
                <span class="label-caps text-[9px] font-bold" 
                  [class.text-[#B87333]]="authService.isSuperAdmin()" 
                  [class.text-[#526E48]]="!authService.isSuperAdmin() && authService.isAdmin()"
                  [class.text-[#434840]]="!authService.isAdmin()">
                  @if (authService.isSuperAdmin()) {
                    👑 Süper Yönetici & Kurucu Tasarımcı
                  } @else if (authService.isContentAdmin()) {
                    📸 Ürün & Hikaye Yöneticisi
                  } @else {
                    👤 Doğrulanmış Müşteri Hesabı
                  }
                </span>
                <h3 class="font-serif text-xl font-bold text-[#1F1B14]">
                  {{ authService.currentUser()?.name }}
                </h3>
              </div>
            </div>

            <button 
              (click)="authService.isProfileModalOpen.set(false)"
              class="w-9 h-9 rounded-full bg-[#EDE4D8] text-[#1F1B14] hover:bg-[#D6C9B6] flex items-center justify-center transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- SUPER ADMIN EXCLUSIVE DASHBOARD (Abdullah Keklik) -->
          @if (authService.isSuperAdmin()) {
            <!-- Admin Navigation Tabs -->
            <div class="flex p-1 rounded-full bg-[#EDE4D8] border border-[#D6C9B6] text-[11px] font-bold uppercase tracking-wider overflow-x-auto no-scrollbar">
              <button 
                (click)="adminTab.set('analytics')"
                [class.bg-[#B87333]]="adminTab() === 'analytics'"
                [class.text-white]="adminTab() === 'analytics'"
                [class.text-[#1F1B14]]="adminTab() !== 'analytics'"
                class="flex-1 py-2 px-3 rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer">
                📈 Ciro & Satış Raporu
              </button>
              <button 
                (click)="adminTab.set('assets')"
                [class.bg-[#B87333]]="adminTab() === 'assets'"
                [class.text-white]="adminTab() === 'assets'"
                [class.text-[#1F1B14]]="adminTab() !== 'assets'"
                class="flex-1 py-2 px-3 rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer">
                🎨 Görseller & Tasarım
              </button>
              <button 
                (click)="adminTab.set('products')"
                [class.bg-[#B87333]]="adminTab() === 'products'"
                [class.text-white]="adminTab() === 'products'"
                [class.text-[#1F1B14]]="adminTab() !== 'products'"
                class="flex-1 py-2 px-3 rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer">
                📦 Stok & Ürünler
              </button>
            </div>

            <!-- TAB 1: SALES & ANALYTICS -->
            @if (adminTab() === 'analytics') {
              <div class="space-y-4 animate-fadeIn">
                <!-- 4 Core Metrics Cards -->
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div class="p-3.5 rounded-2xl bg-[#B87333]/15 border border-[#B87333]/30 space-y-1">
                    <span class="label-caps text-[8px] text-[#B87333] font-bold">Toplam Ciro</span>
                    <span class="font-serif text-lg font-bold text-[#1F1B14] block">
                      {{ analyticsService.totalTurnover() | number }} ₺
                    </span>
                  </div>

                  <div class="p-3.5 rounded-2xl bg-[#526E48]/15 border border-[#526E48]/30 space-y-1">
                    <span class="label-caps text-[8px] text-[#526E48] font-bold">Toplam Sipariş</span>
                    <span class="font-serif text-lg font-bold text-[#1F1B14] block">
                      {{ analyticsService.totalOrdersCount() }} Adet
                    </span>
                  </div>

                  <div class="p-3.5 rounded-2xl bg-[#EDE4D8] border border-[#D6C9B6] space-y-1">
                    <span class="label-caps text-[8px] text-[#434840] font-bold">Satılan Ürün</span>
                    <span class="font-serif text-lg font-bold text-[#1F1B14] block">
                      {{ analyticsService.totalProductsSold() }} Adet
                    </span>
                  </div>

                  <div class="p-3.5 rounded-2xl bg-[#526E48]/10 border border-[#526E48]/20 space-y-1">
                    <span class="label-caps text-[8px] text-[#3B5532] font-bold">Rezerve Masa</span>
                    <span class="font-serif text-lg font-bold text-[#1F1B14] block">
                      {{ analyticsService.activeReservationsCount() }} Masa
                    </span>
                  </div>
                </div>

                <!-- Top Selling Products Analytics Table -->
                <div class="p-4 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="label-caps text-[9px] text-[#B87333] font-bold">En Çok Satan İmzalı Lezzetler</span>
                    <span class="text-[10px] text-[#434840]">Canlı Veri</span>
                  </div>

                  <div class="space-y-2">
                    @for (item of analyticsService.topProducts(); track item.name) {
                      <div class="p-2.5 rounded-xl bg-white border border-[#D6C9B6]/60 flex items-center justify-between text-xs">
                        <div class="space-y-0.5">
                          <span class="font-serif font-bold text-[#1F1B14] block">{{ item.name }}</span>
                          <span class="label-caps text-[9px] text-[#526E48]">{{ item.category }} • {{ item.unitsSold }} Adet Satıldı</span>
                        </div>
                        <span class="font-serif font-bold text-[#B87333]">{{ item.revenue | number }} ₺</span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            }

            <!-- TAB 2: SITE ASSET & DESIGN MANAGER -->
            @if (adminTab() === 'assets') {
              <div class="space-y-4 animate-fadeIn">
                <div class="p-4 rounded-2xl bg-[#B87333]/10 border border-[#B87333]/30 space-y-2">
                  <span class="label-caps text-[9px] text-[#B87333] font-bold">Sitede Canlı Duran Statik Görselleri Değiştirin</span>
                  <p class="text-xs text-[#434840]">
                    Sitenizin Hero arka planını, croissant ve entremet fotoğraflarını canlı olarak güncelleyebilirsiniz.
                  </p>
                </div>

                <div class="space-y-3">
                  <div class="space-y-1">
                    <label class="label-caps text-[9px] text-[#434840]">Hero Fırın Arka Plan Görseli (URL veya Dosya)</label>
                    <div class="flex gap-2">
                      <input type="text" [(ngModel)]="newHeroImg" placeholder="assets/hero-bakery.jpg" class="flex-1 px-3 py-2 rounded-xl bg-white border border-[#D6C9B6] text-xs" />
                      <button (click)="saveHeroImg()" class="px-4 py-2 rounded-xl bg-[#526E48] text-white text-xs font-bold uppercase cursor-pointer">Güncelle</button>
                    </div>
                  </div>

                  <div class="space-y-1">
                    <label class="label-caps text-[9px] text-[#434840]">Antep Fıstıklı Croissant Görseli</label>
                    <div class="flex gap-2">
                      <input type="text" [(ngModel)]="newCroissantImg" placeholder="assets/croissant.jpg" class="flex-1 px-3 py-2 rounded-xl bg-white border border-[#D6C9B6] text-xs" />
                      <button (click)="saveCroissantImg()" class="px-4 py-2 rounded-xl bg-[#526E48] text-white text-xs font-bold uppercase cursor-pointer">Güncelle</button>
                    </div>
                  </div>

                  <div class="space-y-1">
                    <label class="label-caps text-[9px] text-[#434840]">Canlı Mağaza Açık Adresi</label>
                    <div class="flex gap-2">
                      <input type="text" [(ngModel)]="newStoreAddr" placeholder="Karşıyaka Mah. Gap Vadisi Bulvarı, Kanalboyu, 63000 Haliliye/Şanlıurfa" class="flex-1 px-3 py-2 rounded-xl bg-white border border-[#D6C9B6] text-xs" />
                      <button (click)="saveStoreAddr()" class="px-4 py-2 rounded-xl bg-[#526E48] text-white text-xs font-bold uppercase cursor-pointer">Kaydet</button>
                    </div>
                  </div>
                </div>
              </div>
            }

            <!-- TAB 3: STOCK & PRODUCT MANAGEMENT -->
            @if (adminTab() === 'products') {
              <div class="space-y-4 animate-fadeIn">
                <div class="flex items-center justify-between">
                  <span class="label-caps text-[9px] text-[#526E48] font-bold">Menü & Stok Yönetimi</span>
                  <button 
                    (click)="showAddProductForm.set(!showAddProductForm())"
                    class="px-3.5 py-1.5 rounded-full bg-[#B87333] text-white text-xs font-bold uppercase tracking-wider cursor-pointer">
                    + Yeni Ürün Ekle
                  </button>
                </div>

                <!-- Add Product Form -->
                @if (showAddProductForm()) {
                  <div class="p-4 rounded-2xl bg-[#EDE4D8] border border-[#D6C9B6] space-y-3 animate-fadeIn">
                    <h5 class="font-serif font-bold text-sm text-[#1F1B14]">Yeni Ürün Oluştur</h5>

                    <div class="space-y-1">
                      <label class="label-caps text-[9px] text-[#434840]">Ürün Adı</label>
                      <input type="text" [(ngModel)]="newProdName" placeholder="Örn: Antepli Çikolatalı Croissant" class="w-full px-3 py-2 rounded-xl bg-white border border-[#D6C9B6] text-xs" />
                    </div>

                    <div class="grid grid-cols-2 gap-2">
                      <div class="space-y-1">
                        <label class="label-caps text-[9px] text-[#434840]">Fiyat (₺)</label>
                        <input type="number" [(ngModel)]="newProdPrice" placeholder="195" class="w-full px-3 py-2 rounded-xl bg-white border border-[#D6C9B6] text-xs" />
                      </div>
                      <div class="space-y-1">
                        <label class="label-caps text-[9px] text-[#434840]">Kategori</label>
                        <select [(ngModel)]="newProdCategory" class="w-full px-3 py-2 rounded-xl bg-white border border-[#D6C9B6] text-xs">
                          <option value="fistikli">Fıstıklı Özel</option>
                          <option value="pastane">Artisan Pastane</option>
                          <option value="firin">Taş Fırın & Ekmek</option>
                          <option value="icecek">Gurme İçecekler</option>
                        </select>
                      </div>
                    </div>

                    <div class="space-y-1">
                      <label class="label-caps text-[9px] text-[#434840]">Açıklama</label>
                      <textarea [(ngModel)]="newProdDesc" rows="2" placeholder="Ürün içeriği ve lezzet detayları..." class="w-full px-3 py-2 rounded-xl bg-white border border-[#D6C9B6] text-xs"></textarea>
                    </div>

                    <button 
                      (click)="submitAddProduct()"
                      class="w-full py-2.5 rounded-full bg-[#526E48] text-white text-xs font-bold uppercase shadow-md cursor-pointer">
                      Ürünü Menüye Kaydet
                    </button>
                  </div>
                }

                <!-- Existing Products List with Stock Badges -->
                <div class="space-y-2 max-h-56 overflow-y-auto no-scrollbar">
                  @for (prod of productService.products(); track prod.id) {
                    <div class="p-3 rounded-xl bg-white border border-[#D6C9B6] flex items-center justify-between text-xs">
                      <div class="space-y-0.5">
                        <span class="font-serif font-bold text-[#1F1B14] block">{{ prod.name }}</span>
                        <span class="label-caps text-[9px] text-[#526E48]">{{ prod.price }} ₺</span>
                      </div>
                      <span class="px-2.5 py-1 rounded-full bg-[#CFEFC0] text-[#3B5532] label-caps text-[8px] font-bold">Stokta Var</span>
                    </div>
                  }
                </div>
              </div>
            }

          } @else if (authService.isContentAdmin()) {
            <!-- CONTENT ADMIN DASHBOARD -->
            <div class="space-y-4">
              <div class="p-4 rounded-2xl bg-[#526E48]/10 border border-[#526E48]/30 space-y-2">
                <span class="label-caps text-[9px] text-[#526E48] font-bold">İçerik Yöneticisi Paneli</span>
                <h4 class="font-serif font-bold text-base text-[#1F1B14]">Menü & Hikaye Paylaşım Paneli</h4>
                <p class="text-xs text-[#434840]">
                  Günlük taze Instagram hikayeleri yayınlayabilir veya menü içeriklerini güncelleyebilirsiniz.
                </p>

                <button 
                  (click)="authService.isProfileModalOpen.set(false); storyService.isAdminAddOpen.set(true)"
                  class="mt-2 w-full py-2.5 rounded-full bg-[#526E48] text-white text-xs font-bold uppercase tracking-wider shadow-sm cursor-pointer">
                  📸 Günlük Hikaye Paylaş
                </button>
              </div>
            </div>
          } @else {
            <!-- REGULAR CUSTOMER PANEL -->
            <div class="space-y-4">
              <div class="p-4 rounded-2xl bg-[#EDE4D8]/60 border border-[#D6C9B6] space-y-2">
                <span class="label-caps text-[9px] text-[#526E48] font-bold">Kayıtlı Müşteri Profiliniz</span>
                <div class="text-xs text-[#1F1B14] space-y-1 font-sans">
                  <p><strong>E-Posta:</strong> {{ authService.currentUser()?.email }}</p>
                  <p><strong>Telefon (SMS Onaylı):</strong> {{ authService.currentUser()?.phone }} ✅</p>
                  <p><strong>Teslimat Adresi:</strong> {{ authService.currentUser()?.address }}</p>
                </div>
              </div>

              <!-- Customer Order & Reservation Status -->
              <div class="space-y-2">
                <span class="label-caps text-[9px] text-[#B87333] font-bold">Aktif Masa Rezervasyon Durumu</span>
                
                <div class="p-3 rounded-xl bg-[#FFF8F2] border border-[#D6C9B6] text-xs flex items-center justify-between">
                  <div>
                    <span class="font-serif font-bold text-[#1F1B14] block">Masa Rezervasyonu #1042</span>
                    <span class="text-[10px] text-[#526E48]">Kanalboyu Gap Vadisi Bulvarı Şubesi</span>
                  </div>
                  <span class="px-2.5 py-1 rounded-full bg-[#CFEFC0] text-[#3B5532] label-caps text-[8px] font-bold">Onaylandı</span>
                </div>
              </div>
            </div>
          }

          <!-- Logout Button -->
          <div class="pt-4 border-t border-[#D6C9B6]/60">
            <button 
              (click)="authService.logout()"
              class="w-full py-3 rounded-full bg-[#EDE4D8] hover:bg-red-100 hover:text-red-700 text-[#1F1B14] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer">
              Oturumu Kapat
            </button>
          </div>

        </div>

      </div>
    }
  `
})
export class UserProfileModalComponent {
  public readonly authService = inject(AuthService);
  public readonly productService = inject(ProductService);
  public readonly storyService = inject(StoryService);
  public readonly toastService = inject(ToastService);
  public readonly analyticsService = inject(AdminAnalyticsService);
  public readonly assetService = inject(SiteAssetService);

  public readonly adminTab = signal<'analytics' | 'assets' | 'products'>('analytics');
  public readonly showAddProductForm = signal<boolean>(false);

  public newProdName = '';
  public newProdPrice = 185;
  public newProdCategory = 'fistikli';
  public newProdDesc = '';

  public newHeroImg = 'assets/hero-bakery.jpg';
  public newCroissantImg = 'assets/croissant.jpg';
  public newStoreAddr = 'Karşıyaka Mah. Gap Vadisi Bulvarı, Kanalboyu, 63000 Haliliye/Şanlıurfa';

  public saveHeroImg(): void {
    if (this.newHeroImg) {
      this.assetService.updateHeroImage(this.newHeroImg);
      this.toastService.show('Hero Arka Plan Görseli Canlı Güncellendi! 🎨');
    }
  }

  public saveCroissantImg(): void {
    if (this.newCroissantImg) {
      this.assetService.updateCroissantImage(this.newCroissantImg);
      this.toastService.show('Croissant Görseli Canlı Güncellendi! 🎨');
    }
  }

  public saveStoreAddr(): void {
    if (this.newStoreAddr) {
      this.assetService.updateStoreAddress(this.newStoreAddr);
      this.toastService.show('Canlı Mağaza Adresi Güncellendi! 📍');
    }
  }

  public submitAddProduct(): void {
    if (!this.newProdName) return;

    this.productService.addProduct({
      id: 'custom_' + Date.now(),
      name: this.newProdName,
      description: this.newProdDesc || 'Taze fırın usta lezzeti.',
      price: this.newProdPrice,
      category: this.newProdCategory as any,
      imageUrl: 'assets/croissant.jpg',
      tags: ['Yeni', 'Şefin Özel'],
      isSpecialty: true
    });

    this.toastService.show(`"${this.newProdName}" menüye başarıyla eklendi! 🥖`);
    this.showAddProductForm.set(false);
    this.newProdName = '';
    this.newProdDesc = '';
  }
}
