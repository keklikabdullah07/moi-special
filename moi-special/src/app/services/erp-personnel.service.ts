import { Injectable, signal, computed } from '@angular/core';

export interface Employee {
  id: string;
  fullName: string;
  role: 'firin_usta' | 'pastane_sef' | 'tezgah_personel' | 'mudur';
  monthlySalary: number;
  bonus: number;
  advanceDeduction: number;
  phone: string;
  shiftHours: string;
  hireDate: string;
}

const HR_CACHE_KEY = 'moi_erp_personnel_v1';

@Injectable({
  providedIn: 'root'
})
export class ErpPersonnelService {
  public readonly employees = signal<Employee[]>([
    { id: 'emp1', fullName: 'Ahmet Usta (Taş Fırın Baş Usta)', role: 'firin_usta', monthlySalary: 42000, bonus: 3500, advanceDeduction: 2000, phone: '0533 111 22 33', shiftHours: '04:00 - 13:00 (Sabah Pişirim)', hireDate: '2025-01-15' },
    { id: 'emp2', fullName: 'Mehmet Şef (Pastane & Entremet Şefi)', role: 'pastane_sef', monthlySalary: 38000, bonus: 2800, advanceDeduction: 1500, phone: '0535 222 33 44', shiftHours: '07:00 - 16:00 (Gündüz Üretim)', hireDate: '2025-03-01' },
    { id: 'emp3', fullName: 'Fatma Hanım (Kasa & Tezgah Sorumlusu)', role: 'tezgah_personel', monthlySalary: 24000, bonus: 1200, advanceDeduction: 0, phone: '0544 333 44 55', shiftHours: '08:00 - 17:00 (Müşteri Karşılama)', hireDate: '2025-06-10' }
  ]);

  public readonly totalPayrollCost = computed(() => 
    this.employees().reduce((sum, emp) => sum + emp.monthlySalary + emp.bonus - emp.advanceDeduction, 0)
  );

  constructor() {
    this.loadCache();
  }

  public recordAdvance(employeeId: string, amount: number): void {
    this.employees.update(list => 
      list.map(e => e.id === employeeId ? { ...e, advanceDeduction: e.advanceDeduction + amount } : e)
    );
    this.saveCache();
  }

  public recordBonus(employeeId: string, amount: number): void {
    this.employees.update(list => 
      list.map(e => e.id === employeeId ? { ...e, bonus: e.bonus + amount } : e)
    );
    this.saveCache();
  }

  private loadCache(): void {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(HR_CACHE_KEY);
      if (raw) this.employees.set(JSON.parse(raw));
    } catch (e) {}
  }

  private saveCache(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(HR_CACHE_KEY, JSON.stringify(this.employees()));
    } catch (e) {}
  }
}
