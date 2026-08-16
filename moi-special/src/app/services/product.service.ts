import { Injectable, signal } from '@angular/core';
import { Category, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public readonly categories = signal<Category[]>([
    { id: 'all', name: 'Tüm Ürünler', description: 'Moi Special seçkin lezzet koleksiyonu' },
    { id: 'fistikli', name: 'Fıstıklı Özel', description: 'Antep fıstığının en gurme hali' },
    { id: 'pastane', name: 'Artisan Pastane', description: 'Günlük taze Fransız & Mezopotamya entremetleri' },
    { id: 'firin', name: 'Taş Fırın & Ekmek', description: 'Odun ateşinde pişen ekşi mayalı özel ekmekler' },
    { id: 'icecek', name: 'Gurme İçecekler', description: 'Özel harman nitelikli kahveler ve özel içecekler' }
  ]);

  public readonly products = signal<Product[]>([
    {
      id: 'fistikli-croissant',
      name: 'Antep Fıstıklı Artisan Croissant',
      category: 'fistikli',
      description: 'Kat kat Fransız tereyağlı çıtır hamur, içi bol Antep fıstığı kreması ve üzeri zümrüt fıstık taneleri ile.',
      price: 185,
      imageUrl: 'assets/croissant.jpg',
      isSpecialty: true,
      tags: ['Gurme Seçim', 'Günlük Taze', 'Fıstıklı'],
      isAvailable: true
    },
    {
      id: 'pistachio-entremet',
      name: 'Moi Special Fıstıklı Entremet',
      category: 'pastane',
      description: 'Ayna parlaklığında zümrüt fıstık glazürü, taze ahududular ve 24K yenilebilir altın yaprakları ile kaplı lüks pasta.',
      price: 480,
      imageUrl: 'assets/entremet.jpg',
      isSpecialty: true,
      tags: ['Lüks İmza', 'Taze Ahududu', 'Glazür'],
      isAvailable: true
    },
    {
      id: 'urfa-sourdough',
      name: 'Mezopotamya Taş Fırın Ekmeği',
      category: 'firin',
      description: '72 saat soğuk fermentasyon geçiren, geleneksel Urfa odun fırınında pişen çıtır kabuklu ekşi maya ekmeği.',
      price: 95,
      imageUrl: 'assets/hero-bakery.jpg',
      isSpecialty: false,
      tags: ['Ekşi Maya', 'Odun Ateşi'],
      isAvailable: true
    },
    {
      id: 'raspberry-tartlet',
      name: 'Taze Ahududulu & Çikolatalı Tartlet',
      category: 'pastane',
      description: 'Çıtır bisküvi tabanı, Valrhona çikolatalı ganaj ve dalından taze ahududular.',
      price: 240,
      imageUrl: 'assets/entremet.jpg',
      isSpecialty: false,
      tags: ['Günlük Taze', 'Çikolata'],
      isAvailable: true
    },
    {
      id: 'pistachio-latte',
      name: 'Antep Fıstığı Kremalı Specialty Latte',
      category: 'icecek',
      description: 'Taze çekilmiş nitelikli espresso, kadifemsi süt ve ev yapımı Antep fıstığı püresi pralini.',
      price: 165,
      imageUrl: 'assets/croissant.jpg',
      isSpecialty: true,
      tags: ['Nitelikli Kahve', 'Özel Harman'],
      isAvailable: true
    },
    {
      id: 'saffron-baklava-cake',
      name: 'Safranlı & Fıstıklı Baklava Pastası',
      category: 'fistikli',
      description: 'Geleneksel Şanlıurfa baklava yufkası ile harmanlanmış safranlı krema ve boz fıstık katmanları.',
      price: 520,
      imageUrl: 'assets/entremet.jpg',
      isSpecialty: true,
      tags: ['Şanlıurfa Özel', 'Geleneksel & Modern'],
      isAvailable: true
    }
  ]);
}
