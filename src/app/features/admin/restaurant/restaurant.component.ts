import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { RestaurantService } from '@/core/services';
import { ROUTES } from '@/core/constants';

import { Restaurant, TableColumn } from '@/models';
import { getRestaurantColumns } from '@/core/configs/restaurant.config';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {
  private restaurantService = inject(RestaurantService);
  private router = inject(Router);

  pageTitle = 'Restaurants';
  pageDescription = 'Manage partner restaurants and ownership list.';

  addRestaurantRoute = ROUTES.adminRestaurantRoutes.adminInsertRestaurantRoute;

  restaurantData: Restaurant[] = [];

  columns: TableColumn<Restaurant>[] = [];

  ngOnInit(): void {
    this.columns = getRestaurantColumns({
      onEdit: (restaurant) => this.editRestaurant(restaurant.id),
    });
    this.prepareRestaurantData();
  }

  editRestaurant(id: number): void {
    this.router.navigate([
      ROUTES.adminRestaurantRoutes.adminEditRestaurantRoute,
      id,
    ]);
  }

  private prepareRestaurantData(): void {
    this.restaurantService.getAllRestaurant().subscribe((data) => {
      if (!data) {
        return;
      }

      this.restaurantData = data.slice(1);
    });
  }
}
