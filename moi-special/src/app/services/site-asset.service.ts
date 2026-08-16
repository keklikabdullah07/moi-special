import { Injectable, signal } from '@angular/core';

export interface SiteAssetConfig {
  heroBakeryImage: string;
  croissantImage: string;
  entremetImage: string;
  storeAddress: string;
  storePhone: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutBody: string;
}

const ASSET_CACHE_KEY = 'moi_site_assets_v2';

@Injectable({
  providedIn: 'root'
})
export class SiteAssetService {
  // Live Builder Mode Signals
  public readonly isEditMode = signal<boolean>(false);
  public readonly activeSectionEditing = signal<'hero' | 'menu' | 'about' | 'contact' | null>(null);

  // Dynamic Site Copy & Assets Signals
  public readonly heroBakeryImage = signal<string>('assets/hero-bakery.jpg');
  public readonly croissantImage = signal<string>('assets/croissant.jpg');
  public readonly entremetImage = signal<string>('assets/entremet.jpg');
  public readonly storeAddress = signal<string>('Karşıyaka Mah. Gap Vadisi Bulvarı, Kanalboyu, 63000 Haliliye/Şanlıurfa');
  public readonly storePhone = signal<string>('0555 086 05 94');

  public readonly heroEyebrow = signal<string>('Sırrın Karşıyaka, Şanlıurfa • Modern Artisan Pastane & Fırın');
  public readonly heroHeadline = signal<string>('Mezopotamya Gün Işığında Artisan Fırın Sanatı');
  public readonly heroSubtitle = signal<string>('Tarihi Şanlıurfa taş fırın kültürünün geleneksel ustalığı, Fransız patisserie inceliği ve zümrüt Antep fıstığının en eşsiz haliyle buluşuyor. Günlük taze pişen lezzetlerimizi keşfedin.');

  public readonly aboutTitle = signal<string>('Tarihi Taş Fırın Kültürü, Fransız Zarafetiyle Buluşuyor');
  public readonly aboutBody = signal<string>('Móí Special, Şanlıurfa\'nın köklü taş fırın geleneğini modern Fransız patisserie ustalığı ile harmanlayarak doğdu. Sırrın Karşıyaka / Gap Vadisi Bulvarı şubemizde her sabah gün ışımadan başlayan pişirim yolculuğumuzda, katkısız saf tereyağı ve bölgenin en seçkin zümrüt Antep fıstıkları kullanılır.');

  constructor() {
    this.loadCachedAssets();
  }

  private loadCachedAssets(): void {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(ASSET_CACHE_KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p.heroBakeryImage) this.heroBakeryImage.set(p.heroBakeryImage);
        if (p.croissantImage) this.croissantImage.set(p.croissantImage);
        if (p.entremetImage) this.entremetImage.set(p.entremetImage);
        if (p.storeAddress) this.storeAddress.set(p.storeAddress);
        if (p.storePhone) this.storePhone.set(p.storePhone);
        if (p.heroEyebrow) this.heroEyebrow.set(p.heroEyebrow);
        if (p.heroHeadline) this.heroHeadline.set(p.heroHeadline);
        if (p.heroSubtitle) this.heroSubtitle.set(p.heroSubtitle);
        if (p.aboutTitle) this.aboutTitle.set(p.aboutTitle);
        if (p.aboutBody) this.aboutBody.set(p.aboutBody);
      }
    } catch (e) {}
  }

  public updateHeroSection(eyebrow: string, headline: string, subtitle: string, image: string): void {
    if (eyebrow) this.heroEyebrow.set(eyebrow);
    if (headline) this.heroHeadline.set(headline);
    if (subtitle) this.heroSubtitle.set(subtitle);
    if (image) this.croissantImage.set(image);
    this.saveAssets();
  }

  public updateAboutSection(title: string, body: string, image: string): void {
    if (title) this.aboutTitle.set(title);
    if (body) this.aboutBody.set(body);
    if (image) this.heroBakeryImage.set(image);
    this.saveAssets();
  }

  public updateContactSection(address: string, phone: string): void {
    if (address) this.storeAddress.set(address);
    if (phone) this.storePhone.set(phone);
    this.saveAssets();
  }

  public toggleEditMode(): void {
    this.isEditMode.update(v => !v);
  }

  public openSectionEditor(section: 'hero' | 'menu' | 'about' | 'contact'): void {
    this.activeSectionEditing.set(section);
  }

  public closeSectionEditor(): void {
    this.activeSectionEditing.set(null);
  }

  private saveAssets(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(ASSET_CACHE_KEY, JSON.stringify({
        heroBakeryImage: this.heroBakeryImage(),
        croissantImage: this.croissantImage(),
        entremetImage: this.entremetImage(),
        storeAddress: this.storeAddress(),
        storePhone: this.storePhone(),
        heroEyebrow: this.heroEyebrow(),
        heroHeadline: this.heroHeadline(),
        heroSubtitle: this.heroSubtitle(),
        aboutTitle: this.aboutTitle(),
        aboutBody: this.aboutBody()
      }));
    } catch (e) {}
  }
}
