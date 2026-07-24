import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantComponent } from './restaurant.component';
import { RestaurantInsertComponent } from './restaurant-actions/restaurant-actions.component';
import { SharedModule } from '@/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '@/app-routing.module';

@NgModule({
  declarations: [RestaurantComponent, RestaurantInsertComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
  ],
})
export class RestaurantModule {}
