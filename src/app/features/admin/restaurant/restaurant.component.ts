import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { RestaurantService } from '@/core/services';
import { ROUTES } from '@/core/constants';

import { Restaurant, TableColumn } from '@/models';

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

  columns: TableColumn[] = [
    {
      key: 'name',
      header: 'RESTAURANT NAME',
      type: 'text',
      textConfig: {
        bold: true,
      },
    },
    {
      key: 'address',
      header: 'ADDRESS',
      type: 'text',
    },
    {
      key: 'ownersEmail',
      header: 'OWNERS',
      type: 'chip',
      chipConfig: {
        multiple: true,
        color: 'primary',
      },
    },
    {
      key: 'actions',
      header: 'ACTIONS',
      type: 'button',
      buttonConfig: [
        {
          type: 'stroked',
          label: 'Edit',
          icon: 'edit',
          color: 'primary',
          action: 'edit',
        },
      ],
    },
  ];

  ngOnInit(): void {
    this.prepareRestaurantData();
  }

  private prepareRestaurantData(): void {
    this.restaurantService.getAllRestaurant().subscribe((data) => {
      if (!data) {
        return;
      }

      this.restaurantData = data.slice(1);
    });
  }

  handleTableAction(event: { action: string; row: unknown }): void {
    const restaurant = event.row as Restaurant;

    switch (event.action) {
      case 'edit':
        this.editRestaurant(restaurant.id);
        break;
    }
  }

  editRestaurant(id: number): void {
    this.router.navigate([
      ROUTES.adminRestaurantRoutes.adminEditRestaurantRoute,
      id,
    ]);
  }
}
