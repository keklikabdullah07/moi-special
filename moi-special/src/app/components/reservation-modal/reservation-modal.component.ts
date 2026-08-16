import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (reservationService.isModalOpen()) {
      <!-- Backdrop Overlay -->
      <div 
        (click)="reservationService.closeModal()"
        class="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 transition-opacity duration-300">
      </div>

      <!-- Modal Container (Slide-up Bottom Sheet on Mobile, Centered Modal on Desktop) -->
      <div class="fixed inset-x-0 bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 max-w-lg mx-auto bg-[#FFF8F2] border border-[#D6C9B6] rounded-t-3xl sm:rounded-3xl z-50 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-[#D6C9B6] pb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#B87333]/10 flex items-center justify-center text-[#B87333]">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <span class="label-caps text-[9px] text-[#B87333]">Moi Special Şanlıurfa</span>
              <h3 class="font-serif text-xl font-bold text-[#1F1B14]">Masa Rezerve Edin</h3>
            </div>
          </div>

          <button 
            (click)="reservationService.closeModal()"
            class="p-2 rounded-full hover:bg-[#EDE4D8] text-[#1F1B14] transition-colors cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        @if (!reservationService.isSubmitted()) {
          <!-- Form -->
          <form (ngSubmit)="onSubmit()" class="space-y-4">
            <div>
              <label class="block label-caps text-[10px] text-[#434840] mb-1">Adınız Soyadınız</label>
              <input 
                type="text" 
                [(ngModel)]="name" 
                name="name" 
                required 
                placeholder="Örn. Ahmet Yılmaz"
                class="w-full px-4 py-3 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-sm text-[#1F1B14] focus:outline-none focus:border-[#526E48]" />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block label-caps text-[10px] text-[#434840] mb-1">Telefon</label>
                <input 
                  type="tel" 
                  [(ngModel)]="phone" 
                  name="phone" 
                  required 
                  placeholder="05XX XXX XX XX"
                  class="w-full px-4 py-3 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-sm text-[#1F1B14] focus:outline-none focus:border-[#526E48]" />
              </div>
              <div>
                <label class="block label-caps text-[10px] text-[#434840] mb-1">Kişi Sayısı</label>
                <select 
                  [(ngModel)]="guests" 
                  name="guests" 
                  class="w-full px-4 py-3 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-sm text-[#1F1B14] focus:outline-none focus:border-[#526E48]">
                  <option [value]="1">1 Kişi</option>
                  <option [value]="2">2 Kişi (Çift)</option>
                  <option [value]="4">4 Kişi (Aile)</option>
                  <option [value]="6">6+ Kişi (Grup)</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block label-caps text-[10px] text-[#434840] mb-1">Tarih</label>
                <input 
                  type="date" 
                  [(ngModel)]="date" 
                  name="date" 
                  required 
                  class="w-full px-4 py-3 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-sm text-[#1F1B14] focus:outline-none focus:border-[#526E48]" />
              </div>
              <div>
                <label class="block label-caps text-[10px] text-[#434840] mb-1">Saat</label>
                <select 
                  [(ngModel)]="time" 
                  name="time" 
                  class="w-full px-4 py-3 rounded-2xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-sm text-[#1F1B14] focus:outline-none focus:border-[#526E48]">
                  <option value="09:00">09:00 (Kahvaltı)</option>
                  <option value="12:30">12:30 (Öğle)</option>
                  <option value="16:00">16:00 (Beş Çayı)</option>
                  <option value="19:30">19:30 (Akşam)</option>
                  <option value="21:30">21:30 (Gece)</option>
                </select>
              </div>
            </div>

            <button 
              type="submit"
              class="w-full py-4 rounded-full bg-[#B87333] hover:bg-[#784000] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-lg active:scale-95 cursor-pointer">
              Rezervasyonu Onayla
            </button>
          </form>
        } @else {
          <!-- Confirmation Screen -->
          <div class="text-center space-y-4 py-4">
            <div class="w-16 h-16 rounded-full bg-[#526E48]/10 text-[#526E48] mx-auto flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 class="font-serif text-2xl font-bold text-[#1F1B14]">Rezervasyonunuz Alındı!</h4>
            <p class="text-xs text-[#434840]">
              Sayın <strong class="text-[#1F1B14]">{{ reservationService.lastReservation()?.name }}</strong>, 
              <strong>{{ reservationService.lastReservation()?.date }}</strong> tarihinde saat <strong>{{ reservationService.lastReservation()?.time }}</strong> için 
              <strong>{{ reservationService.lastReservation()?.guests }} kişilik</strong> masanız ayrılmıştır.
            </p>

            <div class="pt-4 flex flex-col gap-3">
              <a 
                href="https://share.google/P5BMtr0gzI00D3TQj" 
                target="_blank" 
                rel="noopener"
                class="w-full py-3 rounded-full bg-[#526E48] text-white text-xs font-semibold uppercase tracking-wider shadow-md text-center">
                Google Haritalar Yol Tarifi Al
              </a>
              <button 
                (click)="reservationService.closeModal()"
                class="w-full py-3 rounded-full bg-[#EDE4D8] text-[#1F1B14] text-xs font-semibold uppercase tracking-wider">
                Kapat
              </button>
            </div>
          </div>
        }

      </div>
    }
  `
})
export class ReservationModalComponent {
  public readonly reservationService = inject(ReservationService);

  public name = '';
  public phone = '';
  public guests = 2;
  public date = new Date().toISOString().split('T')[0];
  public time = '19:30';

  public onSubmit(): void {
    if (this.name && this.phone) {
      this.reservationService.submitReservation({
        name: this.name,
        phone: this.phone,
        guests: this.guests,
        date: this.date,
        time: this.time
      });
    }
  }
}
