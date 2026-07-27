import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from '@/shared/components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';

import { AutoSelectComponent } from '@/shared/components/auto-select/auto-select.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { SidebarComponent } from '@/shared/components/sidebar/sidebar.component';
import { SideBarItemComponent } from '@/shared/components/side-bar-item/side-bar-item.component';
import { ErrorPageComponent } from '@/shared/components/error-page/error-page.component';
import { MainContentHeaderComponent } from '@/shared/components/main-content-header/main-content-header.component';
import { StatCardComponent } from '@/shared/components/stat-card/stat-card.component';
import { ListCardComponent } from '@/shared/components/list-card/list-card.component';
import { CardComponent } from '@/shared/components/card/card.component';
import { MatChipsModule } from '@angular/material/chips';

import { RestaurantFormComponent } from '@/shared/components/restaurant-form/restaurant-form.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SideBarItemComponent,
    ErrorPageComponent,
    AutoSelectComponent,
    MainContentHeaderComponent,
    StatCardComponent,
    ListCardComponent,
    CardComponent,
    RestaurantFormComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    MatTreeModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule,
    MatChipsModule,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    SideBarItemComponent,
    AutoSelectComponent,
    MainContentHeaderComponent,
    StatCardComponent,
    ListCardComponent,
    CardComponent,
    RestaurantFormComponent,
  ],
})
export class SharedModule {}
