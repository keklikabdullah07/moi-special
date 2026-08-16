import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiteAssetService } from '../../services/site-asset.service';
import { ProductService } from '../../services/product.service';
import { ToastService } from '../../services/toast.service';
import { ImageUploadService } from '../../services/image-upload.service';

@Component({
  selector: 'app-live-section-editor-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (assetService.activeSectionEditing()) {
      <!-- Backdrop Overlay -->
      <div 
        (click)="assetService.closeSectionEditor()"
        class="fixed inset-0 z-50 bg-[#1F1B14]/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
        
        <!-- Modal Card Container -->
        <div 
          (click)="$event.stopPropagation()"
          class="relative w-full max-w-lg bg-[#FFF8F2] border border-[#B87333] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto no-scrollbar">
          
          <!-- Background Ambient Blob -->
          <div class="absolute -top-12 -right-12 w-40 h-40 bg-[#CFEFC0]/40 rounded-full blur-2xl pointer-events-none"></div>

          <!-- Header & Close -->
          <div class="flex items-center justify-between border-b border-[#D6C9B6]/60 pb-4">
            <div class="space-y-0.5">
              <span class="label-caps text-[9px] text-[#B87333] font-bold">
                👑 Abdullah Keklik • Görsel Yüklemeli WebCMS Editörü
              </span>
              <h3 class="font-serif text-2xl font-bold text-[#1F1B14]">
                @if (assetService.activeSectionEditing() === 'header') {
                  Header & Menü Linklerini Düzenle
                } @else if (assetService.activeSectionEditing() === 'menu') {
                  @if (productService.editingProduct()) { Ürünü Canlı Düzenle } @else { Menüye Yeni Ürün Ekle }
                } @else if (assetService.activeSectionEditing() === 'hero') {
                  Hero Banner Alanını Düzenle
                } @else if (assetService.activeSectionEditing() === 'about') {
                  Taş Fırın Hikayemizi Düzenle
                } @else if (assetService.activeSectionEditing() === 'footer') {
                  Footer, Saatler & Adres Düzenle
                }
              </h3>
            </div>
            
            <button 
              (click)="assetService.closeSectionEditor()"
              class="w-9 h-9 rounded-full bg-[#EDE4D8] text-[#1F1B14] hover:bg-[#D6C9B6] flex items-center justify-center transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- SECTION 1: HEADER EDIT FORM -->
          @if (assetService.activeSectionEditing() === 'header') {
            <form (ngSubmit)="saveHeaderSection()" class="space-y-4">
              <div class="space-y-1">
                <label class="label-caps text-[10px] text-[#434840]">Marka/Logo Yazısı</label>
                <input type="text" [(ngModel)]="brandName" name="brandName" class="w-full px-4 py-2.5 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs font-bold text-[#1F1B14]" />
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div class="space-y-1">
                  <label class="label-caps text-[10px] text-[#434840]">Nav 1 Link Adı</label>
                  <input type="text" [(ngModel)]="navHome" name="navHome" class="w-full px-3 py-2 rounded-xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs" />
                </div>
                <div class="space-y-1">
                  <label class="label-caps text-[10px] text-[#434840]">Nav 2 Link Adı</label>
                  <input type="text" [(ngModel)]="navMenu" name="navMenu" class="w-full px-3 py-2 rounded-xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs" />
                </div>
                <div class="space-y-1">
                  <label class="label-caps text-[10px] text-[#434840]">Nav 3 Link Adı</label>
                  <input type="text" [(ngModel)]="navStory" name="navStory" class="w-full px-3 py-2 rounded-xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs" />
                </div>
                <div class="space-y-1">
                  <label class="label-caps text-[10px] text-[#434840]">Nav 4 Link Adı</label>
                  <input type="text" [(ngModel)]="navContact" name="navContact" class="w-full px-3 py-2 rounded-xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs" />
                </div>
              </div>

              <button 
                type="submit"
                class="w-full py-3.5 rounded-full bg-[#B87333] hover:bg-[#784000] text-white text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer">
                Header Değişikliklerini Canlı Kaydet ⚡
              </button>
            </form>
          }

          <!-- SECTION 2: MENU PRODUCT EDIT / ADD FORM WITH FILE UPLOADER -->
          @if (assetService.activeSectionEditing() === 'menu') {
            <form (ngSubmit)="saveProductForm()" class="space-y-4">
              <div class="space-y-1">
                <label class="label-caps text-[10px] text-[#434840]">Ürün Adı</label>
                <input type="text" [(ngModel)]="prodName" name="prodName" required class="w-full px-4 py-2.5 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14]" />
              </div>

              <div class="grid grid-cols-2 gap-2">
                <div class="space-y-1">
                  <label class="label-caps text-[10px] text-[#434840]">Fiyat (₺)</label>
                  <input type="number" [(ngModel)]="prodPrice" name="prodPrice" required class="w-full px-3 py-2 rounded-xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs" />
                </div>
                <div class="space-y-1">
                  <label class="label-caps text-[10px] text-[#434840]">Kategori</label>
                  <select [(ngModel)]="prodCategory" name="prodCategory" class="w-full px-3 py-2 rounded-xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs">
                    <option value="fistikli">Fıstıklı Özel</option>
                    <option value="pastane">Artisan Pastane</option>
                    <option value="firin">Taş Fırın & Ekmek</option>
                    <option value="icecek">Gurme İçecekler</option>
                  </select>
                </div>
              </div>

              <!-- IMAGE FILE UPLOADER WIDGET -->
              <div class="space-y-2 p-3 rounded-2xl bg-[#EDE4D8]/60 border border-[#D6C9B6]">
                <label class="label-caps text-[10px] text-[#B87333] font-bold block">
                  📁 Görsel Yükle (Cihazınızdan Seçin)
                </label>
                
                <div class="flex items-center gap-3">
                  @if (prodImage) {
                    <div class="w-16 h-16 rounded-xl overflow-hidden border border-[#D6C9B6] shrink-0 bg-white shadow-xs">
                      <img [src]="prodImage" alt="Önizleme" class="w-full h-full object-cover" />
                    </div>
                  }
                  <div class="flex-1 space-y-1">
                    <label class="px-4 py-2 rounded-full bg-[#526E48] hover:bg-[#3B5532] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm inline-block cursor-pointer active:scale-95 transition-all">
                      <span>📁 Fotoğraf Seç</span>
                      <input type="file" accept="image/*" (change)="onFileSelected($event, 'product')" class="hidden" />
                    </label>
                    <span class="text-[9px] text-[#434840] block">Format: JPG, PNG, WEBP, AVIF</span>
                  </div>
                </div>

                <div class="pt-1">
                  <span class="label-caps text-[9px] text-[#434840] block mb-1">Veya Hazır Galeriden Seçin:</span>
                  <div class="flex gap-1.5 overflow-x-auto no-scrollbar">
                    @for (preset of imageUploadService.presetGallery; track preset.id) {
                      <button 
                        type="button" 
                        (click)="prodImage = preset.url" 
                        class="px-2.5 py-1 rounded-full bg-white border border-[#D6C9B6] text-[9px] font-medium text-[#1F1B14] hover:bg-[#CFEFC0] transition-colors cursor-pointer whitespace-nowrap">
                        {{ preset.title }}
                      </button>
                    }
                  </div>
                </div>
              </div>

              <div class="space-y-1">
                <label class="label-caps text-[10px] text-[#434840]">Açıklama</label>
                <textarea [(ngModel)]="prodDesc" name="prodDesc" rows="2" class="w-full px-4 py-2.5 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14]"></textarea>
              </div>

              <button 
                type="submit"
                class="w-full py-3.5 rounded-full bg-[#526E48] hover:bg-[#3B5532] text-white text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer">
                Ürün Değişikliğini Menüde Güncelle ⚡
              </button>
            </form>
          }

          <!-- SECTION 3: HERO EDIT FORM WITH FILE UPLOADER -->
          @if (assetService.activeSectionEditing() === 'hero') {
            <form (ngSubmit)="saveHeroSection()" class="space-y-4">
              <div class="space-y-1">
                <label class="label-caps text-[10px] text-[#434840]">Üst Rozet Yazısı (Eyebrow)</label>
                <input type="text" [(ngModel)]="heroEyebrow" name="heroEyebrow" class="w-full px-4 py-2.5 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14]" />
              </div>

              <div class="space-y-1">
                <label class="label-caps text-[10px] text-[#434840]">Ana Manşet Başlığı (Headline)</label>
                <input type="text" [(ngModel)]="heroHeadline" name="heroHeadline" class="w-full px-4 py-2.5 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14]" />
              </div>

              <div class="space-y-1">
                <label class="label-caps text-[10px] text-[#434840]">Alt Açıklama Metni (Subtitle)</label>
                <textarea [(ngModel)]="heroSubtitle" name="heroSubtitle" rows="3" class="w-full px-4 py-2.5 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14]"></textarea>
              </div>

              <!-- HERO IMAGE FILE UPLOADER -->
              <div class="space-y-2 p-3 rounded-2xl bg-[#EDE4D8]/60 border border-[#D6C9B6]">
                <label class="label-caps text-[10px] text-[#B87333] font-bold block">
                  📁 Hero Croissant Görseli Yükle
                </label>
                
                <div class="flex items-center gap-3">
                  @if (heroImg) {
                    <div class="w-16 h-16 rounded-xl overflow-hidden border border-[#D6C9B6] shrink-0 bg-white shadow-xs">
                      <img [src]="heroImg" alt="Önizleme" class="w-full h-full object-cover" />
                    </div>
                  }
                  <div class="flex-1 space-y-1">
                    <label class="px-4 py-2 rounded-full bg-[#526E48] hover:bg-[#3B5532] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm inline-block cursor-pointer active:scale-95 transition-all">
                      <span>📁 Hero Fotoğrafı Seç</span>
                      <input type="file" accept="image/*" (change)="onFileSelected($event, 'hero')" class="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                class="w-full py-3.5 rounded-full bg-[#B87333] hover:bg-[#784000] text-white text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer">
                Değişiklikleri Sitede Canlı Uygula ⚡
              </button>
            </form>
          }

          <!-- SECTION 4: ABOUT EDIT FORM WITH FILE UPLOADER -->
          @if (assetService.activeSectionEditing() === 'about') {
            <form (ngSubmit)="saveAboutSection()" class="space-y-4">
              <div class="space-y-1">
                <label class="label-caps text-[10px] text-[#434840]">Hikaye Başlığı</label>
                <input type="text" [(ngModel)]="aboutTitle" name="aboutTitle" class="w-full px-4 py-2.5 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14]" />
              </div>

              <div class="space-y-1">
                <label class="label-caps text-[10px] text-[#434840]">Hikaye Detay Metni</label>
                <textarea [(ngModel)]="aboutBody" name="aboutBody" rows="4" class="w-full px-4 py-2.5 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14]"></textarea>
              </div>

              <!-- ABOUT IMAGE FILE UPLOADER -->
              <div class="space-y-2 p-3 rounded-2xl bg-[#EDE4D8]/60 border border-[#D6C9B6]">
                <label class="label-caps text-[10px] text-[#B87333] font-bold block">
                  📁 Taş Fırın Görseli Yükle
                </label>
                
                <div class="flex items-center gap-3">
                  @if (aboutImg) {
                    <div class="w-16 h-16 rounded-xl overflow-hidden border border-[#D6C9B6] shrink-0 bg-white shadow-xs">
                      <img [src]="aboutImg" alt="Önizleme" class="w-full h-full object-cover" />
                    </div>
                  }
                  <div class="flex-1 space-y-1">
                    <label class="px-4 py-2 rounded-full bg-[#526E48] hover:bg-[#3B5532] text-white text-[11px] font-bold uppercase tracking-wider shadow-sm inline-block cursor-pointer active:scale-95 transition-all">
                      <span>📁 Fırın Fotoğrafı Seç</span>
                      <input type="file" accept="image/*" (change)="onFileSelected($event, 'about')" class="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                class="w-full py-3.5 rounded-full bg-[#526E48] hover:bg-[#3B5532] text-white text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer">
                Değişiklikleri Sitede Canlı Uygula ⚡
              </button>
            </form>
          }

          <!-- SECTION 5: FOOTER EDIT FORM -->
          @if (assetService.activeSectionEditing() === 'footer' || assetService.activeSectionEditing() === 'contact') {
            <form (ngSubmit)="saveFooterSection()" class="space-y-4">
              <div class="space-y-1">
                <label class="label-caps text-[10px] text-[#434840]">Çalışma Saatleri Metni</label>
                <input type="text" [(ngModel)]="workingHours" name="workingHours" class="w-full px-4 py-2.5 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs font-bold text-[#1F1B14]" />
              </div>

              <div class="space-y-1">
                <label class="label-caps text-[10px] text-[#434840]">Mağaza Açık Adresi</label>
                <input type="text" [(ngModel)]="storeAddress" name="storeAddress" class="w-full px-4 py-2.5 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14]" />
              </div>

              <div class="space-y-1">
                <label class="label-caps text-[10px] text-[#434840]">Telefon Numarası</label>
                <input type="text" [(ngModel)]="storePhone" name="storePhone" class="w-full px-4 py-2.5 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14]" />
              </div>

              <div class="space-y-1">
                <label class="label-caps text-[10px] text-[#434840]">Telif Hakkı (Copyright) Metni</label>
                <input type="text" [(ngModel)]="footerCopyright" name="footerCopyright" class="w-full px-4 py-2.5 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14]" />
              </div>

              <button 
                type="submit"
                class="w-full py-3.5 rounded-full bg-[#526E48] hover:bg-[#3B5532] text-white text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer">
                Footer Değişikliklerini Canlı Kaydet ⚡
              </button>
            </form>
          }

        </div>

      </div>
    }
  `
})
export class LiveSectionEditorModalComponent {
  public readonly assetService = inject(SiteAssetService);
  public readonly productService = inject(ProductService);
  public readonly toastService = inject(ToastService);
  public readonly imageUploadService = inject(ImageUploadService);

  public brandName = '';
  public navHome = '';
  public navMenu = '';
  public navStory = '';
  public navContact = '';

  public heroEyebrow = '';
  public heroHeadline = '';
  public heroSubtitle = '';
  public heroImg = '';

  public aboutTitle = '';
  public aboutBody = '';
  public aboutImg = '';

  public storeAddress = '';
  public storePhone = '';
  public workingHours = '';
  public footerCopyright = '';

  // Menu Product Edit Fields
  public prodName = '';
  public prodPrice = 185;
  public prodCategory: 'fistikli' | 'pastane' | 'firin' | 'icecek' = 'fistikli';
  public prodImage = 'assets/croissant.jpg';
  public prodDesc = '';

  constructor() {
    effect(() => {
      const activeSection = this.assetService.activeSectionEditing();
      if (activeSection === 'menu') {
        const editing = this.productService.editingProduct();
        if (editing) {
          this.prodName = editing.name;
          this.prodPrice = editing.price;
          this.prodCategory = editing.category;
          this.prodImage = editing.imageUrl;
          this.prodDesc = editing.description;
        } else {
          this.prodName = '';
          this.prodPrice = 185;
          this.prodCategory = 'fistikli';
          this.prodImage = 'assets/croissant.jpg';
          this.prodDesc = '';
        }
      } else if (activeSection === 'hero') {
        this.heroEyebrow = this.assetService.heroEyebrow();
        this.heroHeadline = this.assetService.heroHeadline();
        this.heroSubtitle = this.assetService.heroSubtitle();
        this.heroImg = this.assetService.croissantImage();
      } else if (activeSection === 'about') {
        this.aboutTitle = this.assetService.aboutTitle();
        this.aboutBody = this.assetService.aboutBody();
        this.aboutImg = this.assetService.heroBakeryImage();
      } else if (activeSection === 'header') {
        this.brandName = this.assetService.brandName();
        this.navHome = this.assetService.navHome();
        this.navMenu = this.assetService.navMenu();
        this.navStory = this.assetService.navStory();
        this.navContact = this.assetService.navContact();
      } else if (activeSection === 'footer' || activeSection === 'contact') {
        this.storeAddress = this.assetService.storeAddress();
        this.storePhone = this.assetService.storePhone();
        this.workingHours = this.assetService.workingHours();
        this.footerCopyright = this.assetService.footerCopyright();
      }
    });
  }

  public async onFileSelected(event: Event, target: 'product' | 'hero' | 'about'): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      try {
        const base64 = await this.imageUploadService.fileToBase64(file);
        if (target === 'product') this.prodImage = base64;
        if (target === 'hero') this.heroImg = base64;
        if (target === 'about') this.aboutImg = base64;
        this.toastService.show('📁 Fotoğraf Yüklendi ve Canlı Önizlendi! 📸');
      } catch (e) {
        this.toastService.show('Fotoğraf işlenirken hata oluştu.');
      }
    }
  }

  public saveHeaderSection(): void {
    this.assetService.updateHeaderSection(this.brandName, this.navHome, this.navMenu, this.navStory, this.navContact);
    this.toastService.show('Header & Menü Linkleri Canlı Güncellendi! 🎨');
    this.assetService.closeSectionEditor();
  }

  public saveProductForm(): void {
    if (!this.prodName) return;

    const editing = this.productService.editingProduct();
    if (editing) {
      this.productService.updateProduct(editing.id, {
        name: this.prodName,
        price: this.prodPrice,
        category: this.prodCategory,
        imageUrl: this.prodImage,
        description: this.prodDesc
      });
      this.toastService.show(`"${this.prodName}" ürünü güncellendi! 🥖`);
    } else {
      this.productService.addProduct({
        id: 'prod_' + Date.now(),
        name: this.prodName,
        description: this.prodDesc || 'Taze fırın usta lezzeti.',
        price: this.prodPrice,
        category: this.prodCategory,
        imageUrl: this.prodImage || 'assets/croissant.jpg',
        tags: ['Yeni'],
        isSpecialty: true
      });
      this.toastService.show(`"${this.prodName}" menüye eklendi! 🥖`);
    }

    this.productService.editingProduct.set(null);
    this.assetService.closeSectionEditor();
  }

  public saveHeroSection(): void {
    this.assetService.updateHeroSection(this.heroEyebrow, this.heroHeadline, this.heroSubtitle, this.heroImg);
    this.toastService.show('Hero Banner Alanı Canlı Olarak Güncellendi! 🎨');
    this.assetService.closeSectionEditor();
  }

  public saveAboutSection(): void {
    this.assetService.updateAboutSection(this.aboutTitle, this.aboutBody, this.aboutImg);
    this.toastService.show('Taş Fırın Hikayemiz Canlı Olarak Güncellendi! 🎨');
    this.assetService.closeSectionEditor();
  }

  public saveFooterSection(): void {
    this.assetService.updateFooterSection(this.workingHours, this.storeAddress, this.storePhone, this.footerCopyright);
    this.toastService.show('Footer, Saatler & Adres Canlı Güncellendi! 📍');
    this.assetService.closeSectionEditor();
  }
}
