import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErpModalService {
  public readonly isErpOpen = signal<boolean>(false);

  public open(): void {
    this.isErpOpen.set(true);
  }

  public close(): void {
    this.isErpOpen.set(false);
  }

  public toggle(): void {
    this.isErpOpen.update(v => !v);
  }
}
