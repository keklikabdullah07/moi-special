import { Injectable, signal } from '@angular/core';

declare const google: any;

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

const CACHE_KEY = 'moi_google_reviews_cache_v1';
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 Hours Smart Caching (0 Credit Waste)

@Injectable({
  providedIn: 'root'
})
export class GooglePlacesService {
  public readonly placeDetails = signal<LivePlaceDetails | null>(null);
  public readonly isLoading = signal<boolean>(false);
  public readonly hasError = signal<boolean>(false);

  public initLiveReviews(): void {
    if (typeof window === 'undefined') return;

    // Step 1: Check 24-Hour Smart Cache first to save 100% of Google Credits
    const cached = this.getValidCache();
    if (cached) {
      this.placeDetails.set(cached);
      return;
    }

    this.isLoading.set(true);

    // Step 2: Wait for Google Maps JS SDK if cache missing
    const checkAndFetch = (attempts: number = 0) => {
      if (typeof google !== 'undefined' && google.maps && google.maps.places) {
        this.fetchWithGoogleSdk();
      } else if (attempts < 20) {
        setTimeout(() => checkAndFetch(attempts + 1), 300);
      } else {
        this.isLoading.set(false);
      }
    };

    checkAndFetch();
  }

  private fetchWithGoogleSdk(): void {
    try {
      const dummyElem = document.createElement('div');
      const service = new google.maps.places.PlacesService(dummyElem);

      service.findPlaceFromQuery({
        query: 'Moi Fırın Sırrın Karşıyaka Şanlıurfa',
        fields: ['place_id', 'name']
      }, (results: any[], status: any) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results && results[0]) {
          const placeId = results[0].place_id;

          service.getDetails({
            placeId: placeId,
            fields: ['name', 'rating', 'user_ratings_total', 'reviews']
          }, (place: any, detailStatus: any) => {
            if (detailStatus === google.maps.places.PlacesServiceStatus.OK && place) {
              const liveReviews: LiveGoogleReview[] = (place.reviews || []).map((r: any) => ({
                author_name: r.author_name,
                profile_photo_url: r.profile_photo_url || '',
                rating: r.rating || 5,
                relative_time_description: r.relative_time_description || 'Google Yorumu',
                text: r.text
              }));

              const details: LivePlaceDetails = {
                name: place.name,
                rating: place.rating || 5.0,
                user_ratings_total: place.user_ratings_total || (place.reviews ? place.reviews.length : 0),
                reviews: liveReviews
              };

              // Save to 24-Hour Cache
              this.setCache(details);
              this.placeDetails.set(details);
            }
            this.isLoading.set(false);
          });

        } else {
          this.isLoading.set(false);
        }
      });
    } catch (e) {
      console.error('Google Places SDK Error:', e);
      this.hasError.set(true);
      this.isLoading.set(false);
    }
  }

  private getValidCache(): LivePlaceDetails | null {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;

      const parsed = JSON.parse(raw);
      if (Date.now() - parsed.timestamp < CACHE_DURATION_MS) {
        return parsed.data;
      }
    } catch (e) {
      // Ignore cache parse errors
    }
    return null;
  }

  private setCache(data: LivePlaceDetails): void {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        timestamp: Date.now(),
        data
      }));
    } catch (e) {
      // Ignore localStorage write errors
    }
  }
}
