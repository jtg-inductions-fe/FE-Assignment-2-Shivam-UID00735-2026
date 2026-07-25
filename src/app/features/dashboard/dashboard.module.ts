import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '@/shared/shared.module';

import { MatButtonModule } from '@angular/material/button';

import { StatsComponent } from './stats/stats.component';
import { ReportGeneratorComponent } from './report-generator/report-generator.component';
import { MatIconModule } from '@angular/material/icon';
import { TopCustomersComponent } from './top-customers/top-customers.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TopDishesComponent } from './top-dishes/top-dishes.component';
import { ActiveOrdersComponent } from './active-orders/active-orders.component';

@NgModule({
  declarations: [
    DashboardComponent,
    StatsComponent,
    ReportGeneratorComponent,
    TopCustomersComponent,
    TopDishesComponent,
    ActiveOrdersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
