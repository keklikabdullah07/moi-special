import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErpInventoryService, InventoryItem } from '../../../services/erp-inventory.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-admin-inventory-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6 animate-fadeIn">
      
      <!-- Top Title & Action Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#D6C9B6] shadow-sm">
        <div>
          <span class="label-caps text-[10px] text-[#526E48] font-bold">Stok & Ham Madde Depo Yönetimi</span>
          <h1 class="font-serif text-2xl font-bold text-[#1F1B14] mt-0.5">
            Fırın & Pastane Envanteri (/admin/inventory)
          </h1>
        </div>

        <button 
          (click)="showAddForm.set(!showAddForm())"
          class="px-5 py-2.5 bg-[#526E48] hover:bg-[#3B5532] text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer">
          + Yeni Ham Madde / Ürün Ekle
        </button>
      </div>

      <!-- Add New Item Form Drawer -->
      @if (showAddForm()) {
        <form (ngSubmit)="submitNewItem()" class="bg-white p-6 rounded-3xl border border-[#526E48] shadow-md space-y-4 animate-fadeIn">
          <h3 class="font-serif font-bold text-lg text-[#1F1B14] border-b border-[#D6C9B6] pb-2">
            Yeni Malzeme / Ürün Kayıt Formu
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="space-y-1">
              <label class="label-caps text-[10px] text-[#434840]">Malzeme / Ürün Adı</label>
              <input type="text" [(ngModel)]="newName" name="newName" required placeholder="Örn. Vanilya Çubuğu" class="w-full px-3 py-2 rounded-xl bg-[#FFF8F2] border border-[#D6C9B6] text-xs text-[#1F1B14]" />
            </div>

            <div class="space-y-1">
              <label class="label-caps text-[10px] text-[#434840]">Tedarikçi Firma</label>
              <input type="text" [(ngModel)]="newSupplier" name="newSupplier" required placeholder="Örn. Callebaut" class="w-full px-3 py-2 rounded-xl bg-[#FFF8F2] border border-[#D6C9B6] text-xs text-[#1F1B14]" />
            </div>

            <div class="space-y-1">
              <label class="label-caps text-[10px] text-[#434840]">Kategori</label>
              <select [(ngModel)]="newCategory" name="newCategory" class="w-full px-3 py-2 rounded-xl bg-[#FFF8F2] border border-[#D6C9B6] text-xs text-[#1F1B14]">
                <option value="ham_madde">Ham Madde</option>
                <option value="mamul_urun">Mamul Ürün</option>
              </select>
            </div>

            <div class="space-y-1">
              <label class="label-caps text-[10px] text-[#434840]">Stok Miktarı</label>
              <input type="number" [(ngModel)]="newQty" name="newQty" required class="w-full px-3 py-2 rounded-xl bg-[#FFF8F2] border border-[#D6C9B6] text-xs text-[#1F1B14]" />
            </div>

            <div class="space-y-1">
              <label class="label-caps text-[10px] text-[#434840]">Birim (kg/lt/adet/paket)</label>
              <input type="text" [(ngModel)]="newUnit" name="newUnit" required class="w-full px-3 py-2 rounded-xl bg-[#FFF8F2] border border-[#D6C9B6] text-xs text-[#1F1B14]" />
            </div>

            <div class="space-y-1">
              <label class="label-caps text-[10px] text-[#434840]">Kritik Stok Eşiği (Uyarı Sınırı)</label>
              <input type="number" [(ngModel)]="newThreshold" name="newThreshold" required class="w-full px-3 py-2 rounded-xl bg-[#FFF8F2] border border-[#D6C9B6] text-xs text-[#1F1B14]" />
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button type="button" (click)="showAddForm.set(false)" class="px-4 py-2 bg-gray-200 text-xs font-bold rounded-full">İptal</button>
            <button type="submit" class="px-6 py-2 bg-[#526E48] text-white text-xs font-bold rounded-full uppercase tracking-wider">Kaydet ve Depoya Ekle ⚡</button>
          </div>
        </form>
      }

      <!-- Search & Filter Bar -->
      <div class="bg-white p-4 rounded-2xl border border-[#D6C9B6] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <input 
          type="text" 
          [(ngModel)]="searchQuery" 
          placeholder="🔍 Malzeme veya tedarikçi ara..." 
          class="w-full sm:w-72 px-4 py-2 rounded-full bg-[#FFF8F2] border border-[#D6C9B6]" />

        <div class="flex gap-2">
          <button (click)="filterCat.set('all')" [class.bg-[#526E48]]="filterCat() === 'all'" [class.text-white]="filterCat() === 'all'" class="px-3 py-1.5 rounded-full border text-xs font-bold">Tümü</button>
          <button (click)="filterCat.set('ham_madde')" [class.bg-[#526E48]]="filterCat() === 'ham_madde'" [class.text-white]="filterCat() === 'ham_madde'" class="px-3 py-1.5 rounded-full border text-xs font-bold">Ham Madde</button>
          <button (click)="filterCat.set('mamul_urun')" [class.bg-[#526E48]]="filterCat() === 'mamul_urun'" [class.text-white]="filterCat() === 'mamul_urun'" class="px-3 py-1.5 rounded-full border text-xs font-bold">Mamul Ürün</button>
        </div>
      </div>

      <!-- Data Table Container -->
      <div class="bg-white rounded-3xl border border-[#D6C9B6] shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-[#FFF8F2] border-b border-[#D6C9B6] text-[10px] uppercase font-bold text-[#434840]">
                <th class="p-4">Malzeme / Ürün</th>
                <th class="p-4">Kategori</th>
                <th class="p-4">Mevcut Stok</th>
                <th class="p-4">Kritik Eşik</th>
                <th class="p-4">Tedarikçi</th>
                <th class="p-4 text-right">Stok Güncelleme</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#D6C9B6]/40 text-xs text-[#1F1B14]">
              @for (item of filteredItems(); track item.id) {
                <tr class="hover:bg-[#FFF8F2]/50 transition-colors">
                  <td class="p-4 font-bold font-serif">
                    <div class="flex items-center gap-2">
                      <span>{{ item.name }}</span>
                      @if (item.stockQuantity <= item.minimumThreshold) {
                        <span class="px-2 py-0.5 bg-red-600 text-white label-caps text-[8px] font-bold rounded-full">🚨 Kritik</span>
                      }
                    </div>
                  </td>
                  <td class="p-4 label-caps text-[10px] text-[#526E48] font-bold">{{ item.category }}</td>
                  <td class="p-4 font-bold text-sm text-[#3B5532]">
                    {{ item.stockQuantity }} {{ item.unit }}
                  </td>
                  <td class="p-4 text-gray-500 font-medium">
                    {{ item.minimumThreshold }} {{ item.unit }}
                  </td>
                  <td class="p-4 text-gray-600">{{ item.supplier }}</td>
                  <td class="p-4 text-right">
                    <div class="flex items-center justify-end gap-1.5">
                      <button (click)="inventoryService.updateStockQuantity(item.id, -5)" class="px-2.5 py-1 rounded-lg bg-red-100 text-red-800 font-bold hover:bg-red-200 cursor-pointer">-5</button>
                      <button (click)="inventoryService.updateStockQuantity(item.id, 10)" class="px-2.5 py-1 rounded-lg bg-[#526E48] text-white font-bold hover:bg-[#3B5532] cursor-pointer">+10</button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `
})
export class AdminInventoryPageComponent {
  public readonly inventoryService = inject(ErpInventoryService);
  public readonly toastService = inject(ToastService);

  public showAddForm = signal<boolean>(false);
  public searchQuery = '';
  public filterCat = signal<'all' | 'ham_madde' | 'mamul_urun'>('all');

  public newName = '';
  public newSupplier = '';
  public newCategory: 'ham_madde' | 'mamul_urun' = 'ham_madde';
  public newQty = 10;
  public newUnit = 'kg';
  public newThreshold = 15;

  public filteredItems = computed(() => {
    return this.inventoryService.items().filter(item => {
      const matchSearch = item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                          item.supplier.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchCat = this.filterCat() === 'all' || item.category === this.filterCat();
      return matchSearch && matchCat;
    });
  });

  public submitNewItem(): void {
    if (this.newName && this.newSupplier) {
      const newItem: InventoryItem = {
        id: 'inv_' + Date.now(),
        name: this.newName,
        category: this.newCategory,
        stockQuantity: this.newQty,
        unit: this.newUnit as any,
        minimumThreshold: this.newThreshold,
        unitPrice: 150,
        supplier: this.newSupplier
      };

      this.inventoryService.addItem(newItem);
      this.toastService.show(`"${this.newName}" malzemesi depoya eklendi. 🌾`);
      this.showAddForm.set(false);
      this.newName = '';
      this.newSupplier = '';
    }
  }
}
