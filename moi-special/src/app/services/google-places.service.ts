import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

@Injectable({
  providedIn: 'root'
})
export class GooglePlacesService {
  private readonly http = inject(HttpClient);

  public readonly placeDetails = signal<LivePlaceDetails | null>(null);
  public readonly isLoading = signal<boolean>(false);
  public readonly hasError = signal<boolean>(false);

  public initLiveReviews(): void {
    const key = environment.googleApiKey;
    if (!key) return;

    this.isLoading.set(true);
    this.hasError.set(false);

    if (environment.googlePlaceId) {
      this.fetchDetailsByPlaceId(environment.googlePlaceId, key);
    } else {
      // Find Place by text query automatically
      const query = encodeURIComponent('Moi Fırın Sırrın Karşıyaka Şanlıurfa');
      const findUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=place_id&key=${key}`;

      this.http.get<any>(findUrl).subscribe({
        next: (findRes: any) => {
          const placeId = findRes?.candidates?.[0]?.place_id;
          if (placeId) {
            this.fetchDetailsByPlaceId(placeId, key);
          } else {
            this.isLoading.set(false);
          }
        },
        error: () => {
          this.isLoading.set(false);
        }
      });
    }
  }

  private fetchDetailsByPlaceId(placeId: string, apiKey: string): void {
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}&language=tr`;

    this.http.get<any>(detailsUrl).subscribe({
      next: (res: any) => {
        if (res.result) {
          this.placeDetails.set({
            name: res.result.name,
            rating: res.result.rating || 5.0,
            user_ratings_total: res.result.user_ratings_total || 0,
            reviews: res.result.reviews || []
          });
        }
        this.isLoading.set(false);
      },
      error: (err: any) => {
        console.error('Google Places Details error:', err);
        this.hasError.set(true);
        this.isLoading.set(false);
      }
    });
  }
}
