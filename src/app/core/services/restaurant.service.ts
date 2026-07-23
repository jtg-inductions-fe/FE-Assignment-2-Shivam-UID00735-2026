import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '@/models/restaurant.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private restaurantsJSON = 'assets/data/restaurants.json';
  private http = inject(HttpClient);

  getRestaurantDetails(restaurantId: number): Observable<Restaurant | null> {
    return this.http
      .get<Restaurant[]>(this.restaurantsJSON)
      .pipe(
        map(
          (restaurants) =>
            restaurants.find((r) => r.id === restaurantId) || null,
        ),
      );
  }
}
