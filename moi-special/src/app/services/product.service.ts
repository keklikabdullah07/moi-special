import { Injectable, signal, computed } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'fistikli' | 'pastane' | 'firin' | 'icecek';
  imageUrl: string;
  tags: string[];
  isSpecialty?: boolean;
}

const PRODUCTS_CACHE_KEY = 'moi_products_v3';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly defaultProducts: Product[] = [
    {
      id: 'p1',
      name: 'Antep Fıstıklı Artisan Croissant',
      description: '84 katman saf Fransız tereyağlı hamur, içi ve üzeri taze çekilmiş zümrüt Boz Antep fıstığı kreması.',
      price: 185,
      category: 'fistikli',
      imageUrl: 'assets/croissant.jpg',
      tags: ['Çok Satan', 'Zümrüt Fıstık'],
      isSpecialty: true
    },
    {
      id: 'p2',
      name: 'Móí Special Fıstıklı Entremet',
      description: 'Zümrüt fıstık pralini, valrhona çikolata mousse ve katmanlı fıstık kek tabanı.',
      price: 480,
      category: 'pastane',
      imageUrl: 'assets/entremet.jpg',
      tags: ['İmza Lezzet', 'Şefin Seçimi'],
      isSpecialty: true
    },
    {
      id: 'p3',
      name: 'Safranlı & Fıstıklı Baklava Pastası',
      description: 'Çıtır baklava yufkaları arasında safranlı özel pastacı kreması ve bol Antep fıstığı içi.',
      price: 520,
      category: 'fistikli',
      imageUrl: 'assets/croissant.jpg',
      tags: ['Özel Üretim'],
      isSpecialty: true
    },
    {
      id: 'p4',
      name: 'Mezopotamya Taş Fırın Ekmeği',
      description: '72 saat soğuk fermentasyon geçiren ekşi mayalı, odun ateşinde pişmiş geleneksel ekmek.',
      price: 95,
      category: 'firin',
      imageUrl: 'assets/hero-bakery.jpg',
      tags: ['Ekşi Maya', 'Odun Ateşi']
    },
    {
      id: 'p5',
      name: 'Antep Fıstığı Kremalı Specialty Latte',
      description: '%100 Arabica çekirdekleri, ev yapımı Boz Antep fıstığı ezmesi ve kadifemsi süt köpüğü.',
      price: 165,
      category: 'icecek',
      imageUrl: 'assets/croissant.jpg',
      tags: ['Sıcak İçecek']
    },
    {
      id: 'p6',
      name: 'Taze Meyveli Tartlet Koleksiyonu',
      description: 'Çıtır tart hamuru üzerinde mevsim meyveleri ve saf vanilyalı pastacı kreması.',
      price: 210,
      category: 'pastane',
      imageUrl: 'assets/entremet.jpg',
      tags: ['Günlük Taze']
    }
  ];

  public readonly products = signal<Product[]>(this.loadInitialProducts());
  public readonly selectedCategory = signal<string>('all');
  public readonly editingProduct = signal<Product | null>(null);

  public readonly filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const list = this.products();
    if (category === 'all') return list;
    return list.filter(p => p.category === category);
  });

  private loadInitialProducts(): Product[] {
    if (typeof window === 'undefined') return this.defaultProducts;
    try {
      const raw = localStorage.getItem(PRODUCTS_CACHE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return this.defaultProducts;
  }

  public addProduct(product: Product): void {
    this.products.update(list => [product, ...list]);
    this.saveProducts();
  }

  public updateProduct(id: string, updated: Partial<Product>): void {
    this.products.update(list => 
      list.map(p => p.id === id ? { ...p, ...updated } : p)
    );
    this.saveProducts();
  }

  public deleteProduct(id: string): void {
    this.products.update(list => list.filter(p => p.id !== id));
    this.saveProducts();
  }

  public resetProductsToDefault(): void {
    this.products.set(this.defaultProducts);
    this.saveProducts();
  }

  private saveProducts(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(this.products()));
    } catch (e) {}
  }
}
