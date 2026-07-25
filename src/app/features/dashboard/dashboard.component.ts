import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '@/core/services';
import { map, tap, filter, switchMap } from 'rxjs';
import { AuthService } from '@/core/services/auth.service';
import { StatsConfig } from '@/core/configs/stats.config';
import {
  Stats,
  StatsCard,
  TopCustomer,
  TopDishes,
  ListCardItem,
} from '@/models';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTES } from '@/core/constants';
import { ActiveOrders  } from '@/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title = 'Overview Dashboard';
  description =
    'System administrator overview panel. Impersonate owners or view aggregate metrics.';

  statsCards: StatsCard[] = [];
  topCustomer: ListCardItem[] = [];
  topDishes: ListCardItem[] = [];
  activeOrdersData: ActiveOrders[] = [];

  private dashboardStatService = inject(DashboardService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);

  private selectedRestaurantId$ = this.activeRoute.paramMap.pipe(
    map((params) => Number(params.get('id'))),
    tap((id) => {
      if (!Number.isInteger(id) || id < 0) {
        this.router.navigate([ROUTES.notFoundPageRoute]);
      }
    }),
    filter((id) => Number.isInteger(id) && id >= 0),
  );

  ngOnInit(): void {
    this.dashboardStatService.getAllRestaurants().subscribe();
    this.loadStats();
    this.loadTopCustomers();
    this.loadTopDishes();
  }

  onRestaurantChange(restaurantID: number): void {
    this.router.navigate([ROUTES.dashboardPageRoute, restaurantID]);
  }

  isAdmin(): boolean {
    return this.authService.getCurrentUserRole() === 'admin';
  }

  private loadStats(): void {
    this.selectedRestaurantId$
      .pipe(switchMap((id) => this.dashboardStatService.getDashboardStats(id)))
      .subscribe((stats) => {
        this.statsCards = this.prepareStatsCard(stats);
      });
  }

  private loadTopCustomers(): void {
    this.selectedRestaurantId$
      .pipe(switchMap((id) => this.dashboardStatService.getTopCustomers(id)))
      .subscribe((data) => {
        this.topCustomer = this.prepareTopCustomers(data);
      });
  }

  private loadTopDishes(): void {
    this.selectedRestaurantId$
      .pipe(switchMap((id) => this.dashboardStatService.getTopDishes(id)))
      .subscribe((data) => {
        this.topDishes = this.prepareTopDishes(data);
      });
  }

  private prepareStatsCard(data: Stats | undefined): StatsCard[] {
    if (!data) return [];
    const cards: StatsCard[] = [];
    for (const key of Object.keys(
      StatsConfig,
    ) as (keyof typeof StatsConfig)[]) {
      const statValue = data[key];
      if (statValue !== undefined) {
        cards.push({ ...StatsConfig[key], value: statValue });
      }
    }
    return cards;
  }

  private prepareTopCustomers(data: TopCustomer[] | undefined): ListCardItem[] {
    if (!data) return [];
    return data.map((customer) => ({
      image: customer.image,
      title: customer.name,
      subtitle: customer.email,
      value: customer.amount,
    }));
  }

  private prepareTopDishes(data: TopDishes[] | undefined): ListCardItem[] {
    if (!data) return [];
    return data.map((dish) => ({
      title: dish.title,
      subtitle: dish.category,
      value: dish.value,
    }));
  }

  private prepareActiveOrder(restaurantId: number): void {
    this.dashboardStatService
      .getActiveOrders(restaurantId)
      .subscribe((data) => {
        if (!data) {
          return;
        }
        this.activeOrdersData = data;
      });
  }
}
