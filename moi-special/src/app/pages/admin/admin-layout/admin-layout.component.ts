import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ErpInventoryService } from '../../../services/erp-inventory.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-[#FFF8F2] flex flex-col md:flex-row font-sans selection:bg-[#526E48] selection:text-white">
      
      <!-- LEFT PROFESSIONAL SIDEBAR -->
      <aside 
        [class.translate-x-0]="isSidebarOpen()"
        [class.-translate-x-full]="!isSidebarOpen()"
        class="fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#1F1B14] text-white border-r border-[#B87333]/40 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 shrink-0 shadow-2xl">
        
        <!-- Sidebar Header / Brand Logo -->
        <div class="p-6 space-y-6">
          <div class="flex items-center justify-between">
            
            <!-- SEAMLESS MOÍ BRAND LOGO IN SIDEBAR -->
            <div class="flex items-center gap-3">
              <img 
                src="assets/moi-header-logo.jpg" 
                alt="MOÍ Special Designer Logo" 
                class="h-10 w-auto object-contain rounded-xl bg-white p-1" />
              
              <div>
                <h2 class="font-serif font-bold text-lg text-[#FFF8F2] tracking-wide">Móí Special</h2>
                <span class="label-caps text-[9px] text-[#B87333] font-bold block">Şanlıurfa Kurumsal ERP</span>
              </div>
            </div>

            <!-- Mobile Close Button -->
            <button (click)="isSidebarOpen.set(false)" class="md:hidden text-gray-400 hover:text-white">✕</button>
          </div>

          <!-- Navigation Links List -->
          <nav class="space-y-1.5 pt-4 border-t border-white/10 text-xs font-bold uppercase tracking-wider">
            
            <!-- Dashboard Link -->
            <a 
              routerLink="/admin" 
              routerLinkActive="bg-[#B87333] text-white shadow-md" 
              [routerLinkActiveOptions]="{exact: true}"
              class="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 text-white/80 hover:text-white transition-all">
              <span class="text-base">📊</span>
              <span>Genel Bakış</span>
            </a>

            <!-- Inventory Link -->
            <a 
              routerLink="/admin/inventory" 
              routerLinkActive="bg-[#B87333] text-white shadow-md"
              class="flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-white/10 text-white/80 hover:text-white transition-all">
              <div class="flex items-center gap-3">
                <span class="text-base">🌾</span>
                <span>Stok & Malzeme</span>
              </div>
              @if (inventoryService.criticalStockAlerts().length > 0) {
                <span class="bg-red-600 text-white text-[9px] px-2 py-0.5 rounded-full font-bold">
                  {{ inventoryService.criticalStockAlerts().length }}
                </span>
              }
            </a>

            <!-- Finance Link -->
            <a 
              routerLink="/admin/finance" 
              routerLinkActive="bg-[#B87333] text-white shadow-md"
              class="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 text-white/80 hover:text-white transition-all">
              <span class="text-base">💰</span>
              <span>Finans & Kasa</span>
            </a>

            <!-- HR Link -->
            <a 
              routerLink="/admin/personnel" 
              routerLinkActive="bg-[#B87333] text-white shadow-md"
              class="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 text-white/80 hover:text-white transition-all">
              <span class="text-base">👨‍🍳</span>
              <span>Personel & Bordro</span>
            </a>

            <!-- Orders Kanban Link -->
            <a 
              routerLink="/admin/orders" 
              routerLinkActive="bg-[#B87333] text-white shadow-md"
              class="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 text-white/80 hover:text-white transition-all">
              <span class="text-base">📋</span>
              <span>Sipariş Kanban</span>
            </a>

            <!-- CRM Link -->
            <a 
              routerLink="/admin/crm" 
              routerLinkActive="bg-[#B87333] text-white shadow-md"
              class="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 text-white/80 hover:text-white transition-all">
              <span class="text-base">👥</span>
              <span>Müşteri CRM</span>
            </a>

          </nav>
        </div>

        <!-- Sidebar Footer / Storefront Return -->
        <div class="p-6 border-t border-white/10 space-y-3">
          <a 
            routerLink="/" 
            class="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all">
            <span>🛍️ Müşteri Vitrinine Dön</span>
          </a>
        </div>
      </aside>

      <!-- MAIN CONTENT AREA -->
      <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        <!-- TOP ADMIN HEADER -->
        <header class="bg-white border-b border-[#D6C9B6] px-6 py-4 flex items-center justify-between shadow-xs">
          
          <div class="flex items-center gap-3">
            <button (click)="isSidebarOpen.set(!isSidebarOpen())" class="md:hidden p-2 rounded-xl bg-[#FFF8F2] border border-[#D6C9B6]">
              🍔
            </button>
            <span class="label-caps text-[10px] text-[#B87333] font-bold hidden sm:inline">
              Móí Special Taş Fırın & Pastane • Kurumsal ERP V2.0
            </span>
          </div>

          <!-- Right Admin Badge & Logout -->
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-full bg-[#B87333] text-white font-bold flex items-center justify-center shadow-sm">
                AK
              </div>
              <div class="hidden sm:block text-left">
                <span class="font-serif font-bold text-[#1F1B14] block text-xs">Abdullah Keklik</span>
                <span class="label-caps text-[9px] text-[#526E48] font-bold">Süper Yönetici</span>
              </div>
            </div>

            <button (click)="logout()" class="px-3.5 py-1.5 rounded-full bg-red-100 text-red-800 hover:bg-red-200 text-xs font-bold uppercase transition-colors cursor-pointer">
              Çıkış Yap 🚪
            </button>
          </div>

        </header>

        <!-- DYNAMIC ROUTED PAGE CONTENT -->
        <main class="flex-1 p-4 sm:p-8 overflow-y-auto">
          <router-outlet></router-outlet>
        </main>
      </div>

    </div>
  `
})
export class AdminLayoutComponent {
  public readonly authService = inject(AuthService);
  public readonly inventoryService = inject(ErpInventoryService);
  public readonly router = inject(Router);
  public readonly toastService = inject(ToastService);

  public readonly isSidebarOpen = signal<boolean>(false);

  public logout(): void {
    this.authService.logout();
    this.toastService.show('Yönetici oturumu kapatıldı.');
    this.router.navigate(['/']);
  }
}
