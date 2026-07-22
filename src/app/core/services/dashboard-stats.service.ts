import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Stats } from '@/models/dashboard-stats.model';
import { HttpClient } from '@angular/common/http';
import { StatsData } from '@/models/dashboard-stats.model';
import { restaurant } from '@/models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardStatsService {
  private sidebarJsonURL = 'assets/data/restaurant-stats.json';
  private restaurantsJSON = 'assets/data/restaurants.json';
  private http = inject(HttpClient);

  getStats(restaurantId: number): Observable<Stats | undefined> {
    return this.http
      .get<StatsData[]>(this.sidebarJsonURL)
      .pipe(
        map(
          (data) =>
            data.find((item) => item.restaurantId == restaurantId)?.stats,
        ),
      );
  }

  getRestaurant(search: string): Observable<restaurant[]> {
    return this.http
      .get<restaurant[]>(this.restaurantsJSON)
      .pipe(
        map((restaurants) =>
          restaurants.filter((restaurant) =>
            restaurant.name.toLowerCase().includes(search.toLowerCase()),
          ),
        ),
      );
  }
}
