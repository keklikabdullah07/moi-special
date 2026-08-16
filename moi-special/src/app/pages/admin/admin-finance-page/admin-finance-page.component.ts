import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErpFinancialService, FinancialExpense } from '../../../services/erp-financial.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-admin-finance-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6 animate-fadeIn">
      
      <!-- Top Header & Export Actions -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#D6C9B6] shadow-sm">
        <div>
          <span class="label-caps text-[10px] text-[#B87333] font-bold">Kasa, Gelir & Gider Yönetimi</span>
          <h1 class="font-serif text-2xl font-bold text-[#1F1B14] mt-0.5">
            Finansal Raporlar ve Muhasebe (/admin/finance)
          </h1>
        </div>

        <div class="flex items-center gap-2">
          <button (click)="exportExcel()" class="px-4 py-2 bg-[#526E48] hover:bg-[#3B5532] text-white rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer">
            📊 Excel İndir (.XLSX)
          </button>
          <button (click)="exportPdf()" class="px-4 py-2 bg-[#B87333] hover:bg-[#784000] text-white rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer">
            📄 PDF Rapor Al
          </button>
        </div>
      </div>

      <!-- Financial Metrics Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <div class="bg-white p-5 rounded-3xl border border-[#D6C9B6] shadow-sm space-y-1">
          <span class="label-caps text-[9px] text-[#3B5532] font-bold">Nakit Kasa Girişi</span>
          <div class="font-serif text-2xl font-bold text-[#1F1B14]">{{ finService.cashRevenue() | number }} ₺</div>
        </div>
        <div class="bg-white p-5 rounded-3xl border border-[#D6C9B6] shadow-sm space-y-1">
          <span class="label-caps text-[9px] text-[#3B5532] font-bold">Kredi Kartı POS Tahsilat</span>
          <div class="font-serif text-2xl font-bold text-[#1F1B14]">{{ finService.cardRevenue() | number }} ₺</div>
        </div>
        <div class="bg-white p-5 rounded-3xl border border-[#D6C9B6] shadow-sm space-y-1">
          <span class="label-caps text-[9px] text-[#3B5532] font-bold">Online Sipariş Cirosu</span>
          <div class="font-serif text-2xl font-bold text-[#1F1B14]">{{ finService.onlineRevenue() | number }} ₺</div>
        </div>
        <div class="bg-white p-5 rounded-3xl border border-[#B87333]/40 bg-[#FFF8F2] shadow-sm space-y-1">
          <span class="label-caps text-[9px] text-[#B87333] font-bold">Net Kâr (Vergi Öncesi)</span>
          <div class="font-serif text-2xl font-bold text-[#B87333]">{{ finService.netProfit() | number }} ₺</div>
        </div>
      </div>

      <!-- Add Expense Form Drawer -->
      <div class="bg-white p-6 rounded-3xl border border-[#D6C9B6] shadow-sm space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-serif font-bold text-lg text-[#1F1B14]">Gider ve İşletme Harcaması Ekle</h3>
          <button (click)="showAddForm.set(!showAddForm())" class="px-4 py-1.5 bg-[#B87333] text-white text-xs font-bold uppercase rounded-full cursor-pointer">
            + Yeni Harcama Kaydı
          </button>
        </div>

        @if (showAddForm()) {
          <form (ngSubmit)="submitExpense()" class="p-4 rounded-2xl bg-[#FFF8F2] border border-[#D6C9B6] grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs animate-fadeIn">
            <input type="text" [(ngModel)]="expTitle" name="expTitle" placeholder="Harcama Açıklaması" required class="px-3 py-2 rounded-xl bg-white border border-[#D6C9B6]" />
            <input type="number" [(ngModel)]="expAmount" name="expAmount" placeholder="Tutar (₺)" required class="px-3 py-2 rounded-xl bg-white border border-[#D6C9B6]" />
            <select [(ngModel)]="expCategory" name="expCategory" class="px-3 py-2 rounded-xl bg-white border border-[#D6C9B6]">
              <option value="ham_madde">Ham Madde / Un / Çikolata</option>
              <option value="fatura">Fatura / Elektrik / Su / Gaz</option>
              <option value="kira">Şube Kirası</option>
              <option value="maas">Personel Maaş & Avans</option>
            </select>
            <button type="submit" class="py-2 bg-[#526E48] text-white rounded-xl font-bold uppercase tracking-wider">Kaydet ⚡</button>
          </form>
        }
      </div>

      <!-- Expense Data Table -->
      <div class="bg-white rounded-3xl border border-[#D6C9B6] shadow-sm overflow-hidden p-6 space-y-4">
        <h3 class="font-serif font-bold text-lg text-[#1F1B14]">Geçmiş Gider ve Harcama Hareket Dökümü</h3>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-[#FFF8F2] border-b border-[#D6C9B6] text-[10px] uppercase font-bold text-[#434840]">
                <th class="p-3">Harcama Başlığı</th>
                <th class="p-3">Kategori</th>
                <th class="p-3">Tarih</th>
                <th class="p-3 text-right">Tutar (₺)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#D6C9B6]/40">
              @for (exp of finService.expenses(); track exp.id) {
                <tr class="hover:bg-[#FFF8F2]/50 transition-colors">
                  <td class="p-3 font-bold font-serif text-[#1F1B14]">{{ exp.title }}</td>
                  <td class="p-3 label-caps text-[9px] text-[#B87333] font-bold">{{ exp.category }}</td>
                  <td class="p-3 text-gray-500">{{ exp.date }}</td>
                  <td class="p-3 text-right font-bold text-red-700">- {{ exp.amount | number }} ₺</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `
})
export class AdminFinancePageComponent {
  public readonly finService = inject(ErpFinancialService);
  public readonly toastService = inject(ToastService);

  public showAddForm = signal<boolean>(false);
  public expTitle = '';
  public expAmount = 0;
  public expCategory: FinancialExpense['category'] = 'ham_madde';

  public submitExpense(): void {
    if (this.expTitle && this.expAmount > 0) {
      this.finService.addExpense(this.expTitle, this.expAmount, this.expCategory);
      this.toastService.show(`"${this.expTitle}" gider kaydı işlendi. 💰`);
      this.expTitle = '';
      this.expAmount = 0;
      this.showAddForm.set(false);
    }
  }

  public exportExcel(): void {
    this.toastService.showSuccess('Móí_Special_Finans_Raporu.xlsx bilgisayarınıza indirildi! 📊');
  }

  public exportPdf(): void {
    this.toastService.showAdmin('Móí_Special_Aylik_Bordro_Ve_Kasa_Raporu.pdf oluşturuldu! 📄');
  }
}
