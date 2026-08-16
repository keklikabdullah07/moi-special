import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErpFinancialService } from '../../../services/erp-financial.service';
import { ErpInventoryService } from '../../../services/erp-inventory.service';
import { ErpPersonnelService } from '../../../services/erp-personnel.service';
import { ErpCrmService } from '../../../services/erp-crm.service';
import { ErpKanbanService } from '../../../services/erp-kanban.service';

@Component({
  selector: 'app-admin-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="space-y-6 animate-fadeIn">
      
      <!-- Top Title & Welcome Badge -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#D6C9B6] shadow-sm">
        <div>
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#B87333] animate-ping"></span>
            <span class="label-caps text-[10px] text-[#B87333] font-bold">Móí Special Enterprise Dashboard</span>
          </div>
          <h1 class="font-serif text-2xl sm:text-3xl font-bold text-[#1F1B14] mt-1">
            Hoş Geldiniz, Abdullah Keklik 👑
          </h1>
          <p class="text-xs text-[#434840]">Taş fırın, pastane ve kafe işletmenizin canlı dijital durum ve performans metrikleri.</p>
        </div>

        <div class="flex items-center gap-2">
          <a routerLink="/admin/orders" class="px-4 py-2 bg-[#526E48] hover:bg-[#3B5532] text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all">
            📋 Sipariş Panosu →
          </a>
        </div>
      </div>

      <!-- Critical Stock Warning Banner -->
      @if (inventoryService.criticalStockAlerts().length > 0) {
        <div class="p-5 rounded-3xl bg-red-50 border-2 border-red-300 text-red-900 space-y-2">
          <div class="flex items-center gap-2 font-bold text-sm">
            <span class="text-xl">🚨</span>
            <span>KRİTİK STOK UYARISI: {{ inventoryService.criticalStockAlerts().length }} Ürün Asgari Eşik Altında!</span>
          </div>
          <div class="flex flex-wrap gap-2 pt-1">
            @for (alert of inventoryService.criticalStockAlerts(); track alert.id) {
              <span class="px-3 py-1 rounded-full bg-red-200 text-red-900 text-xs font-bold border border-red-300">
                ⚠️ {{ alert.name }}: Kalan {{ alert.stockQuantity }} {{ alert.unit }} (Eşik: {{ alert.minimumThreshold }} {{ alert.unit }})
              </span>
            }
          </div>
        </div>
      }

      <!-- 4 Quick Stats Widgets Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <!-- Stat 1: Total Revenue -->
        <div class="bg-white p-6 rounded-3xl border border-[#D6C9B6] shadow-sm space-y-2 relative overflow-hidden">
          <div class="absolute -top-6 -right-6 w-20 h-20 bg-[#526E48]/10 rounded-full blur-xl"></div>
          <span class="label-caps text-[9px] text-[#3B5532] font-bold">Toplam Ciro (Bugün)</span>
          <div class="font-serif text-3xl font-bold text-[#1F1B14]">
            {{ finService.totalRevenue() | number }} ₺
          </div>
          <span class="text-[10px] text-[#526E48] font-bold block">Nakit: {{ finService.cashRevenue() | number }} ₺ | Kart: {{ finService.cardRevenue() | number }} ₺</span>
        </div>

        <!-- Stat 2: Net Profit -->
        <div class="bg-white p-6 rounded-3xl border border-[#D6C9B6] shadow-sm space-y-2 relative overflow-hidden">
          <div class="absolute -top-6 -right-6 w-20 h-20 bg-[#B87333]/10 rounded-full blur-xl"></div>
          <span class="label-caps text-[9px] text-[#B87333] font-bold">Net Kâr (Tahmini)</span>
          <div class="font-serif text-3xl font-bold text-[#B87333]">
            {{ finService.netProfit() | number }} ₺
          </div>
          <span class="text-[10px] text-[#434840] block">Giderler Düşüldükten Sonra</span>
        </div>

        <!-- Stat 3: Active Orders -->
        <div class="bg-white p-6 rounded-3xl border border-[#D6C9B6] shadow-sm space-y-2 relative overflow-hidden">
          <div class="absolute -top-6 -right-6 w-20 h-20 bg-[#D97706]/10 rounded-full blur-xl"></div>
          <span class="label-caps text-[9px] text-[#D97706] font-bold">Hazırlanan Özel Pastalar</span>
          <div class="font-serif text-3xl font-bold text-[#1F1B14]">
            {{ kanbanService.preparingOrders().length + kanbanService.pendingOrders().length }} Sipariş
          </div>
          <span class="text-[10px] text-[#D97706] font-bold block">Kanban Sürecinde</span>
        </div>

        <!-- Stat 4: Total Employees -->
        <div class="bg-white p-6 rounded-3xl border border-[#D6C9B6] shadow-sm space-y-2 relative overflow-hidden">
          <div class="absolute -top-6 -right-6 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
          <span class="label-caps text-[9px] text-blue-800 font-bold">Personel & Ustalar</span>
          <div class="font-serif text-3xl font-bold text-[#1F1B14]">
            {{ hrService.employees().length }} Personel
          </div>
          <span class="text-[10px] text-blue-700 font-bold block">Aylık Bordro: {{ hrService.totalPayrollCost() | number }} ₺</span>
        </div>

      </div>

      <!-- Quick Action Modules Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Recent Orders Summary Widget -->
        <div class="bg-white p-6 rounded-3xl border border-[#D6C9B6] shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-serif font-bold text-lg text-[#1F1B14]">Bekleyen & Hazırlanan Pastalar</h3>
            <a routerLink="/admin/orders" class="text-xs text-[#B87333] font-bold hover:underline">Tümünü Gör →</a>
          </div>

          <div class="space-y-3">
            @for (ord of kanbanService.orders(); track ord.id) {
              <div class="p-3.5 rounded-2xl bg-[#FFF8F2] border border-[#D6C9B6]/60 flex items-center justify-between text-xs">
                <div>
                  <span class="font-serif font-bold text-[#1F1B14] block">{{ ord.orderNo }} • {{ ord.customerName }}</span>
                  <span class="text-[10px] text-[#434840]">{{ ord.cakeType }}</span>
                </div>
                <span class="px-3 py-1 rounded-full text-[9px] font-bold uppercase"
                      [class.bg-amber-100]="ord.status === 'pending'"
                      [class.text-amber-800]="ord.status === 'pending'"
                      [class.bg-blue-100]="ord.status === 'preparing'"
                      [class.text-blue-800]="ord.status === 'preparing'"
                      [class.bg-emerald-100]="ord.status === 'ready' || ord.status === 'delivered'"
                      [class.text-emerald-800]="ord.status === 'ready' || ord.status === 'delivered'">
                  {{ ord.status }}
                </span>
              </div>
            }
          </div>
        </div>

        <!-- Inventory Low Stock Summary Widget -->
        <div class="bg-white p-6 rounded-3xl border border-[#D6C9B6] shadow-sm space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-serif font-bold text-lg text-[#1F1B14]">Stok ve Ham Madde Durumu</h3>
            <a routerLink="/admin/inventory" class="text-xs text-[#526E48] font-bold hover:underline">Yönet →</a>
          </div>

          <div class="space-y-3">
            @for (item of inventoryService.items(); track item.id) {
              <div class="p-3.5 rounded-2xl bg-[#FFF8F2] border border-[#D6C9B6]/60 flex items-center justify-between text-xs">
                <div>
                  <span class="font-serif font-bold text-[#1F1B14] block">{{ item.name }}</span>
                  <span class="text-[10px] text-[#434840]">Tedarikçi: {{ item.supplier }}</span>
                </div>
                <span class="font-serif font-bold text-sm text-[#3B5532]">
                  {{ item.stockQuantity }} {{ item.unit }}
                </span>
              </div>
            }
          </div>
        </div>

      </div>

    </div>
  `
})
export class AdminDashboardPageComponent {
  public readonly finService = inject(ErpFinancialService);
  public readonly inventoryService = inject(ErpInventoryService);
  public readonly hrService = inject(ErpPersonnelService);
  public readonly crmService = inject(ErpCrmService);
  public readonly kanbanService = inject(ErpKanbanService);
}
