import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (toastService.message()) {
      <div class="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-[#1F1B14]/90 backdrop-blur-md text-[#FFF8F2] text-xs font-semibold shadow-2xl border border-[#D6C9B6]/30 flex items-center gap-2.5 animate-bounce">
        <span class="w-2 h-2 rounded-full bg-[#526E48]"></span>
        <span>{{ toastService.message() }}</span>
      </div>
    }
  `
})
export class ToastComponent {
  public readonly toastService = inject(ToastService);
}
