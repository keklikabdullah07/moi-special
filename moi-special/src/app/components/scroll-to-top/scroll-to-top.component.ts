import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isVisible()) {
      <div class="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-50 animate-fadeInUp">
        <button
          (click)="scrollToTop()"
          title="Sayfanın En Üstüne Çık"
          aria-label="Yukarı Çık"
          class="group relative p-3 sm:p-4 rounded-full bg-[#B87333] hover:bg-[#784000] text-white shadow-2xl border-2 border-[#FFF8F2] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center">
          
          <!-- Ambient Gold Glow Pulse -->
          <span class="absolute inset-0 rounded-full bg-[#B87333]/30 animate-ping pointer-events-none"></span>

          <!-- Sharp SVG Up Chevron Arrow -->
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:-translate-y-1 transition-transform duration-300 relative z-10" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7" />
          </svg>

          <!-- Floating Tooltip Badge on Hover -->
          <span class="hidden sm:block absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-[#1F1B14] text-[#FFF8F2] text-[10px] font-bold uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl border border-[#B87333]/40 pointer-events-none">
            Yukarı Çık
          </span>
        </button>
      </div>
    }
  `
})
export class ScrollToTopComponent {
  public readonly isVisible = signal<boolean>(false);

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (typeof window !== 'undefined') {
      this.isVisible.set(window.scrollY > 300);
    }
  }

  public scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
