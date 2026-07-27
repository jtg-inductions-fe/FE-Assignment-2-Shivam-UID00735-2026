import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, tap, catchError } from 'rxjs';

import { Restaurant } from '@/models';

import { API_URL } from '@/core/constants';

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  private http = inject(HttpClient);
  private restaurantsJSON = API_URL.restaurantsJSON;

  private restaurants: Restaurant[] = [];
  private isLoaded = false;

  private loadIfNeeded(): Observable<Restaurant[]> {
    if (this.isLoaded) {
      return of(this.restaurants);
    }
    return this.http.get<Restaurant[]>(this.restaurantsJSON).pipe(
      tap((data) => {
        this.restaurants = data;
        this.isLoaded = true;
      }),
      catchError(() => {
        this.restaurants = [];
        this.isLoaded = true;
        return of(this.restaurants);
      }),
    );
  }

  getAllRestaurant(): Observable<Restaurant[] | null> {
    return this.loadIfNeeded();
  }

  getRestaurantDetails(restaurantId: number): Observable<Restaurant | null> {
    return this.loadIfNeeded().pipe(
      map(
        (restaurants) =>
          restaurants.find((restaurant) => restaurant.id === restaurantId) ||
          null,
      ),
    );
  }

  addRestaurant(restaurant: Restaurant): void {
    this.restaurants.push(restaurant);
    this.isLoaded = true;
  }
}
