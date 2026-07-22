import { Component, inject, OnInit } from '@angular/core';
import { DashboardStatsService } from '@/core/services/dashboard-stats.service';
import { AuthService } from '@/core/services/auth.service';
import { StatsConfig } from '@/core/configs/stats.config';
import { StatsCard } from '@/models/dashboard-stats.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {
  loginPageRoute,
  notFoundPageRoute,
} from '@/core/constants/routes.constants';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title = '';
  description = '';

  statsCards: StatsCard[] = [];
  selectedValue = '1';

  private dashboardStatService = inject(DashboardStatsService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);

  currentUserRole!: string;

  // Assigning the values and get the restaurant id from the parameters
  ngOnInit(): void {
    this.title = 'Overview Dashboard';
    this.description =
      'System administrator  overview panel. Impersonate owners or view aggregate metrics.';
    this.getCurrentUserRole();
    this.activeRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      // Update when the id will be in the string
      if (id < 0) {
        console.log('Unable to find the id from the url');
        return;
      }

      this.prepareStatsCard(id);
    });
  }

  // Redirect to corespondent according th restaurant Id
  onRestaurantChange(restaurantID: number): void {
    this.router.navigate(['/dashboard', restaurantID]);
  }

  // Preparing the stats cards data
  prepareStatsCard(id: number): void {
    console.log('dashboard : preparing card content');
    this.dashboardStatService.getStats(id).subscribe((data) => {
      if (!data) {
        this.statsCards = [];
        this.router.navigate([notFoundPageRoute]);
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
      console.log('cards data', cards);
      this.statsCards = cards;
      console.log('stats card', this.statsCards);
    });

    console.log('card content rendered');
  }

  // Getting user role and
  getCurrentUserRole() {
    const role = this.authService.getCurrentUserRole();
    if (!role) {
      this.router.navigateByUrl(loginPageRoute);
      return;
    }
    this.currentUserRole = role;
  }
}
