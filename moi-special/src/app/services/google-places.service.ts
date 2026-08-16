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

  public fetchLiveReviews(apiKey?: string, placeId?: string): void {
    const key = apiKey || environment.googleApiKey;
    const id = placeId || environment.googlePlaceId;

    if (!key || !id) {
      // If no key yet, maintain clean fallback configuration
      return;
    }

    this.isLoading.set(true);
    this.hasError.set(false);

    // Google Places API Details endpoint
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=name,rating,reviews,user_ratings_total&key=${key}&language=tr`;

    this.http.get<any>(url).subscribe({
      next: (res) => {
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
      error: (err) => {
        console.error('Google Places API error:', err);
        this.hasError.set(true);
        this.isLoading.set(false);
      }
    });
  }
}
