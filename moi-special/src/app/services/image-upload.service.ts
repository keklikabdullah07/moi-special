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

  /**
   * HTML5 Canvas Auto-Resampler & Smart Cropper
   * Formats any user photo to target aspect ratio (e.g. 4:3, 3:4, 9:16) with zero stretching/skewing!
   */
  public autoScaleAndCrop(
    file: File, 
    targetWidth: number = 800, 
    targetHeight: number = 600, 
    fitMode: 'cover' | 'contain' = 'cover'
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }

          // Background Fill (Warm Cream for bakery theme)
          ctx.fillStyle = '#FFF8F2';
          ctx.fillRect(0, 0, targetWidth, targetHeight);

          const imgRatio = img.width / img.height;
          const targetRatio = targetWidth / targetHeight;

          let renderW = targetWidth;
          let renderH = targetHeight;
          let offsetX = 0;
          let offsetY = 0;

          if (fitMode === 'cover') {
            if (imgRatio > targetRatio) {
              renderH = targetHeight;
              renderW = img.width * (targetHeight / img.height);
              offsetX = (targetWidth - renderW) / 2;
            } else {
              renderW = targetWidth;
              renderH = img.height * (targetWidth / img.width);
              offsetY = (targetHeight - renderH) / 2;
            }
          } else {
            // contain mode
            if (imgRatio > targetRatio) {
              renderW = targetWidth;
              renderH = img.height * (targetWidth / img.width);
              offsetY = (targetHeight - renderH) / 2;
            } else {
              renderH = targetHeight;
              renderW = img.width * (targetHeight / img.height);
              offsetX = (targetWidth - renderW) / 2;
            }
          }

          ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

          // Return high-quality compressed WebP/JPEG base64
          const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
          resolve(dataUrl);
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
