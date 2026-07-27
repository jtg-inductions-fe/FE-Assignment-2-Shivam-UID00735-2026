import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  Stats,
  StatsData,
  Restaurant,
  TopCustomersList,
  TopCustomer,
  TopDishes,
  TopDishesList,
  ActiveOrders,
  ActiveOrdersItems,
} from '@/models';
import { API_URL } from '@/core/constants';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly restaurantsJSON = API_URL.restaurantsJSON;
  private readonly restaurantStatsURL = API_URL.restaurantStatsURL;
  private readonly topCustomersURL = API_URL.topCustomers;
  private readonly topDishesURL = API_URL.topDishes;
  private readonly activeOrdersURL = API_URL.activeOrders;
  private http = inject(HttpClient);

  private allStats$: Observable<StatsData[]> = this.http
    .get<StatsData[]>(this.restaurantStatsURL)
    .pipe(shareReplay(1));

  private allRestaurants$: Observable<Restaurant[]> = this.http
    .get<Restaurant[]>(this.restaurantsJSON)
    .pipe(shareReplay(1));

  private allTopCustomers$: Observable<TopCustomersList[]> = this.http
    .get<TopCustomersList[]>(this.topCustomersURL)
    .pipe(shareReplay(1));

  private allTopDishes$: Observable<TopDishesList[]> = this.http
    .get<TopDishesList[]>(this.topDishesURL)
    .pipe(shareReplay(1));

  private allActiveOrders$: Observable<ActiveOrdersItems[]> = this.http
    .get<ActiveOrdersItems[]>(this.activeOrdersURL)
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
      map((restaurants) => this.filterRestaurants(restaurants, search)),
    );
  }

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.allRestaurants$;
  }

  getTopCustomers(restaurantId: number): Observable<TopCustomer[] | undefined> {
    return this.allTopCustomers$.pipe(
      map(
        (data) =>
          data.find((item) => item.restaurantId === restaurantId)?.topCustomers,
      ),
    );
  }

  getTopDishes(restaurantId: number): Observable<TopDishes[] | undefined> {
    return this.allTopDishes$.pipe(
      map(
        (data) =>
          data.find((item) => item.restaurantId === restaurantId)?.topDishes,
      ),
    );
  }

  getActiveOrders(
    restaurantId: number,
  ): Observable<ActiveOrders[] | undefined> {
    return this.allActiveOrders$.pipe(
      map(
        (data) =>
          data.find((item) => item.restaurantId === restaurantId)?.items,
      ),
    );
  }

  private filterRestaurants(
    restaurants: Restaurant[],
    search: string,
  ): Restaurant[] {
    return restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(search.toLowerCase()),
    );
  }
}
