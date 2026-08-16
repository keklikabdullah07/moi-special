import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public readonly message = signal<string | null>(null);

  public show(msg: string, durationMs: number = 2500): void {
    this.message.set(msg);
    setTimeout(() => {
      if (this.message() === msg) {
        this.message.set(null);
      }
    }, durationMs);
  }
}
