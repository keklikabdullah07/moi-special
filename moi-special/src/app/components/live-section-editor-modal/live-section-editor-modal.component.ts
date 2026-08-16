import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiteAssetService } from '../../services/site-asset.service';
import { ToastService } from '../../services/toast.service';

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
                👑 Abdullah Keklik • Modüler Canlı Editör
              </span>
              <h3 class="font-serif text-2xl font-bold text-[#1F1B14]">
                @if (assetService.activeSectionEditing() === 'hero') {
                  Hero Banner Alanını Düzenle
                } @else if (assetService.activeSectionEditing() === 'about') {
                  Taş Fırın Hikayemizi Düzenle
                } @else if (assetService.activeSectionEditing() === 'contact') {
                  Adres & İletişim Düzenle
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

          <!-- SECTION 1: HERO EDIT FORM -->
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

              <div class="space-y-1">
                <label class="label-caps text-[10px] text-[#434840]">Öne Çıkan Croissant Görsel Yolu</label>
                <input type="text" [(ngModel)]="heroImg" name="heroImg" class="w-full px-4 py-2.5 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14]" />
              </div>

              <button 
                type="submit"
                class="w-full py-3.5 rounded-full bg-[#B87333] hover:bg-[#784000] text-white text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer">
                Değişiklikleri Sitede Canlı Uygula ⚡
              </button>
            </form>
          }

          <!-- SECTION 2: ABOUT EDIT FORM -->
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

              <div class="space-y-1">
                <label class="label-caps text-[10px] text-[#434840]">Fırın Fotoğraf Görsel Yolu</label>
                <input type="text" [(ngModel)]="aboutImg" name="aboutImg" class="w-full px-4 py-2.5 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14]" />
              </div>

              <button 
                type="submit"
                class="w-full py-3.5 rounded-full bg-[#526E48] hover:bg-[#3B5532] text-white text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer">
                Değişiklikleri Sitede Canlı Uygula ⚡
              </button>
            </form>
          }

          <!-- SECTION 3: CONTACT EDIT FORM -->
          @if (assetService.activeSectionEditing() === 'contact') {
            <form (ngSubmit)="saveContactSection()" class="space-y-4">
              <div class="space-y-1">
                <label class="label-caps text-[10px] text-[#434840]">Mağaza Açık Adresi</label>
                <input type="text" [(ngModel)]="storeAddress" name="storeAddress" class="w-full px-4 py-2.5 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14]" />
              </div>

              <div class="space-y-1">
                <label class="label-caps text-[10px] text-[#434840]">Telefon Numarası</label>
                <input type="text" [(ngModel)]="storePhone" name="storePhone" class="w-full px-4 py-2.5 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14]" />
              </div>

              <button 
                type="submit"
                class="w-full py-3.5 rounded-full bg-[#526E48] hover:bg-[#3B5532] text-white text-xs font-bold uppercase tracking-wider shadow-lg cursor-pointer">
                Değişiklikleri Sitede Canlı Uygula ⚡
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
  public readonly toastService = inject(ToastService);

  public heroEyebrow = this.assetService.heroEyebrow();
  public heroHeadline = this.assetService.heroHeadline();
  public heroSubtitle = this.assetService.heroSubtitle();
  public heroImg = this.assetService.croissantImage();

  public aboutTitle = this.assetService.aboutTitle();
  public aboutBody = this.assetService.aboutBody();
  public aboutImg = this.assetService.heroBakeryImage();

  public storeAddress = this.assetService.storeAddress();
  public storePhone = this.assetService.storePhone();

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

  public saveContactSection(): void {
    this.assetService.updateContactSection(this.storeAddress, this.storePhone);
    this.toastService.show('Adres & İletişim Bilgileri Canlı Olarak Güncellendi! 📍');
    this.assetService.closeSectionEditor();
  }
}
