import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantComponent } from './restaurant.component';
import { RestaurantInsertComponent } from './restaurant-insert/restaurant-insert.component';
import { SharedModule } from '@/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [RestaurantComponent, RestaurantInsertComponent],
  imports: [CommonModule, SharedModule, MatButtonModule, MatIconModule],
})
export class RestaurantModule {}
