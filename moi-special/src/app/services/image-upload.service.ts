import { Injectable } from '@angular/core';

export interface PresetImage {
  id: string;
  title: string;
  url: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  public readonly presetGallery: PresetImage[] = [
    { id: 'img1', title: 'Antep Fıstıklı Artisan Croissant', url: 'assets/croissant.jpg', category: 'fistikli' },
    { id: 'img2', title: 'Móí Special Entremet Pasta', url: 'assets/entremet.jpg', category: 'pastane' },
    { id: 'img3', title: 'Geleneksel Odun Ateşi Taş Fırın', url: 'assets/hero-bakery.jpg', category: 'firin' },
    { id: 'img4', title: 'Antep Fıstıklı Specialty Coffee', url: 'assets/croissant.jpg', category: 'icecek' }
  ];

  public fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
}
