import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '@/core/services';
import { AuthService } from '@/core/services/auth.service';
import { StatsConfig } from '@/core/configs/stats.config';
import { StatsCard } from '@/models/dashboard-stats.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ROUTES } from '@/core/constants';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title = '';
  description = '';

  statsCards: StatsCard[] = [];

  private dashboardStatService = inject(DashboardService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.title = 'Overview Dashboard';
    this.description =
      'System administrator  overview panel. Impersonate owners or view aggregate metrics.';

    this.activeRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      if (isNaN(id)) {
        this.router.navigate([ROUTES.notFoundPageRoute]);
        return;
      }

      this.prepareStatsCard(id);
    });
  }

  onRestaurantChange(restaurantID: number): void {
    this.router.navigate([ROUTES.dashboardPageRoute, restaurantID]);
  }

  prepareStatsCard(id: number): void {
    this.dashboardStatService.getStats(id).subscribe((data) => {
      if (!data) {
        this.statsCards = [];
        return;
      }
      const cards = [];
      for (const key of Object.keys(
        StatsConfig,
      ) as (keyof typeof StatsConfig)[]) {
        const statValue = data[key];
        if (statValue !== undefined) {
          cards.push({ ...StatsConfig[key], value: statValue });
        }
      }
      this.statsCards = cards;
    });
  }

  isAdmin(): boolean {
    return this.authService.getCurrentUserRole() === 'admin';
  }
}
