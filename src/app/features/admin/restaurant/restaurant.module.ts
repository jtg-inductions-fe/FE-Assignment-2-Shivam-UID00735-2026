import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantComponent } from './restaurant.component';
import { RestaurantInsertComponent } from './restaurant-actions/restaurant-actions.component';
import { SharedModule } from '@/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '@/app-routing.module';
import { CdkTableModule } from '@angular/cdk/table';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [RestaurantComponent, RestaurantInsertComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    CdkTableModule,
    MatChipsModule,
  ],
})
export class RestaurantModule {}
