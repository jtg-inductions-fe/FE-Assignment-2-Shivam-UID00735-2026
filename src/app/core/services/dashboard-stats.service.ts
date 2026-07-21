import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Stats } from '@/models/dashboard-stats.model';
import { HttpClient } from '@angular/common/http';
import { StatsData } from '@/models/dashboard-stats.model';
import {
  TopCustomersList,
  TopCustomer,
  TopDishes,
  TopDishesList,
} from '@/models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardStatsService {
  private restaurantStatsURL = 'assets/data/restaurant-stats.json';

  private topCustomers = 'assets/data/top-customers.json';

  private topDishes = 'assets/data/top-dishes.json';

  private http = inject(HttpClient);

  getStats(restaurantId: number): Observable<Stats | undefined> {
    return this.http
      .get<StatsData[]>(this.restaurantStatsURL)
      .pipe(
        map(
          (data) =>
            data.find((item) => item.restaurantId == restaurantId)?.stats,
        ),
      );
  }

  getTopCustomers(restaurantId: number): Observable<TopCustomer[] | undefined> {
    return this.http
      .get<TopCustomersList[]>(this.topCustomers)
      .pipe(
        map(
          (data) =>
            data.find((item) => item.restaurantId === restaurantId)
              ?.topCustomers,
        ),
      );
  }

  getTopDishes(restaurantId: number): Observable<TopDishes[] | undefined> {
    return this.http
      .get<TopDishesList[]>(this.topDishes)
      .pipe(
        map(
          (data) =>
            data.find((item) => item.restaurantId === restaurantId)?.topDishes,
        ),
      );
  }
}
