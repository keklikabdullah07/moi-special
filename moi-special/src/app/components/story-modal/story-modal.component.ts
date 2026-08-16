import { Component, inject, signal, effect, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoryService } from '../../services/story.service';

@Component({
  selector: 'app-story-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <!-- FULL-SCREEN INSTAGRAM STORY VIEWER -->
    @if (storyService.isViewerOpen() && currentStory()) {
      <div class="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between max-w-md mx-auto select-none overflow-hidden shadow-2xl">
        
        <!-- Story Progress Bars Top Bar -->
        <div class="relative z-20 pt-3 px-3 space-y-3 bg-gradient-to-b from-black/80 to-transparent pb-6">
          <div class="flex items-center gap-1.5 w-full">
            @for (s of currentGroup()?.stories; track s.id; let idx = $index) {
              <div class="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                <div 
                  [class.w-full]="idx < storyService.activeStoryIndex()"
                  [class.animate-progress]="idx === storyService.activeStoryIndex()"
                  [class.w-0]="idx > storyService.activeStoryIndex()"
                  class="h-full bg-white transition-all duration-100">
                </div>
              </div>
            }
          </div>

          <!-- Header User Info -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <img [src]="currentGroup()?.avatar" alt="Avatar" class="w-9 h-9 rounded-full border-2 border-[#526E48] object-cover" />
              <div class="flex flex-col">
                <span class="font-serif font-bold text-xs text-white tracking-wide">Moi Special Patisserie</span>
                <span class="text-[10px] text-white/70">{{ currentStory()?.timestamp }}</span>
              </div>
            </div>

            <!-- Close Button -->
            <button 
              (click)="storyService.closeViewer()"
              class="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Center Story Image Container -->
        <div class="relative flex-1 flex items-center justify-center bg-black overflow-hidden">
          <img 
            [src]="currentStory()?.image" 
            [alt]="currentStory()?.title" 
            class="w-full h-full object-cover max-h-[80vh]" />

          <!-- Left / Right Tap Controls -->
          <div 
            (click)="storyService.prevStory()" 
            class="absolute left-0 top-0 w-1/3 h-full z-10 cursor-pointer">
          </div>
          <div 
            (click)="storyService.nextStory()" 
            class="absolute right-0 top-0 w-2/3 h-full z-10 cursor-pointer">
          </div>
        </div>

        <!-- Bottom Story Caption & Interaction Bar -->
        <div class="relative z-20 p-5 bg-gradient-to-t from-black via-black/80 to-transparent space-y-3">
          <span class="inline-block label-caps text-[9px] bg-[#B87333] text-white px-2.5 py-0.5 rounded-full">
            {{ currentStory()?.title }}
          </span>
          <p class="font-sans text-xs text-white/90 leading-relaxed">
            {{ currentStory()?.caption }}
          </p>

          <div class="pt-2 flex items-center gap-3">
            <a 
              href="https://share.google/P5BMtr0gzI00D3TQj" 
              target="_blank" 
              rel="noopener"
              class="flex-1 py-3 rounded-full bg-[#526E48] hover:bg-[#3B5532] text-white text-xs font-semibold uppercase tracking-wider text-center shadow-lg active:scale-95 transition-transform">
              📍 Haritada Yol Tarifi Al
            </a>
          </div>
        </div>

      </div>
    }

    <!-- ADMIN STORY ADD MODAL FOR BUSINESS OWNER -->
    @if (storyService.isAdminAddOpen()) {
      <div 
        (click)="storyService.isAdminAddOpen.set(false)"
        class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        
        <div 
          (click)="$event.stopPropagation()"
          class="w-full max-w-md bg-[#FFF8F2] border border-[#D6C9B6] rounded-3xl p-6 space-y-5 shadow-2xl">
          
          <div class="flex items-center justify-between border-b border-[#D6C9B6] pb-3">
            <h3 class="font-serif text-lg font-bold text-[#1F1B14]">Günlük Hikaye Paylaş</h3>
            <button (click)="storyService.isAdminAddOpen.set(false)" class="text-[#1F1B14] hover:text-[#B87333]">✕</button>
          </div>

          <form (ngSubmit)="onAddStorySubmit()" class="space-y-4">
            <div>
              <label class="block label-caps text-[10px] text-[#434840] mb-1">Kategori / Başlık</label>
              <input 
                type="text" 
                [(ngModel)]="groupName" 
                name="groupName" 
                required 
                placeholder="Örn. Günün Taze Çıkaranı"
                class="w-full px-4 py-2.5 rounded-xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14]" />
            </div>

            <div>
              <label class="block label-caps text-[10px] text-[#434840] mb-1">Hikaye Başlığı</label>
              <input 
                type="text" 
                [(ngModel)]="title" 
                name="title" 
                required 
                placeholder="Örn. Sıcak Taş Fırın Ekmeği"
                class="w-full px-4 py-2.5 rounded-xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14]" />
            </div>

            <div>
              <label class="block label-caps text-[10px] text-[#434840] mb-1">Açıklama</label>
              <textarea 
                [(ngModel)]="caption" 
                name="caption" 
                rows="2"
                placeholder="Örn. 72 saat dinlendirilmiş ekşi mayamız taş fırında pişti."
                class="w-full px-4 py-2.5 rounded-xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14]"></textarea>
            </div>

            <div>
              <label class="block label-caps text-[10px] text-[#434840] mb-1">Görsel URL (İsteğe Bağlı)</label>
              <input 
                type="text" 
                [(ngModel)]="imageUrl" 
                name="imageUrl" 
                placeholder="assets/croissant.jpg"
                class="w-full px-4 py-2.5 rounded-xl bg-[#EDE4D8]/50 border border-[#D6C9B6] text-xs text-[#1F1B14]" />
            </div>

            <button 
              type="submit"
              class="w-full py-3 rounded-full bg-[#B87333] hover:bg-[#784000] text-white font-semibold text-xs uppercase tracking-wider shadow-md">
              Hikayeyi Yayınla 🚀
            </button>
          </form>

        </div>
      </div>
    }
  `
})
export class StoryModalComponent implements OnDestroy {
  public readonly storyService = inject(StoryService);

  public groupName = 'Günün Tazesi';
  public title = 'Sıcak Çıkarım';
  public caption = 'Taş fırınımızdan yeni çıktı!';
  public imageUrl = 'assets/croissant.jpg';

  private timer: any = null;

  constructor() {
    effect(() => {
      if (this.storyService.isViewerOpen()) {
        this.startAutoTimer();
      } else {
        this.clearTimer();
      }
    });
  }

  public currentGroup() {
    return this.storyService.activeGroup();
  }

  public currentStory() {
    const group = this.currentGroup();
    if (!group) return null;
    return group.stories[this.storyService.activeStoryIndex()] || null;
  }

  public startAutoTimer(): void {
    this.clearTimer();
    this.timer = setTimeout(() => {
      this.storyService.nextStory();
    }, 5000);
  }

  public clearTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public onAddStorySubmit(): void {
    if (this.groupName && this.title) {
      this.storyService.addStory(this.groupName, this.title, this.caption, this.imageUrl);
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }
}
