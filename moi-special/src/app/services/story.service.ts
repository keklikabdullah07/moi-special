import { Injectable, signal } from '@angular/core';

export interface StoryItem {
  id: string;
  title: string;
  image: string;
  timestamp: string;
  caption: string;
}

export interface StoryGroup {
  id: string;
  name: string;
  avatar: string;
  hasUnread: boolean;
  stories: StoryItem[];
}

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  public readonly activeGroup = signal<StoryGroup | null>(null);
  public readonly activeStoryIndex = signal<number>(0);
  public readonly isViewerOpen = signal<boolean>(false);
  public readonly isAdminAddOpen = signal<boolean>(false);

  public readonly storyGroups = signal<StoryGroup[]>([
    {
      id: 'fistikli',
      name: 'Fıstıklı Kroissant',
      avatar: 'assets/croissant.jpg',
      hasUnread: true,
      stories: [
        {
          id: 's1',
          title: 'Fransız Tereyağlı Hamur',
          image: 'assets/croissant.jpg',
          timestamp: '2 saat önce',
          caption: 'Her sabah 06:00\'da taş fırınımızda kat kat açılan saf tereyağlı kruvasanlarımız.'
        },
        {
          id: 's2',
          title: 'Boz Antep Fıstığı Kreması',
          image: 'assets/croissant.jpg',
          timestamp: '1 saat önce',
          caption: 'İçinde %100 doğal Şanlıurfa & Antep boz fıstığı dolgusu ile hazırlanıyor.'
        }
      ]
    },
    {
      id: 'entremet',
      name: 'Günün Pastası',
      avatar: 'assets/entremet.jpg',
      hasUnread: true,
      stories: [
        {
          id: 's3',
          title: 'Moi Special Entremet',
          image: 'assets/entremet.jpg',
          timestamp: '3 saat önce',
          caption: '24K yenilebilir altın yaprakları ve zümrüt fıstık glazürü ile şefin imzası.'
        }
      ]
    },
    {
      id: 'firin',
      name: 'Taş Fırından',
      avatar: 'assets/hero-bakery.jpg',
      hasUnread: false,
      stories: [
        {
          id: 's4',
          title: 'Ekşi Maya Ekmekler',
          image: 'assets/hero-bakery.jpg',
          timestamp: '4 saat önce',
          caption: '72 saat soğuk fermentasyon geçiren geleneksel odun fırını lezzeti.'
        }
      ]
    }
  ]);

  public openGroup(group: StoryGroup, index: number = 0): void {
    this.activeGroup.set(group);
    this.activeStoryIndex.set(index);
    this.isViewerOpen.set(true);

    // Mark as read
    this.storyGroups.update(groups =>
      groups.map(g => g.id === group.id ? { ...g, hasUnread: false } : g)
    );
  }

  public closeViewer(): void {
    this.isViewerOpen.set(false);
    this.activeGroup.set(null);
  }

  public nextStory(): void {
    const group = this.activeGroup();
    if (!group) return;

    if (this.activeStoryIndex() < group.stories.length - 1) {
      this.activeStoryIndex.update(i => i + 1);
    } else {
      // Find next group
      const groups = this.storyGroups();
      const currentIdx = groups.findIndex(g => g.id === group.id);
      if (currentIdx > -1 && currentIdx < groups.length - 1) {
        this.openGroup(groups[currentIdx + 1], 0);
      } else {
        this.closeViewer();
      }
    }
  }

  public prevStory(): void {
    if (this.activeStoryIndex() > 0) {
      this.activeStoryIndex.update(i => i - 1);
    }
  }

  public addStory(groupName: string, title: string, caption: string, imageUrl: string): void {
    const newStory: StoryItem = {
      id: 's_' + Date.now(),
      title,
      image: imageUrl || 'assets/croissant.jpg',
      timestamp: 'Şimdi',
      caption
    };

    this.storyGroups.update(groups => {
      const existing = groups.find(g => g.name.toLowerCase() === groupName.toLowerCase());
      if (existing) {
        return groups.map(g => g.id === existing.id ? {
          ...g,
          hasUnread: true,
          stories: [newStory, ...g.stories]
        } : g);
      } else {
        const newGrp: StoryGroup = {
          id: 'grp_' + Date.now(),
          name: groupName,
          avatar: imageUrl || 'assets/croissant.jpg',
          hasUnread: true,
          stories: [newStory]
        };
        return [newGrp, ...groups];
      }
    });
    this.isAdminAddOpen.set(false);
  }
}
