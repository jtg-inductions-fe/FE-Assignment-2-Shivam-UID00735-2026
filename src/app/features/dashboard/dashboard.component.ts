import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '@/core/services';
import { map, tap, filter, switchMap } from 'rxjs';
import { AuthService } from '@/core/services/auth.service';
import { StatsConfig } from '@/core/configs/stats.config';
import { Stats, StatsCard } from '@/models/dashboard-stats.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ROUTES } from '@/core/constants';
import { ListCardItem } from '@/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title = 'Overview Dashboard';
  description =
    'System administrator  overview panel. Impersonate owners or view aggregate metrics.';

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

    this.selectedRestaurantId$
      .pipe(switchMap((id) => this.dashboardStatService.getDashboardStats(id)))
      .subscribe((stats) => (this.statsCards = this.prepareStatsCard(stats)));
  }

  onRestaurantChange(restaurantID: number): void {
    this.router.navigate([ROUTES.dashboardPageRoute, restaurantID]);
  }

  prepareStatsCard(data: Stats | undefined): StatsCard[] {
    if (!data) return [];
    const cards: StatsCard[] = [];
    for (const key of Object.keys(
      StatsConfig,
    ) as (keyof typeof StatsConfig)[]) {
      const stateValue = data[key];
      if (stateValue !== undefined) {
        cards.push({ ...StatsConfig[key], value: stateValue });
      }
    }
    return cards;
  }

  isAdmin(): boolean {
    return this.authService.getCurrentUserRole() === 'admin';
  }

  private prepareTopCustomers(restaurantId: number): void {
    this.dashboardStatService
      .getTopCustomers(restaurantId)
      .subscribe((data) => {
        if (!data) {
          this.topCustomer = [];
          return;
        }
        this.topCustomer = data.map((customer) => ({
          image: customer.image,
          title: customer.name,
          subtitle: customer.email,
          value: customer.amount,
        }));
      });
  }

  private prepareTopDishes(restaurantId: number): void {
    this.dashboardStatService.getTopDishes(restaurantId).subscribe((data) => {
      if (!data) {
        this.topDishes = [];
        this.router.navigate([ROUTES.notFoundPageRoute]);
        return;
      }

      this.topDishes = data.map((dish) => ({
        title: dish.title,
        subtitle: dish.category,
        value: dish.value,
      }));
    });
  }
}
