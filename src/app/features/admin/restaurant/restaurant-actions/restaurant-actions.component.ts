import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RestaurantService } from '@/core/services/restaurant.service';
import { ROUTES } from '@/core/constants';
import { Restaurant } from '@/models';

@Component({
  selector: 'app-restaurant-action',
  templateUrl: './restaurant-actions.component.html',
  styleUrls: ['./restaurant-actions.component.scss'],
})
export class RestaurantInsertComponent implements OnInit {
  title = '';
  description = '';
  restaurantListPageRoute =
    ROUTES.adminRestaurantRoutes.adminRestaurantListRoute;

  initialData?: Restaurant;

  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private restaurantService = inject(RestaurantService);

  isInsertMode = false;
  isEditMode = false;

  ngOnInit(): void {
    const currentUrl = this.router.url;

    this.isEditMode = currentUrl.includes(
      ROUTES.adminRestaurantRoutes.adminEditRestaurantRoute,
    );
    this.isInsertMode = currentUrl.includes(
      ROUTES.adminRestaurantRoutes.adminInsertRestaurantRoute,
    );

    if (this.isEditMode) {
      this.activeRoute.paramMap.subscribe((param) => {
        const id = Number(param.get('id'));
        if (isNaN(id)) {
          this.router.navigate([
            ROUTES.adminRestaurantRoutes.adminInsertRestaurantRoute,
          ]);
          return;
        }
        this.loadRestaurantDetails(id);
      });

      this.title = 'Edit Restaurant';
      this.description = 'Update the restaurant name, address, and owners.';
    } else {
      this.title = 'Add Restaurant';
      this.description = 'Add a new partner restaurant to the portal.';
    }
  }

  loadRestaurantDetails(id: number) {
    this.restaurantService.getRestaurantDetails(id).subscribe({
      next: (data) => {
        if (!data) {
          this.router.navigate([ROUTES.notFoundPageRoute]);
          return;
        }
        this.initialData = data;
      },
      error: () => {
        this.router.navigate([ROUTES.serverErrorRoute]);
      },
    });
  }
}
