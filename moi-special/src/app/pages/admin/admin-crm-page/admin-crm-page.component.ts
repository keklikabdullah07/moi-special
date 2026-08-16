import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErpCrmService } from '../../../services/erp-crm.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-admin-crm-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6 animate-fadeIn">
      
      <!-- Top Title Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#D6C9B6] shadow-sm">
        <div>
          <span class="label-caps text-[10px] text-[#B87333] font-bold">Müşteri İlişkileri & Sadakat Programı</span>
          <h1 class="font-serif text-2xl font-bold text-[#1F1B14] mt-0.5">
            Müşteri CRM & Sadakat Yönetimi (/admin/crm)
          </h1>
        </div>

        <div class="flex items-center gap-2">
          <span class="px-4 py-2 bg-[#FFF8F2] border border-[#D6C9B6] rounded-full text-xs font-bold text-[#1F1B14]">
            👥 {{ crmService.customers().length }} Kayıtlı Sadık Müşteri
          </span>
        </div>
      </div>

      <!-- Customer CRM Table -->
      <div class="bg-white rounded-3xl border border-[#D6C9B6] shadow-sm overflow-hidden p-6 space-y-4">
        <h3 class="font-serif font-bold text-lg text-[#1F1B14]">Müşteri Profilleri & Harcama Geçmişi</h3>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="bg-[#FFF8F2] border-b border-[#D6C9B6] text-[10px] uppercase font-bold text-[#434840]">
                <th class="p-3">Müşteri Adı</th>
                <th class="p-3">İletişim</th>
                <th class="p-3">Doğum Günü</th>
                <th class="p-3">Sadakat Segmenti</th>
                <th class="p-3">Biriken Puan</th>
                <th class="p-3">Toplam Harcama</th>
                <th class="p-3 text-right">Puan Ekle</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#D6C9B6]/40">
              @for (cust of crmService.customers(); track cust.id) {
                <tr class="hover:bg-[#FFF8F2]/50 transition-colors">
                  <td class="p-3 font-bold font-serif text-[#1F1B14]">{{ cust.fullName }}</td>
                  <td class="p-3 text-gray-600">{{ cust.phone }} <br><span class="text-[10px] text-gray-400">{{ cust.email }}</span></td>
                  <td class="p-3 text-gray-500 font-medium">🎂 {{ cust.birthDate }}</td>
                  <td class="p-3">
                    <span class="px-2.5 py-0.5 rounded-full bg-[#B87333] text-white label-caps text-[8px] font-bold">
                      {{ cust.tier }}
                    </span>
                  </td>
                  <td class="p-3 font-bold text-[#526E48] text-sm">{{ cust.loyaltyPoints }} Puan</td>
                  <td class="p-3 font-bold text-[#1F1B14]">{{ cust.totalSpent | number }} ₺</td>
                  <td class="p-3 text-right">
                    <button (click)="addPoints(cust.id, cust.fullName)" class="px-3 py-1 bg-[#526E48] hover:bg-[#3B5532] text-white font-bold text-[10px] rounded-full uppercase cursor-pointer">
                      +100 Puan Yükle 🎁
                    </button>
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
export class AdminCrmPageComponent {
  public readonly crmService = inject(ErpCrmService);
  public readonly toastService = inject(ToastService);

  public addPoints(custID: string, name: string): void {
    this.crmService.addPoints(custID, 100);
    this.toastService.show(`"${name}" adlı müşteriye 100 hediye puan yüklendi! 🎁`);
  }
}
