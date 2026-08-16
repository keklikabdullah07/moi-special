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
  brandName: string;
  navHome: string;
  navMenu: string;
  navStory: string;
  navContact: string;
  workingHours: string;
  footerCopyright: string;
}

const ASSET_CACHE_KEY = 'moi_site_assets_v4';

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
    aboutBody: 'Móí Special, Şanlıurfa\'nın köklü taş fırın geleneğini modern Fransız patisserie ustalığı ile harmanlayarak doğdu. Sırrın Karşıyaka / Gap Vadisi Bulvarı şubemizde her sabah gün ışımadan başlayan pişirim yolculuğumuzda, katkısız saf tereyağı ve bölgenin en seçkin zümrüt Antep fıstıkları kullanılır.',
    brandName: 'Móí Special',
    navHome: 'Ana Sayfa',
    navMenu: 'Menü Koleksiyonu',
    navStory: 'Hikayemiz',
    navContact: 'İletişim',
    workingHours: 'Haftanın 7 Günü: 07:00 - 00:00',
    footerCopyright: '© 2026 Móí Special. Tüm Hakları Saklıdır.'
  };

  // WebCMS Builder Mode Signals
  public readonly isEditMode = signal<boolean>(false);
  public readonly activeSectionEditing = signal<'hero' | 'menu' | 'about' | 'contact' | 'header' | 'footer' | null>(null);

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

  public readonly brandName = signal<string>(this.MASTER_DEFAULT_TEMPLATE.brandName);
  public readonly navHome = signal<string>(this.MASTER_DEFAULT_TEMPLATE.navHome);
  public readonly navMenu = signal<string>(this.MASTER_DEFAULT_TEMPLATE.navMenu);
  public readonly navStory = signal<string>(this.MASTER_DEFAULT_TEMPLATE.navStory);
  public readonly navContact = signal<string>(this.MASTER_DEFAULT_TEMPLATE.navContact);

  public readonly workingHours = signal<string>(this.MASTER_DEFAULT_TEMPLATE.workingHours);
  public readonly footerCopyright = signal<string>(this.MASTER_DEFAULT_TEMPLATE.footerCopyright);

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
        if (p.brandName) this.brandName.set(p.brandName);
        if (p.navHome) this.navHome.set(p.navHome);
        if (p.navMenu) this.navMenu.set(p.navMenu);
        if (p.navStory) this.navStory.set(p.navStory);
        if (p.navContact) this.navContact.set(p.navContact);
        if (p.workingHours) this.workingHours.set(p.workingHours);
        if (p.footerCopyright) this.footerCopyright.set(p.footerCopyright);
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
    this.brandName.set(this.MASTER_DEFAULT_TEMPLATE.brandName);
    this.navHome.set(this.MASTER_DEFAULT_TEMPLATE.navHome);
    this.navMenu.set(this.MASTER_DEFAULT_TEMPLATE.navMenu);
    this.navStory.set(this.MASTER_DEFAULT_TEMPLATE.navStory);
    this.navContact.set(this.MASTER_DEFAULT_TEMPLATE.navContact);
    this.workingHours.set(this.MASTER_DEFAULT_TEMPLATE.workingHours);
    this.footerCopyright.set(this.MASTER_DEFAULT_TEMPLATE.footerCopyright);
    this.saveAssets();
  }

  public updateHeaderSection(brand: string, home: string, menu: string, story: string, contact: string): void {
    if (brand) this.brandName.set(brand);
    if (home) this.navHome.set(home);
    if (menu) this.navMenu.set(menu);
    if (story) this.navStory.set(story);
    if (contact) this.navContact.set(contact);
    this.saveAssets();
  }

  public updateFooterSection(hours: string, address: string, phone: string, copyright: string): void {
    if (hours) this.workingHours.set(hours);
    if (address) this.storeAddress.set(address);
    if (phone) this.storePhone.set(phone);
    if (copyright) this.footerCopyright.set(copyright);
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

  public openSectionEditor(section: 'hero' | 'menu' | 'about' | 'contact' | 'header' | 'footer'): void {
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
        aboutBody: this.aboutBody(),
        brandName: this.brandName(),
        navHome: this.navHome(),
        navMenu: this.navMenu(),
        navStory: this.navStory(),
        navContact: this.navContact(),
        workingHours: this.workingHours(),
        footerCopyright: this.footerCopyright()
      }));
    } catch (e) {}
  }
}
