import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { StoryService } from '../../services/story.service';
import { ToastService } from '../../services/toast.service';

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
          class="relative w-full max-w-lg bg-[#FFF8F2] border border-[#D6C9B6] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto no-scrollbar">
          
          <!-- Header & Close -->
          <div class="flex items-center justify-between border-b border-[#D6C9B6]/60 pb-4">
            <div class="flex items-center gap-3">
              <div 
                [class.bg-[#526E48]]="!authService.isAdmin()"
                [class.bg-[#B87333]]="authService.isAdmin()"
                class="w-12 h-12 rounded-full text-white font-serif font-bold text-lg flex items-center justify-center shadow-md">
                {{ authService.currentUser()?.name?.[0] }}
              </div>
              <div class="space-y-0.5">
                <span class="label-caps text-[9px]" [class.text-[#526E48]]="!authService.isAdmin()" [class.text-[#B87333]]="authService.isAdmin()">
                  {{ authService.isAdmin() ? '👑 İşletme Yönetimi' : '👤 Müşteri Hesabı' }}
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

          <!-- ADMIN DASHBOARD PANEL (If Admin) -->
          @if (authService.isAdmin()) {
            <div class="space-y-5">
              <div class="p-4 rounded-2xl bg-[#B87333]/10 border border-[#B87333]/30 space-y-2">
                <span class="label-caps text-[9px] text-[#B87333] font-bold">Yönetici Yetki Alanı</span>
                <h4 class="font-serif font-bold text-base text-[#1F1B14]">Móí Special Mağaza Paneli</h4>
                <p class="text-xs text-[#434840]">
                  Yeni ürün ekleyin, fiyat güncelleyin veya günlük Instagram hikayeleri yayınlayın.
                </p>

                <div class="grid grid-cols-2 gap-2 pt-2">
                  <button 
                    (click)="showAddProductForm.set(!showAddProductForm())"
                    class="py-2.5 px-3 rounded-full bg-[#B87333] text-white text-xs font-bold uppercase tracking-wider shadow-sm active:scale-95 transition-transform flex items-center justify-center gap-1.5 cursor-pointer">
                    <span>+ Ürün Ekle</span>
                  </button>

                  <button 
                    (click)="authService.isProfileModalOpen.set(false); storyService.isAdminAddOpen.set(true)"
                    class="py-2.5 px-3 rounded-full bg-[#526E48] text-white text-xs font-bold uppercase tracking-wider shadow-sm active:scale-95 transition-transform flex items-center justify-center gap-1.5 cursor-pointer">
                    <span>📸 Hikaye Paylaş</span>
                  </button>
                </div>
              </div>

              <!-- Inline New Product Form for Admin -->
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
                        <option value="croissant">Fıstıklı Özel</option>
                        <option value="pastry">Artisan Pastane</option>
                        <option value="bread">Taş Fırın & Ekmek</option>
                        <option value="beverages">Gurme İçecekler</option>
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
            </div>
          } @else {
            <!-- CUSTOMER USER PANEL -->
            <div class="space-y-4">
              <div class="p-4 rounded-2xl bg-[#EDE4D8]/60 border border-[#D6C9B6] space-y-2">
                <span class="label-caps text-[9px] text-[#526E48] font-bold">Kayıtlı Bilgiler</span>
                <div class="text-xs text-[#1F1B14] space-y-1 font-sans">
                  <p><strong>E-Posta:</strong> {{ authService.currentUser()?.email }}</p>
                  <p><strong>Telefon:</strong> {{ authService.currentUser()?.phone }}</p>
                  <p><strong>Teslimat Adresi:</strong> {{ authService.currentUser()?.address }}</p>
                </div>
              </div>

              <!-- Customer Order & Reservation Tabs -->
              <div class="space-y-2">
                <span class="label-caps text-[9px] text-[#B87333] font-bold">Aktif Rezervasyon & Sipariş Durumu</span>
                
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

  public readonly showAddProductForm = signal<boolean>(false);

  public newProdName = '';
  public newProdPrice = 185;
  public newProdCategory = 'croissant';
  public newProdDesc = '';

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
