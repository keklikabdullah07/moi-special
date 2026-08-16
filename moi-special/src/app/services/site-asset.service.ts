import { Injectable, signal } from '@angular/core';

export interface SiteAssetConfig {
  heroBakeryImage: string;
  croissantImage: string;
  entremetImage: string;
  storeAddress: string;
  storePhone: string;
  heroTitle: string;
}

const ASSET_CACHE_KEY = 'moi_site_assets_v1';

@Injectable({
  providedIn: 'root'
})
export class SiteAssetService {
  public readonly heroBakeryImage = signal<string>('assets/hero-bakery.jpg');
  public readonly croissantImage = signal<string>('assets/croissant.jpg');
  public readonly entremetImage = signal<string>('assets/entremet.jpg');
  public readonly storeAddress = signal<string>('Karşıyaka Mah. Gap Vadisi Bulvarı, Kanalboyu, 63000 Haliliye/Şanlıurfa');
  public readonly storePhone = signal<string>('0555 086 05 94');
  public readonly heroTitle = signal<string>('Mezopotamya Gün Işığında Artisan Fırın Sanatı');

  constructor() {
    this.loadCachedAssets();
  }

  private loadCachedAssets(): void {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(ASSET_CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.heroBakeryImage) this.heroBakeryImage.set(parsed.heroBakeryImage);
        if (parsed.croissantImage) this.croissantImage.set(parsed.croissantImage);
        if (parsed.entremetImage) this.entremetImage.set(parsed.entremetImage);
        if (parsed.storeAddress) this.storeAddress.set(parsed.storeAddress);
        if (parsed.storePhone) this.storePhone.set(parsed.storePhone);
        if (parsed.heroTitle) this.heroTitle.set(parsed.heroTitle);
      }
    } catch (e) {}
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

  public updateEntremetImage(url: string): void {
    if (!url) return;
    this.entremetImage.set(url);
    this.saveAssets();
  }

  public updateStoreAddress(address: string): void {
    if (!address) return;
    this.storeAddress.set(address);
    this.saveAssets();
  }

  public updateStorePhone(phone: string): void {
    if (!phone) return;
    this.storePhone.set(phone);
    this.saveAssets();
  }

  public updateHeroTitle(title: string): void {
    if (!title) return;
    this.heroTitle.set(title);
    this.saveAssets();
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
        heroTitle: this.heroTitle()
      }));
    } catch (e) {}
  }
}
