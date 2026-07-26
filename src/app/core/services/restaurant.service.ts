import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '@/models/restaurant.model';
import { map, Observable } from 'rxjs';

import { API_URL } from '@/core/constants';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private http = inject(HttpClient);
  private restaurantsJSON = API_URL.restaurantsJSON;

  private restaurants: Restaurant[] = [];
  private isLoaded = false;

  getRestaurantDetails(restaurantId: number): Observable<Restaurant | null> {
    return this.http.get<Restaurant[]>(this.restaurantsJSON).pipe(
      map((restaurants) => {
        if (!this.isLoaded) {
          this.restaurants = restaurants;
          this.isLoaded = true;
        }
        return (
          this.restaurants.find(
            (restaurant) => restaurant.id === restaurantId,
          ) || null
        );
      }),
    );
  }

  addRestaurant(restaurant: Restaurant): void {
    this.restaurants.push(restaurant);
  }

  getAllRestaurants(): Restaurant[] {
    return this.restaurants;
  }
}
