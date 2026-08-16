import { Injectable, signal } from '@angular/core';

export interface ReservationData {
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  public readonly isModalOpen = signal<boolean>(false);
  public readonly isSubmitted = signal<boolean>(false);
  public readonly lastReservation = signal<ReservationData | null>(null);

  public openModal(): void {
    this.isSubmitted.set(false);
    this.isModalOpen.set(true);
  }

  public closeModal(): void {
    this.isModalOpen.set(false);
  }

  public submitReservation(data: ReservationData): void {
    this.lastReservation.set(data);
    this.isSubmitted.set(true);
  }
}
