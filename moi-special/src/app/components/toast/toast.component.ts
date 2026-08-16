import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- LUXURY BAKERY & CAFÉ ALERT STACK (Top Right Desktop / Top Center Mobile) -->
    <div class="fixed top-20 sm:top-24 right-4 sm:right-6 left-4 sm:left-auto z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full">
      @for (toast of toastService.activeToasts(); track toast.id) {
        
        <div 
          class="pointer-events-auto relative overflow-hidden rounded-2xl p-4 bg-[#FFF8F2]/95 backdrop-blur-xl border shadow-2xl transition-all duration-500 animate-slideInRight flex items-start gap-3.5 group"
          [class.border-[#B87333]]="toast.type === 'admin'"
          [class.border-[#526E48]]="toast.type === 'bakery'"
          [class.border-[#D97706]]="toast.type === 'cart'"
          [class.border-[#D6C9B6]]="toast.type === 'success' || toast.type === 'warning'">
          
          <!-- Ambient Glow Blob inside Toast -->
          <div 
            [class.bg-[#B87333]/20]="toast.type === 'admin'"
            [class.bg-[#CFEFC0]/30]="toast.type === 'bakery'"
            [class.bg-[#FFDCC2]/40]="toast.type === 'cart'"
            class="absolute -top-6 -left-6 w-20 h-20 rounded-full blur-xl pointer-events-none">
          </div>

          <!-- Icon Badge Emblem -->
          <div 
            [class.bg-[#B87333]]="toast.type === 'admin'"
            [class.bg-[#526E48]]="toast.type === 'bakery'"
            [class.bg-[#D97706]]="toast.type === 'cart'"
            [class.bg-[#434840]]="toast.type === 'success' || toast.type === 'warning'"
            class="w-10 h-10 rounded-xl text-white text-lg font-serif font-bold flex items-center justify-center shrink-0 shadow-md transform group-hover:scale-110 transition-transform">
            {{ toast.icon }}
          </div>

          <!-- Alert Text Body -->
          <div class="flex-1 space-y-0.5 pr-4">
            <div class="flex items-center justify-between">
              <span 
                [class.text-[#B87333]]="toast.type === 'admin'"
                [class.text-[#3B5532]]="toast.type === 'bakery'"
                [class.text-[#D97706]]="toast.type === 'cart'"
                [class.text-[#434840]]="toast.type === 'success' || toast.type === 'warning'"
                class="label-caps text-[9px] font-bold tracking-wider">
                {{ toast.title }}
              </span>
            </div>

            <p class="font-sans text-xs text-[#1F1B14] font-medium leading-snug">
              {{ toast.message }}
            </p>
          </div>

          <!-- Dismiss Close Button -->
          <button 
            (click)="toastService.dismiss(toast.id)"
            class="w-6 h-6 rounded-full bg-[#EDE4D8] text-[#1F1B14] hover:bg-[#D6C9B6] flex items-center justify-center text-xs transition-colors cursor-pointer shrink-0">
            ✕
          </button>

          <!-- Bottom Progress Timer Bar -->
          <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EDE4D8]/60 overflow-hidden">
            <div 
              [class.bg-[#B87333]]="toast.type === 'admin'"
              [class.bg-[#526E48]]="toast.type === 'bakery'"
              [class.bg-[#D97706]]="toast.type === 'cart'"
              [class.bg-[#434840]]="toast.type === 'success' || toast.type === 'warning'"
              class="h-full animate-toastProgress">
            </div>
          </div>

        </div>

      }
    </div>
  `
})
export class ToastComponent {
  public readonly toastService = inject(ToastService);
}
