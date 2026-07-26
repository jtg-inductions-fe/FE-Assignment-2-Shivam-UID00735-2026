import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { Stats } from '@/models/dashboard-stats.model';
import { HttpClient } from '@angular/common/http';
import { StatsData } from '@/models';
import { Restaurant } from '@/models/restaurant.model';
import { API_URL } from '@/core/constants';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private dashboardStatsJSON = API_URL.dashboardStatsJSON;
  private restaurantsJSON = API_URL.restaurantsJSON;
  private http = inject(HttpClient);

  private allStats$: Observable<StatsData[]> = this.http
    .get<StatsData[]>(this.dashboardStatsJSON)
    .pipe(shareReplay(1));

  private allRestaurants$: Observable<Restaurant[]> = this.http
    .get<Restaurant[]>(this.restaurantsJSON)
    .pipe(shareReplay(1));

  getDashboardStats(restaurantId: number): Observable<Stats | undefined> {
    return this.allStats$.pipe(
      map(
        (data) => data.find((item) => item.restaurantId == restaurantId)?.stats,
      ),
    );
  }

  getFilteredRestaurants(search: string): Observable<Restaurant[]> {
    return this.allRestaurants$.pipe(
      map((restaurants) =>
        restaurants.filter((restaurant) =>
          restaurant.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ),
    );
  }

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.allRestaurants$;
  }
}
