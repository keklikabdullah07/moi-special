import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErpPersonnelService, Employee } from '../../../services/erp-personnel.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-admin-personnel-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6 animate-fadeIn">
      
      <!-- Top Title Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-[#D6C9B6] shadow-sm">
        <div>
          <span class="label-caps text-[10px] text-blue-800 font-bold">İnsan Kaynakları, Vardiya & Bordro</span>
          <h1 class="font-serif text-2xl font-bold text-[#1F1B14] mt-0.5">
            Personel ve İşçi Yönetimi (/admin/personnel)
          </h1>
        </div>

        <button 
          (click)="showAddForm.set(!showAddForm())"
          class="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer">
          + Yeni Personel Kartı Aç
        </button>
      </div>

      <!-- Add New Employee Drawer -->
      @if (showAddForm()) {
        <form (ngSubmit)="submitNewEmployee()" class="bg-white p-6 rounded-3xl border border-blue-600 shadow-md space-y-4 animate-fadeIn">
          <h3 class="font-serif font-bold text-lg text-[#1F1B14] border-b border-[#D6C9B6] pb-2">
            Yeni Çalışan Kayıt Formu
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div class="space-y-1">
              <label class="label-caps text-[10px] text-[#434840]">Adı Soyadı</label>
              <input type="text" [(ngModel)]="newFullName" name="newFullName" required placeholder="Örn. Hasan Usta" class="w-full px-3 py-2 rounded-xl bg-[#FFF8F2] border border-[#D6C9B6]" />
            </div>

            <div class="space-y-1">
              <label class="label-caps text-[10px] text-[#434840]">Görevi / Rolü</label>
              <select [(ngModel)]="newRole" name="newRole" class="w-full px-3 py-2 rounded-xl bg-[#FFF8F2] border border-[#D6C9B6]">
                <option value="firin_usta">Taş Fırın Ustası</option>
                <option value="pastane_sef">Pastane & Entremet Şefi</option>
                <option value="tezgah_personel">Kasa & Tezgah Personeli</option>
                <option value="mudur">Şube Müdürü</option>
              </select>
            </div>

            <div class="space-y-1">
              <label class="label-caps text-[10px] text-[#434840]">Aylık Taban Maaş (₺)</label>
              <input type="number" [(ngModel)]="newSalary" name="newSalary" required class="w-full px-3 py-2 rounded-xl bg-[#FFF8F2] border border-[#D6C9B6]" />
            </div>

            <div class="space-y-1">
              <label class="label-caps text-[10px] text-[#434840]">Telefon Numarası</label>
              <input type="text" [(ngModel)]="newPhone" name="newPhone" placeholder="0530 000 00 00" class="w-full px-3 py-2 rounded-xl bg-[#FFF8F2] border border-[#D6C9B6]" />
            </div>

            <div class="space-y-1 sm:col-span-2">
              <label class="label-caps text-[10px] text-[#434840]">Vardiya Saatleri & Çalışma Planı</label>
              <input type="text" [(ngModel)]="newShift" name="newShift" placeholder="Örn. 05:00 - 14:00 (Sabah Erken Pişirim)" class="w-full px-3 py-2 rounded-xl bg-[#FFF8F2] border border-[#D6C9B6]" />
            </div>
          </div>

          <div class="flex justify-end gap-2 pt-2">
            <button type="button" (click)="showAddForm.set(false)" class="px-4 py-2 bg-gray-200 text-xs font-bold rounded-full">İptal</button>
            <button type="submit" class="px-6 py-2 bg-blue-700 text-white text-xs font-bold rounded-full uppercase tracking-wider">Kaydet ve Personeli Ekle ⚡</button>
          </div>
        </form>
      }

      <!-- Total Payroll Banner -->
      <div class="p-5 rounded-3xl bg-[#B87333]/15 border border-[#B87333]/30 flex items-center justify-between">
        <div>
          <span class="label-caps text-[9px] text-[#B87333] font-bold block">Aylık Toplam Personel Hakediş Maliyeti</span>
          <span class="font-serif text-3xl font-bold text-[#1F1B14]">{{ hrService.totalPayrollCost() | number }} ₺</span>
        </div>
        <span class="text-3xl">👨‍🍳</span>
      </div>

      <!-- Employees List Cards -->
      <div class="space-y-4">
        @for (emp of hrService.employees(); track emp.id) {
          <div class="bg-white p-6 rounded-3xl border border-[#D6C9B6] shadow-sm space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D6C9B6]/50 pb-3">
              <div>
                <h3 class="font-serif font-bold text-lg text-[#1F1B14]">{{ emp.fullName }}</h3>
                <span class="label-caps text-[10px] text-[#526E48] font-bold block mt-0.5">
                  Vardiya Planı: {{ emp.shiftHours }} • İşe Giriş: {{ emp.hireDate }}
                </span>
              </div>
              <div class="text-right">
                <span class="label-caps text-[9px] text-gray-500 block">Taban Maaş</span>
                <span class="font-serif font-bold text-xl text-[#B87333]">{{ emp.monthlySalary | number }} ₺</span>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#434840]">
              <div class="space-x-4">
                <span>Telefon: <strong>{{ emp.phone }}</strong></span>
                <span>Hak Edilen Prim: <strong class="text-emerald-700">+{{ emp.bonus }} ₺</strong></span>
                <span>Kesilen Avans: <strong class="text-red-700">-{{ emp.advanceDeduction }} ₺</strong></span>
              </div>

              <div class="flex gap-2">
                <button (click)="hrService.recordAdvance(emp.id, 500)" class="px-3.5 py-1.5 rounded-full bg-[#EDE4D8] hover:bg-red-100 font-bold text-[10px] uppercase cursor-pointer">+500 ₺ Avans Yaz</button>
                <button (click)="hrService.recordBonus(emp.id, 1000)" class="px-3.5 py-1.5 rounded-full bg-[#526E48] hover:bg-[#3B5532] text-white font-bold text-[10px] uppercase cursor-pointer">+1000 ₺ Prim Ekle</button>
              </div>
            </div>
          </div>
        }
      </div>

    </div>
  `
})
export class AdminPersonnelPageComponent {
  public readonly hrService = inject(ErpPersonnelService);
  public readonly toastService = inject(ToastService);

  public showAddForm = signal<boolean>(false);
  public newFullName = '';
  public newRole: Employee['role'] = 'firin_usta';
  public newSalary = 35000;
  public newPhone = '';
  public newShift = '06:00 - 15:00';

  public submitNewEmployee(): void {
    if (this.newFullName) {
      const newEmp: Employee = {
        id: 'emp_' + Date.now(),
        fullName: this.newFullName,
        role: this.newRole,
        monthlySalary: this.newSalary,
        bonus: 0,
        advanceDeduction: 0,
        phone: this.newPhone || '0500 000 00 00',
        shiftHours: this.newShift,
        hireDate: new Date().toISOString().split('T')[0]
      };

      this.hrService.employees.update(list => [...list, newEmp]);
      this.toastService.show(`"${this.newFullName}" personel kartı açıldı. 👨‍🍳`);
      this.showAddForm.set(false);
      this.newFullName = '';
    }
  }
}
