import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ErpFinancialService } from '../../services/erp-financial.service';
import { ErpInventoryService } from '../../services/erp-inventory.service';
import { ErpPersonnelService } from '../../services/erp-personnel.service';
import { ErpCrmService } from '../../services/erp-crm.service';
import { ErpKanbanService, CustomOrderStatus } from '../../services/erp-kanban.service';
import { ErpModalService } from '../../services/erp-modal.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-erp-dashboard-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (erpModalService.isErpOpen()) {
      <!-- Backdrop Overlay -->
      <div 
        (click)="erpModalService.close()"
        class="fixed inset-0 z-50 bg-[#1F1B14]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
        
        <!-- Modal Card Container -->
        <div 
          (click)="$event.stopPropagation()"
          class="relative w-full max-w-6xl bg-[#FFF8F2] border border-[#B87333] rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto no-scrollbar">
          
          <!-- Header & Identity Badge -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#D6C9B6] pb-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-[#B87333] animate-ping"></span>
                <span class="label-caps text-[10px] text-[#B87333] font-bold">
                  💼 Móí Special Kurumsal ERP & Dijital Yönetim Sistemi
                </span>
              </div>
              <h2 class="font-serif text-2xl sm:text-3xl font-bold text-[#1F1B14]">
                İşletme Yönetim Paneli
              </h2>
            </div>

            <div class="flex items-center gap-3">
              <div class="px-3.5 py-1.5 rounded-full bg-[#526E48]/15 border border-[#526E48]/30 text-xs font-bold text-[#3B5532]">
                Sayın Abdullah Keklik (Süper Yönetici)
              </div>
              <button 
                (click)="erpModalService.close()"
                class="w-9 h-9 rounded-full bg-[#EDE4D8] text-[#1F1B14] hover:bg-[#D6C9B6] flex items-center justify-center transition-colors cursor-pointer">
                ✕
              </button>
            </div>
          </div>

          <!-- Module Navigation Tabs -->
          <div class="flex p-1 rounded-2xl bg-[#EDE4D8] border border-[#D6C9B6] overflow-x-auto no-scrollbar text-xs font-bold uppercase tracking-wider">
            <button 
              (click)="activeTab.set('financial')"
              [class.bg-[#B87333]]="activeTab() === 'financial'"
              [class.text-white]="activeTab() === 'financial'"
              [class.text-[#1F1B14]]="activeTab() !== 'financial'"
              class="flex-1 py-3 px-4 rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer">
              💰 Finans & Kasa
            </button>

            <button 
              (click)="activeTab.set('inventory')"
              [class.bg-[#B87333]]="activeTab() === 'inventory'"
              [class.text-white]="activeTab() === 'inventory'"
              [class.text-[#1F1B14]]="activeTab() !== 'inventory'"
              class="flex-1 py-3 px-4 rounded-xl transition-all duration-300 whitespace-nowrap relative cursor-pointer">
              <span>🌾 Stok & Kritik Uyarısı</span>
              @if (inventoryService.criticalStockAlerts().length > 0) {
                <span class="ml-1 bg-red-600 text-white rounded-full px-1.5 py-0.5 text-[9px] font-bold">
                  {{ inventoryService.criticalStockAlerts().length }}
                </span>
              }
            </button>

            <button 
              (click)="activeTab.set('personnel')"
              [class.bg-[#B87333]]="activeTab() === 'personnel'"
              [class.text-white]="activeTab() === 'personnel'"
              [class.text-[#1F1B14]]="activeTab() !== 'personnel'"
              class="flex-1 py-3 px-4 rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer">
              👨‍🍳 Personel & Maaş
            </button>

            <button 
              (click)="activeTab.set('crm')"
              [class.bg-[#B87333]]="activeTab() === 'crm'"
              [class.text-white]="activeTab() === 'crm'"
              [class.text-[#1F1B14]]="activeTab() !== 'crm'"
              class="flex-1 py-3 px-4 rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer">
              👥 Müşteri CRM
            </button>

            <button 
              (click)="activeTab.set('kanban')"
              [class.bg-[#B87333]]="activeTab() === 'kanban'"
              [class.text-white]="activeTab() === 'kanban'"
              [class.text-[#1F1B14]]="activeTab() !== 'kanban'"
              class="flex-1 py-3 px-4 rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer">
              📋 Özel Sipariş Kanban
            </button>
          </div>

          <!-- TAB 1: FINANCIALS & CASH REGISTER -->
          @if (activeTab() === 'financial') {
            <div class="space-y-6 animate-fadeIn">
              <!-- Top Revenue Summary Cards -->
              <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div class="p-4 rounded-2xl bg-[#526E48]/15 border border-[#526E48]/30 space-y-1">
                  <span class="label-caps text-[9px] text-[#3B5532] font-bold">Nakit Kasa Girişi</span>
                  <span class="font-serif text-2xl font-bold text-[#1F1B14] block">
                    {{ finService.cashRevenue() | number }} ₺
                  </span>
                </div>

                <div class="p-4 rounded-2xl bg-[#526E48]/15 border border-[#526E48]/30 space-y-1">
                  <span class="label-caps text-[9px] text-[#3B5532] font-bold">Kredi Kartı Tahsilat</span>
                  <span class="font-serif text-2xl font-bold text-[#1F1B14] block">
                    {{ finService.cardRevenue() | number }} ₺
                  </span>
                </div>

                <div class="p-4 rounded-2xl bg-[#526E48]/15 border border-[#526E48]/30 space-y-1">
                  <span class="label-caps text-[9px] text-[#3B5532] font-bold">Online Sipariş Geliri</span>
                  <span class="font-serif text-2xl font-bold text-[#1F1B14] block">
                    {{ finService.onlineRevenue() | number }} ₺
                  </span>
                </div>

                <div class="p-4 rounded-2xl bg-[#B87333]/20 border border-[#B87333]/40 space-y-1">
                  <span class="label-caps text-[9px] text-[#B87333] font-bold">Net İşletme Kârı</span>
                  <span class="font-serif text-2xl font-bold text-[#B87333] block">
                    {{ finService.netProfit() | number }} ₺
                  </span>
                </div>
              </div>

              <!-- Expense List Table -->
              <div class="p-5 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] space-y-4">
                <div class="flex items-center justify-between">
                  <h4 class="font-serif font-bold text-base text-[#1F1B14]">Gider ve Ham Madde Harcama Kayıtları</h4>
                  <button (click)="showAddExpenseForm.set(!showAddExpenseForm())" class="px-3.5 py-1.5 rounded-full bg-[#B87333] text-white text-xs font-bold uppercase cursor-pointer">
                    + Gider Kaydı Ekle
                  </button>
                </div>

                @if (showAddExpenseForm()) {
                  <div class="p-4 rounded-xl bg-white border border-[#D6C9B6] grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fadeIn">
                    <input type="text" [(ngModel)]="newExpTitle" placeholder="Harcama Başlığı (Örn. Un Alımı)" class="px-3 py-2 rounded-lg border text-xs" />
                    <input type="number" [(ngModel)]="newExpAmount" placeholder="Tutar (₺)" class="px-3 py-2 rounded-lg border text-xs" />
                    <button (click)="submitExpense()" class="py-2 bg-[#526E48] text-white rounded-lg text-xs font-bold uppercase">Kaydet</button>
                  </div>
                }

                <div class="space-y-2 max-h-52 overflow-y-auto no-scrollbar">
                  @for (exp of finService.expenses(); track exp.id) {
                    <div class="p-3 rounded-xl bg-white border border-[#D6C9B6] flex items-center justify-between text-xs">
                      <div>
                        <span class="font-serif font-bold text-[#1F1B14] block">{{ exp.title }}</span>
                        <span class="label-caps text-[9px] text-[#434840]">{{ exp.category }} • {{ exp.date }}</span>
                      </div>
                      <span class="font-serif font-bold text-red-700">- {{ exp.amount | number }} ₺</span>
                    </div>
                  }
                </div>
              </div>
            </div>
          }

          <!-- TAB 2: SMART INVENTORY & CRITICAL STOCK ALERTS -->
          @if (activeTab() === 'inventory') {
            <div class="space-y-6 animate-fadeIn">
              
              <!-- CRITICAL STOCK ALERT BANNER -->
              @if (inventoryService.criticalStockAlerts().length > 0) {
                <div class="p-4 rounded-2xl bg-red-100 border-2 border-red-400 text-red-900 space-y-2 animate-bounce">
                  <div class="flex items-center gap-2 font-bold text-sm">
                    <span class="text-xl">🚨</span>
                    <span>KRİTİK STOK UYARISI: Aşağıdaki ürünler asgari eşik sınırının altındadır!</span>
                  </div>
                  <div class="flex flex-wrap gap-2 pt-1">
                    @for (alert of inventoryService.criticalStockAlerts(); track alert.id) {
                      <span class="px-3 py-1 rounded-full bg-red-200 text-red-900 text-xs font-bold border border-red-400">
                        ⚠️ {{ alert.name }}: Kalan {{ alert.stockQuantity }} {{ alert.unit }} (Eşik: {{ alert.minimumThreshold }} {{ alert.unit }})
                      </span>
                    }
                  </div>
                </div>
              }

              <!-- Inventory Table -->
              <div class="p-5 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] space-y-4">
                <div class="flex items-center justify-between">
                  <h4 class="font-serif font-bold text-base text-[#1F1B14]">Fırın & Pastane Ham Madde Stok Listesi</h4>
                  <span class="text-xs text-[#526E48] font-bold">Canlı Takip</span>
                </div>

                <div class="space-y-2 max-h-72 overflow-y-auto no-scrollbar">
                  @for (item of inventoryService.items(); track item.id) {
                    <div class="p-3.5 rounded-xl bg-white border border-[#D6C9B6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div class="space-y-0.5">
                        <div class="flex items-center gap-2">
                          <span class="font-serif font-bold text-[#1F1B14] text-sm">{{ item.name }}</span>
                          @if (item.stockQuantity <= item.minimumThreshold) {
                            <span class="px-2 py-0.5 bg-red-600 text-white label-caps text-[8px] font-bold rounded-full">Sipariş Verilmeli!</span>
                          }
                        </div>
                        <span class="label-caps text-[9px] text-[#434840]">Tedarikçi: {{ item.supplier }} • Birim Fiyat: {{ item.unitPrice }} ₺</span>
                      </div>

                      <div class="flex items-center gap-3">
                        <span class="font-serif font-bold text-sm text-[#3B5532]">
                          {{ item.stockQuantity }} {{ item.unit }}
                        </span>
                        
                        <div class="flex items-center gap-1">
                          <button (click)="inventoryService.updateStockQuantity(item.id, -5)" class="w-7 h-7 rounded-lg bg-[#EDE4D8] hover:bg-red-200 text-xs font-bold cursor-pointer">-5</button>
                          <button (click)="inventoryService.updateStockQuantity(item.id, 10)" class="w-7 h-7 rounded-lg bg-[#526E48] text-white text-xs font-bold cursor-pointer">+10</button>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          }

          <!-- TAB 3: PERSONNEL & HR -->
          @if (activeTab() === 'personnel') {
            <div class="space-y-6 animate-fadeIn">
              <div class="p-4 rounded-2xl bg-[#B87333]/15 border border-[#B87333]/30 flex items-center justify-between">
                <div>
                  <span class="label-caps text-[9px] text-[#B87333] font-bold block">Aylık Toplam Personel Hakediş Maliyeti</span>
                  <span class="font-serif text-2xl font-bold text-[#1F1B14]">{{ hrService.totalPayrollCost() | number }} ₺</span>
                </div>
                <span class="text-2xl">👨‍🍳</span>
              </div>

              <div class="space-y-3">
                @for (emp of hrService.employees(); track emp.id) {
                  <div class="p-4 rounded-2xl bg-white border border-[#D6C9B6] space-y-3">
                    <div class="flex items-start justify-between">
                      <div>
                        <h4 class="font-serif font-bold text-base text-[#1F1B14]">{{ emp.fullName }}</h4>
                        <span class="label-caps text-[9px] text-[#526E48] font-bold">Vardiya: {{ emp.shiftHours }}</span>
                      </div>
                      <span class="font-serif font-bold text-sm text-[#B87333]">Net Maaş: {{ emp.monthlySalary | number }} ₺</span>
                    </div>

                    <div class="flex items-center justify-between pt-2 border-t border-[#D6C9B6]/50 text-xs text-[#434840]">
                      <span>Prim: {{ emp.bonus }} ₺ | Avans Kesintisi: -{{ emp.advanceDeduction }} ₺</span>
                      
                      <div class="flex gap-2">
                        <button (click)="hrService.recordAdvance(emp.id, 500)" class="px-3 py-1 rounded-full bg-[#EDE4D8] text-[10px] font-bold cursor-pointer">+500 ₺ Avans</button>
                        <button (click)="hrService.recordBonus(emp.id, 1000)" class="px-3 py-1 rounded-full bg-[#526E48] text-white text-[10px] font-bold cursor-pointer">+1000 ₺ Prim</button>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          }

          <!-- TAB 4: CUSTOMER CRM -->
          @if (activeTab() === 'crm') {
            <div class="space-y-6 animate-fadeIn">
              <div class="p-5 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] space-y-3">
                <h4 class="font-serif font-bold text-base text-[#1F1B14]">Kayıtlı Müşteri Mimarisi & Sadakat Listesi</h4>
                
                <div class="space-y-2">
                  @for (cust of crmService.customers(); track cust.id) {
                    <div class="p-3.5 rounded-xl bg-white border border-[#D6C9B6] flex items-center justify-between text-xs">
                      <div>
                        <div class="flex items-center gap-2">
                          <span class="font-serif font-bold text-sm text-[#1F1B14]">{{ cust.fullName }}</span>
                          <span class="px-2.5 py-0.5 rounded-full bg-[#B87333] text-white label-caps text-[8px] font-bold">{{ cust.tier }} Müşteri</span>
                        </div>
                        <span class="text-[10px] text-[#434840]">{{ cust.phone }} • {{ cust.email }}</span>
                      </div>

                      <div class="text-right">
                        <span class="font-serif font-bold text-sm text-[#526E48] block">{{ cust.loyaltyPoints }} Puan</span>
                        <span class="text-[10px] text-[#434840]">Toplam Harcama: {{ cust.totalSpent | number }} ₺</span>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
          }

          <!-- TAB 5: SPECIAL PASTRY ORDER KANBAN BOARD -->
          @if (activeTab() === 'kanban') {
            <div class="space-y-6 animate-fadeIn">
              <div class="flex items-center justify-between">
                <h4 class="font-serif font-bold text-base text-[#1F1B14]">Özel Pasta & Toplu Sipariş Kanban Panosu</h4>
                <span class="text-xs text-[#526E48] font-bold">Durum Süreçleri</span>
              </div>

              <!-- 4 Kanban Columns -->
              <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
                
                <!-- Column 1: Pending (Beklemede) -->
                <div class="p-3.5 rounded-2xl bg-amber-100/60 border border-amber-300 space-y-3">
                  <div class="flex items-center justify-between border-b border-amber-300 pb-2">
                    <span class="label-caps text-[10px] text-amber-900 font-bold">⏳ Beklemede ({{ kanbanService.pendingOrders().length }})</span>
                  </div>

                  @for (order of kanbanService.pendingOrders(); track order.id) {
                    <div class="p-3 rounded-xl bg-white border border-amber-300 text-xs space-y-2 shadow-xs">
                      <span class="label-caps text-[9px] text-[#B87333] font-bold block">{{ order.orderNo }} • {{ order.customerName }}</span>
                      <h5 class="font-serif font-bold text-xs text-[#1F1B14]">{{ order.cakeType }}</h5>
                      <p class="text-[10px] text-[#434840] leading-tight">{{ order.specialNotes }}</p>
                      
                      <div class="pt-2 flex justify-between items-center border-t">
                        <span class="font-bold text-[#526E48]">{{ order.totalPrice }} ₺</span>
                        <button (click)="kanbanService.updateOrderStatus(order.id, 'preparing')" class="px-2.5 py-1 bg-[#526E48] text-white text-[9px] font-bold rounded-full cursor-pointer">Hazırla →</button>
                      </div>
                    </div>
                  }
                </div>

                <!-- Column 2: Preparing (Hazırlanıyor) -->
                <div class="p-3.5 rounded-2xl bg-blue-100/60 border border-blue-300 space-y-3">
                  <div class="flex items-center justify-between border-b border-blue-300 pb-2">
                    <span class="label-caps text-[10px] text-blue-900 font-bold">👨‍🍳 Hazırlanıyor ({{ kanbanService.preparingOrders().length }})</span>
                  </div>

                  @for (order of kanbanService.preparingOrders(); track order.id) {
                    <div class="p-3 rounded-xl bg-white border border-blue-300 text-xs space-y-2 shadow-xs">
                      <span class="label-caps text-[9px] text-[#B87333] font-bold block">{{ order.orderNo }} • {{ order.customerName }}</span>
                      <h5 class="font-serif font-bold text-xs text-[#1F1B14]">{{ order.cakeType }}</h5>
                      <p class="text-[10px] text-[#434840] leading-tight">{{ order.specialNotes }}</p>

                      <div class="pt-2 flex justify-between items-center border-t">
                        <span class="font-bold text-[#526E48]">{{ order.totalPrice }} ₺</span>
                        <button (click)="kanbanService.updateOrderStatus(order.id, 'ready')" class="px-2.5 py-1 bg-[#B87333] text-white text-[9px] font-bold rounded-full cursor-pointer">Süsleme/Hazır →</button>
                      </div>
                    </div>
                  }
                </div>

                <!-- Column 3: Ready (Hazır) -->
                <div class="p-3.5 rounded-2xl bg-emerald-100/60 border border-emerald-300 space-y-3">
                  <div class="flex items-center justify-between border-b border-emerald-300 pb-2">
                    <span class="label-caps text-[10px] text-emerald-900 font-bold">✨ Teslime Hazır ({{ kanbanService.readyOrders().length }})</span>
                  </div>

                  @for (order of kanbanService.readyOrders(); track order.id) {
                    <div class="p-3 rounded-xl bg-white border border-emerald-300 text-xs space-y-2 shadow-xs">
                      <span class="label-caps text-[9px] text-[#B87333] font-bold block">{{ order.orderNo }} • {{ order.customerName }}</span>
                      <h5 class="font-serif font-bold text-xs text-[#1F1B14]">{{ order.cakeType }}</h5>
                      
                      <div class="pt-2 flex justify-between items-center border-t">
                        <span class="font-bold text-[#526E48]">{{ order.totalPrice }} ₺</span>
                        <button (click)="kanbanService.updateOrderStatus(order.id, 'delivered')" class="px-2.5 py-1 bg-emerald-700 text-white text-[9px] font-bold rounded-full cursor-pointer">Teslim Et ✅</button>
                      </div>
                    </div>
                  }
                </div>

                <!-- Column 4: Delivered (Teslim Edildi) -->
                <div class="p-3.5 rounded-2xl bg-gray-200/60 border border-gray-300 space-y-3">
                  <div class="flex items-center justify-between border-b border-gray-300 pb-2">
                    <span class="label-caps text-[10px] text-gray-800 font-bold">🎉 Teslim Edildi ({{ kanbanService.deliveredOrders().length }})</span>
                  </div>

                  @for (order of kanbanService.deliveredOrders(); track order.id) {
                    <div class="p-3 rounded-xl bg-white border border-gray-300 text-xs space-y-1 opacity-80">
                      <span class="label-caps text-[9px] text-gray-500 font-bold block">{{ order.orderNo }}</span>
                      <h5 class="font-serif font-bold text-xs text-[#1F1B14]">{{ order.cakeType }}</h5>
                    </div>
                  }
                </div>

              </div>
            </div>
          }

        </div>

      </div>
    }
  `
})
export class ErpDashboardModalComponent {
  public readonly authService = inject(AuthService);
  public readonly finService = inject(ErpFinancialService);
  public readonly inventoryService = inject(ErpInventoryService);
  public readonly hrService = inject(ErpPersonnelService);
  public readonly crmService = inject(ErpCrmService);
  public readonly kanbanService = inject(ErpKanbanService);
  public readonly erpModalService = inject(ErpModalService);
  public readonly toastService = inject(ToastService);

  public readonly activeTab = signal<'financial' | 'inventory' | 'personnel' | 'crm' | 'kanban'>('financial');

  public showAddExpenseForm = signal<boolean>(false);
  public newExpTitle = '';
  public newExpAmount = 0;

  public submitExpense(): void {
    if (this.newExpTitle && this.newExpAmount > 0) {
      this.finService.addExpense(this.newExpTitle, this.newExpAmount, 'ham_madde');
      this.toastService.show(`"${this.newExpTitle}" gider kaydı eklendi.`);
      this.newExpTitle = '';
      this.newExpAmount = 0;
      this.showAddExpenseForm.set(false);
    }
  }
}
