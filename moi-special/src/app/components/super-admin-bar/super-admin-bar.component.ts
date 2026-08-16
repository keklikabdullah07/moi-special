import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { SiteAssetService } from '../../services/site-asset.service';
import { AdminAnalyticsService } from '../../services/admin-analytics.service';
import { ErpModalService } from '../../services/erp-modal.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-super-admin-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (authService.isSuperAdmin()) {
      <!-- Sticky Top Super Admin Control Bar -->
      <div class="sticky top-0 z-50 bg-[#1F1B14] text-white border-b border-[#B87333]/50 px-4 py-2.5 shadow-2xl animate-fadeIn">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          
          <!-- Left Admin Identity Badge -->
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#B87333] animate-ping"></span>
            <span class="font-serif font-bold text-[#CFEFC0] text-sm">
              👑 Abdullah Keklik • Canlı Site Builder
            </span>
            <span class="hidden sm:inline bg-[#B87333]/30 text-[#B87333] border border-[#B87333]/40 px-2 py-0.5 rounded-full label-caps text-[9px] font-bold">
              Kurucu & Baş Tasarımcı
            </span>
          </div>

          <!-- Center Mode Switcher (👁️ Müşteri Görünümü vs ✏️ Canlı Düzenleme Modu) -->
          <div class="flex items-center p-1 rounded-full bg-white/10 border border-white/20">
            <button 
              (click)="setEditMode(false)"
              [class.bg-[#526E48]]="!assetService.isEditMode()"
              [class.text-white]="!assetService.isEditMode()"
              [class.text-white/70]="assetService.isEditMode()"
              class="px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-[10px] transition-all duration-300 flex items-center gap-1.5 cursor-pointer">
              <span>👁️ Müşteri Görünümü</span>
            </button>

            <button 
              (click)="setEditMode(true)"
              [class.bg-[#B87333]]="assetService.isEditMode()"
              [class.text-white]="assetService.isEditMode()"
              [class.text-white/70]="!assetService.isEditMode()"
              class="px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-[10px] transition-all duration-300 flex items-center gap-1.5 cursor-pointer">
              <span>✏️ Canlı Düzenleme Modu</span>
            </button>
          </div>

          <!-- Right Quick Metrics, ERP Panel & Safety Actions -->
          <div class="flex items-center gap-2 sm:gap-3">
            <!-- ERP DASHBOARD LAUNCHER BUTTON -->
            <button 
              (click)="erpModalService.open()"
              class="px-3.5 py-1.5 rounded-full bg-[#526E48] hover:bg-[#3B5532] text-white font-bold uppercase tracking-wider text-[10px] shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-1">
              <span>💼 Kurumsal ERP Paneli</span>
            </button>

            <!-- Safety Master Template Restore Button -->
            <button 
              (click)="restoreMasterTemplate()"
              title="Yanlış değişikliklerde sitenin orijinal ana şablonuna geri döner"
              class="px-3 py-1.5 rounded-full bg-white/10 hover:bg-red-900/60 text-white/90 hover:text-white border border-white/20 text-[10px] font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center gap-1 cursor-pointer">
              <span>🔄 Fabrika Şablonuna Dön</span>
            </button>

            <button 
              (click)="authService.isProfileModalOpen.set(true)"
              class="px-3.5 py-1.5 rounded-full bg-[#B87333] hover:bg-[#784000] text-white font-bold uppercase tracking-wider text-[10px] shadow-sm active:scale-95 transition-all cursor-pointer">
              Yönetici Paneli →
            </button>
          </div>

        </div>
      </div>
    }
  `
})
export class SuperAdminBarComponent {
  public readonly authService = inject(AuthService);
  public readonly assetService = inject(SiteAssetService);
  public readonly analyticsService = inject(AdminAnalyticsService);
  public readonly erpModalService = inject(ErpModalService);
  public readonly toastService = inject(ToastService);

  public setEditMode(editMode: boolean): void {
    this.assetService.isEditMode.set(editMode);
  }

  public restoreMasterTemplate(): void {
    if (confirm('Sitenin tüm görselleri ve yazıları ilk orijinal fabrika şablonuna sıfırlansın mı?')) {
      this.assetService.resetToMasterTemplate();
      this.toastService.show('🔄 Site Orijinal Ana Fabrika Şablonuna Başarıyla Sıfırlandı!');
    }
  }
}
