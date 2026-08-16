import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErpKanbanService, CustomPastryOrder, CustomOrderStatus } from '../../../services/erp-kanban.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-admin-orders-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6 animate-fadeIn">
      
      <!-- Top Header & Action -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#D6C9B6] shadow-sm">
        <div>
          <span class="label-caps text-[10px] text-[#D97706] font-bold">Özel Gün Pastaları & Toplu İkramlıklar</span>
          <h1 class="font-serif text-2xl font-bold text-[#1F1B14] mt-0.5">
            Canlı Sipariş Kanban Panosu (/admin/orders)
          </h1>
        </div>

        <button 
          (click)="showAddForm.set(!showAddForm())"
          class="px-5 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer">
          + Manuel Özel Sipariş Oluştur
        </button>
      </div>

      <!-- Add New Custom Order Drawer -->
      @if (showAddForm()) {
        <form (ngSubmit)="submitNewOrder()" class="bg-white p-6 rounded-3xl border border-[#D97706] shadow-md space-y-4 animate-fadeIn">
          <h3 class="font-serif font-bold text-lg text-[#1F1B14] border-b border-[#D6C9B6] pb-2">
            Yeni Özel Sipariş Kayıt Formu
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div class="space-y-1">
              <label class="label-caps text-[10px] text-[#434840]">Müşteri Adı Soyadı</label>
              <input type="text" [(ngModel)]="newCustName" name="newCustName" required placeholder="Örn. Zeynep Hanım" class="w-full px-3 py-2 rounded-xl bg-[#FFF8F2] border border-[#D6C9B6]" />
            </div>

            <div class="space-y-1">
              <label class="label-caps text-[10px] text-[#434840]">Telefon Numarası</label>
              <input type="text" [(ngModel)]="newPhone" name="newPhone" required placeholder="0532 000 00 00" class="w-full px-3 py-2 rounded-xl bg-[#FFF8F2] border border-[#D6C9B6]" />
            </div>

            <div class="space-y-1">
              <label class="label-caps text-[10px] text-[#434840]">Pasta / Sipariş Türü</label>
              <input type="text" [(ngModel)]="newCakeType" name="newCakeType" required placeholder="Örn. 2 Katlı Çikolatalı Entremet" class="w-full px-3 py-2 rounded-xl bg-[#FFF8F2] border border-[#D6C9B6]" />
            </div>

            <div class="space-y-1">
              <label class="label-caps text-[10px] text-[#434840]">Kişi / Porsiyon Sayısı</label>
              <input type="number" [(ngModel)]="newPortion" name="newPortion" required class="w-full px-3 py-2 rounded-xl bg-[#FFF8F2] border border-[#D6C9B6]" />
            </div>

            <div class="space-y-1">
              <label class="label-caps text-[10px] text-[#434840]">Teslimat Tarihi</label>
              <input type="date" [(ngModel)]="newEventDate" name="newEventDate" required class="w-full px-3 py-2 rounded-xl bg-[#FFF8F2] border border-[#D6C9B6]" />
            </div>

            <div class="space-y-1">
              <label class="label-caps text-[10px] text-[#434840]">Toplam Fiyat (₺)</label>
              <input type="number" [(ngModel)]="newPrice" name="newPrice" required class="w-full px-3 py-2 rounded-xl bg-[#FFF8F2] border border-[#D6C9B6]" />
            </div>

            <div class="space-y-1 sm:col-span-3">
              <label class="label-caps text-[10px] text-[#434840]">Müşterinin Özel İstek ve Notları</label>
              <textarea [(ngModel)]="newNotes" name="newNotes" rows="2" placeholder="Örn. Üzerine canlı çiçek konulacak, şeker oranı %20 az olsun." class="w-full px-3 py-2 rounded-xl bg-[#FFF8F2] border border-[#D6C9B6]"></textarea>
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button type="button" (click)="showAddForm.set(false)" class="px-4 py-2 bg-gray-200 text-xs font-bold rounded-full">İptal</button>
            <button type="submit" class="px-6 py-2 bg-[#D97706] text-white text-xs font-bold rounded-full uppercase tracking-wider">Siparişi Kaydet 🎂</button>
          </div>
        </form>
      }

      <!-- 4 Column Kanban Board -->
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
        
        <!-- Column 1: Pending -->
        <div class="p-4 rounded-3xl bg-amber-50 border border-amber-200 space-y-4">
          <div class="flex items-center justify-between border-b border-amber-300 pb-2">
            <span class="label-caps text-[10px] text-amber-900 font-bold">⏳ Beklemede ({{ kanbanService.pendingOrders().length }})</span>
          </div>

          @for (order of kanbanService.pendingOrders(); track order.id) {
            <div class="p-4 rounded-2xl bg-white border border-amber-200 text-xs space-y-2 shadow-xs">
              <span class="label-caps text-[9px] text-[#B87333] font-bold block">{{ order.orderNo }} • {{ order.customerName }}</span>
              <h4 class="font-serif font-bold text-sm text-[#1F1B14]">{{ order.cakeType }}</h4>
              <span class="text-[10px] text-gray-500 block">Tarih: {{ order.eventDate }} • {{ order.portionCount }} Kişilik</span>
              <p class="text-[10px] text-gray-600 bg-amber-50 p-2 rounded-lg leading-relaxed">{{ order.specialNotes }}</p>

              <div class="pt-2 flex justify-between items-center border-t border-gray-100">
                <span class="font-bold text-[#526E48]">{{ order.totalPrice }} ₺</span>
                <button (click)="kanbanService.updateOrderStatus(order.id, 'preparing')" class="px-3 py-1 bg-[#526E48] text-white text-[9px] font-bold rounded-full cursor-pointer">Hazırla →</button>
              </div>
            </div>
          }
        </div>

        <!-- Column 2: Preparing -->
        <div class="p-4 rounded-3xl bg-blue-50 border border-blue-200 space-y-4">
          <div class="flex items-center justify-between border-b border-blue-300 pb-2">
            <span class="label-caps text-[10px] text-blue-900 font-bold">👨‍🍳 Hazırlanıyor ({{ kanbanService.preparingOrders().length }})</span>
          </div>

          @for (order of kanbanService.preparingOrders(); track order.id) {
            <div class="p-4 rounded-2xl bg-white border border-blue-200 text-xs space-y-2 shadow-xs">
              <span class="label-caps text-[9px] text-[#B87333] font-bold block">{{ order.orderNo }} • {{ order.customerName }}</span>
              <h4 class="font-serif font-bold text-sm text-[#1F1B14]">{{ order.cakeType }}</h4>
              <span class="text-[10px] text-gray-500 block">Tarih: {{ order.eventDate }} • {{ order.portionCount }} Kişilik</span>
              <p class="text-[10px] text-gray-600 bg-blue-50 p-2 rounded-lg leading-relaxed">{{ order.specialNotes }}</p>

              <div class="pt-2 flex justify-between items-center border-t border-gray-100">
                <span class="font-bold text-[#526E48]">{{ order.totalPrice }} ₺</span>
                <button (click)="kanbanService.updateOrderStatus(order.id, 'ready')" class="px-3 py-1 bg-[#B87333] text-white text-[9px] font-bold rounded-full cursor-pointer">Süsleme/Hazır →</button>
              </div>
            </div>
          }
        </div>

        <!-- Column 3: Ready -->
        <div class="p-4 rounded-3xl bg-emerald-50 border border-emerald-200 space-y-4">
          <div class="flex items-center justify-between border-b border-emerald-300 pb-2">
            <span class="label-caps text-[10px] text-emerald-900 font-bold">✨ Teslime Hazır ({{ kanbanService.readyOrders().length }})</span>
          </div>

          @for (order of kanbanService.readyOrders(); track order.id) {
            <div class="p-4 rounded-2xl bg-white border border-emerald-200 text-xs space-y-2 shadow-xs">
              <span class="label-caps text-[9px] text-[#B87333] font-bold block">{{ order.orderNo }} • {{ order.customerName }}</span>
              <h4 class="font-serif font-bold text-sm text-[#1F1B14]">{{ order.cakeType }}</h4>
              
              <div class="pt-2 flex justify-between items-center border-t border-gray-100">
                <span class="font-bold text-[#526E48]">{{ order.totalPrice }} ₺</span>
                <button (click)="kanbanService.updateOrderStatus(order.id, 'delivered')" class="px-3 py-1 bg-emerald-700 text-white text-[9px] font-bold rounded-full cursor-pointer">Teslim Et ✅</button>
              </div>
            </div>
          }
        </div>

        <!-- Column 4: Delivered -->
        <div class="p-4 rounded-3xl bg-gray-100 border border-gray-200 space-y-4">
          <div class="flex items-center justify-between border-b border-gray-300 pb-2">
            <span class="label-caps text-[10px] text-gray-800 font-bold">🎉 Teslim Edildi ({{ kanbanService.deliveredOrders().length }})</span>
          </div>

          @for (order of kanbanService.deliveredOrders(); track order.id) {
            <div class="p-4 rounded-2xl bg-white border border-gray-200 text-xs space-y-1 opacity-75">
              <span class="label-caps text-[9px] text-gray-500 font-bold block">{{ order.orderNo }}</span>
              <h4 class="font-serif font-bold text-sm text-[#1F1B14]">{{ order.cakeType }}</h4>
            </div>
          }
        </div>

      </div>

    </div>
  `
})
export class AdminOrdersPageComponent {
  public readonly kanbanService = inject(ErpKanbanService);
  public readonly toastService = inject(ToastService);

  public showAddForm = signal<boolean>(false);
  public newCustName = '';
  public newPhone = '';
  public newCakeType = '';
  public newPortion = 12;
  public newEventDate = new Date().toISOString().split('T')[0];
  public newPrice = 1200;
  public newNotes = '';

  public submitNewOrder(): void {
    if (this.newCustName && this.newCakeType) {
      const newOrder: CustomPastryOrder = {
        id: 'ord_' + Date.now(),
        orderNo: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
        customerName: this.newCustName,
        phone: this.newPhone,
        cakeType: this.newCakeType,
        portionCount: this.newPortion,
        eventDate: this.newEventDate,
        status: 'pending',
        totalPrice: this.newPrice,
        depositPaid: Math.floor(this.newPrice / 2),
        specialNotes: this.newNotes || 'Özel gün pastası.'
      };

      this.kanbanService.orders.update(list => [newOrder, ...list]);
      this.toastService.show(`"${this.newCustName}" için sipariş Kanban panosuna eklendi! 🎂`);
      this.showAddForm.set(false);
      this.newCustName = '';
      this.newCakeType = '';
    }
  }
}
