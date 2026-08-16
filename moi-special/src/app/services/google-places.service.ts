import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface LiveGoogleReview {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

export interface LivePlaceDetails {
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: LiveGoogleReview[];
}

const CACHE_KEY = 'moi_google_reviews_cache_v3';
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class GooglePlacesService {
  private readonly http = inject(HttpClient);

  public readonly placeDetails = signal<LivePlaceDetails | null>(null);
  public readonly isLoading = signal<boolean>(false);
  public readonly hasError = signal<boolean>(false);

  public initLiveReviews(): void {
    if (typeof window === 'undefined') return;

    // Clear any obsolete legacy caches
    try {
      localStorage.removeItem('moi_google_reviews_cache_v1');
      localStorage.removeItem('moi_google_reviews_cache_v2');
    } catch (e) {}

    // Check current 24-Hour Cache
    const cached = this.getValidCache();
    if (cached && cached.reviews && cached.reviews.length > 0) {
      this.placeDetails.set(cached);
      return;
    }

    const key = environment.googleApiKey;
    if (!key) return;

    this.isLoading.set(true);
    this.hasError.set(false);

    // Call Places API (New) Text Search
    const url = 'https://places.googleapis.com/v1/places:searchText';
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.rating,places.userRatingCount,places.reviews'
    });

    const body = {
      textQuery: 'Moi Fırın Sırrın Karşıyaka Şanlıurfa',
      languageCode: 'tr'
    };

    this.http.post<any>(url, body, { headers }).subscribe({
      next: (res: any) => {
        const place = res?.places?.[0];
        if (place) {
          const liveReviews: LiveGoogleReview[] = (place.reviews || []).map((r: any) => ({
            author_name: r.authorAttribution?.displayName || 'Google Misafiri',
            profile_photo_url: r.authorAttribution?.photoUri || '',
            rating: r.rating || 5,
            relative_time_description: r.relativePublishTimeDescription || 'Google Yorumu',
            text: r.originalText?.text || r.text?.text || r.text || ''
          }));

          const details: LivePlaceDetails = {
            name: place.displayName?.text || 'Moi Fırın',
            rating: place.rating || 5.0,
            user_ratings_total: place.userRatingCount || (place.reviews ? place.reviews.length : 0),
            reviews: liveReviews
          };

          if (details.reviews.length > 0) {
            this.setCache(details);
            this.placeDetails.set(details);
          }
        }
        this.isLoading.set(false);
      },
      error: (err: any) => {
        console.error('Places API (New) Error:', err);
        this.hasError.set(true);
        this.isLoading.set(false);
      }
    });
  }

  public clearCacheAndRefresh(): void {
    try {
      localStorage.removeItem(CACHE_KEY);
    } catch (e) {}
    this.placeDetails.set(null);
    this.initLiveReviews();
  }

  private getValidCache(): LivePlaceDetails | null {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;

      const parsed = JSON.parse(raw);
      if (Date.now() - parsed.timestamp < CACHE_DURATION_MS) {
        return parsed.data;
      }
    } catch (e) {}
    return null;
  }

  private setCache(data: LivePlaceDetails): void {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data
      }));
    } catch (e) {}
  }
}
