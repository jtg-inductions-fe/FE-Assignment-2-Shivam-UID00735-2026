import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
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

  initialData!: Restaurant;

  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private restaurantService = inject(RestaurantService);

  isInsertMode = false;
  isEditMode = false;

  ngOnInit(): void {
    this.title = '';
    this.description = '';
    const currentUrl = this.router.url;

    this.isEditMode = currentUrl.includes('restaurant/edit');
    this.isInsertMode = currentUrl.includes('restaurant/insert');

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
    }
    if (this.isEditMode) {
      this.title = 'Edit Restaurant';
      this.description = 'Update the restaurant name, address, and owners.';
    } else {
      this.title = 'Add Restaurant';
      this.description = 'Add a new partner restaurant to the portal.';
    }
  }

  loadRestaurantDetails(id: number) {
    this.restaurantService.getRestaurantDetails(id).subscribe((data) => {
      if (!data) {
        return;
      }
      this.initialData = data;
    });
  }
}
