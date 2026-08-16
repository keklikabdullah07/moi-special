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

const ASSET_CACHE_KEY = 'moi_site_assets_v3';

@Injectable({
  providedIn: 'root'
})
export class SiteAssetService {
  // IMMUTABLE MASTER TEMPLATE DRAFT BACKUP
  private readonly MASTER_DEFAULT_TEMPLATE: SiteAssetConfig = {
    heroBakeryImage: 'assets/hero-bakery.jpg',
    croissantImage: 'assets/croissant.jpg',
    entremetImage: 'assets/entremet.jpg',
    storeAddress: 'Karşıyaka Mah. Gap Vadisi Bulvarı, Kanalboyu, 63000 Haliliye/Şanlıurfa',
    storePhone: '0555 086 05 94',
    heroEyebrow: 'Sırrın Karşıyaka, Şanlıurfa • Modern Artisan Pastane & Fırın',
    heroHeadline: 'Mezopotamya Gün Işığında Artisan Fırın Sanatı',
    heroSubtitle: 'Tarihi Şanlıurfa taş fırın kültürünün geleneksel ustalığı, Fransız patisserie inceliği ve zümrüt Antep fıstığının en eşsiz haliyle buluşuyor. Günlük taze pişen lezzetlerimizi keşfedin.',
    aboutTitle: 'Tarihi Taş Fırın Kültürü, Fransız Zarafetiyle Buluşuyor',
    aboutBody: 'Móí Special, Şanlıurfa\'nın köklü taş fırın geleneğini modern Fransız patisserie ustalığı ile harmanlayarak doğdu. Sırrın Karşıyaka / Gap Vadisi Bulvarı şubemizde her sabah gün ışımadan başlayan pişirim yolculuğumuzda, katkısız saf tereyağı ve bölgenin en seçkin zümrüt Antep fıstıkları kullanılır.'
  };

  // Live Builder Mode Signals
  public readonly isEditMode = signal<boolean>(false);
  public readonly activeSectionEditing = signal<'hero' | 'menu' | 'about' | 'contact' | null>(null);

  // Dynamic Site Copy & Assets Signals
  public readonly heroBakeryImage = signal<string>(this.MASTER_DEFAULT_TEMPLATE.heroBakeryImage);
  public readonly croissantImage = signal<string>(this.MASTER_DEFAULT_TEMPLATE.croissantImage);
  public readonly entremetImage = signal<string>(this.MASTER_DEFAULT_TEMPLATE.entremetImage);
  public readonly storeAddress = signal<string>(this.MASTER_DEFAULT_TEMPLATE.storeAddress);
  public readonly storePhone = signal<string>(this.MASTER_DEFAULT_TEMPLATE.storePhone);

  public readonly heroEyebrow = signal<string>(this.MASTER_DEFAULT_TEMPLATE.heroEyebrow);
  public readonly heroHeadline = signal<string>(this.MASTER_DEFAULT_TEMPLATE.heroHeadline);
  public readonly heroSubtitle = signal<string>(this.MASTER_DEFAULT_TEMPLATE.heroSubtitle);

  public readonly aboutTitle = signal<string>(this.MASTER_DEFAULT_TEMPLATE.aboutTitle);
  public readonly aboutBody = signal<string>(this.MASTER_DEFAULT_TEMPLATE.aboutBody);

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

  public resetToMasterTemplate(): void {
    this.heroBakeryImage.set(this.MASTER_DEFAULT_TEMPLATE.heroBakeryImage);
    this.croissantImage.set(this.MASTER_DEFAULT_TEMPLATE.croissantImage);
    this.entremetImage.set(this.MASTER_DEFAULT_TEMPLATE.entremetImage);
    this.storeAddress.set(this.MASTER_DEFAULT_TEMPLATE.storeAddress);
    this.storePhone.set(this.MASTER_DEFAULT_TEMPLATE.storePhone);
    this.heroEyebrow.set(this.MASTER_DEFAULT_TEMPLATE.heroEyebrow);
    this.heroHeadline.set(this.MASTER_DEFAULT_TEMPLATE.heroHeadline);
    this.heroSubtitle.set(this.MASTER_DEFAULT_TEMPLATE.heroSubtitle);
    this.aboutTitle.set(this.MASTER_DEFAULT_TEMPLATE.aboutTitle);
    this.aboutBody.set(this.MASTER_DEFAULT_TEMPLATE.aboutBody);
    this.saveAssets();
  }

  public updateHeroImage(url: string): void {
    if (!url) return;
    this.heroBakeryImage.set(url);
    this.saveAssets();
  }

  public updateCroissantImage(url: string): void {
    if (!url) return;
    this.croissantImage.set(url);
    this.saveAssets();
  }

  public updateStoreAddress(address: string): void {
    if (!address) return;
    this.storeAddress.set(address);
    this.saveAssets();
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
