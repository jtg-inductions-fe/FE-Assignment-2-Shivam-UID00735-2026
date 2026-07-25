import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '@/core/services';
import { map, tap, switchMap } from 'rxjs';
import { AuthService } from '@/core/services/auth.service';
import { StatsConfig } from '@/core/configs/stats.config';
import { Stats, StatsCard } from '@/models/dashboard-stats.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ROUTES } from '@/core/constants';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title = 'Overview Dashboard';
  description =
    'System administrator  overview panel. Impersonate owners or view aggregate metrics.';

  statsCards: StatsCard[] = [];

  private dashboardStatService = inject(DashboardService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);

  private selectedRestaurantId$ = this.activeRoute.paramMap.pipe(
    map((params) => Number(params.get('id'))),
    tap((id) => {
      if (isNaN(id)) {
        this.router.navigate([ROUTES.notFoundPageRoute]);
      }
    }),
  );

  ngOnInit(): void {
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
}
