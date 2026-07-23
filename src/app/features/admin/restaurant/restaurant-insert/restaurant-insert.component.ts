import { Restaurant } from '@/models/restaurant.model';
import { Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RestaurantService } from '@/core/services/restaurant.service';
import { adminInsertRestaurantRoute } from '@/core/constants/routes.constants';

@Component({
  selector: 'app-restaurant-insert',
  templateUrl: './restaurant-insert.component.html',
  styleUrls: ['./restaurant-insert.component.scss'],
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
    this.title = 'Add Restaurant';
    this.description = 'Add a new partner restaurant to the portal.';
    const currentUrl = this.router.url;
    this.isEditMode = currentUrl.includes('restaurant/edit');
    this.isInsertMode = currentUrl.includes('restaurant/insert');

    if (this.isEditMode) {
      this.activeRoute.paramMap.subscribe((param) => {
        const id = Number(param.get('id'));
        if (isNaN(id)) {
          console.log('it is string');
          this.router.navigate([adminInsertRestaurantRoute]);
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
        console.log('restaurant data not found');
        return;
      }

      this.initialData = data;
    });
  }
}
