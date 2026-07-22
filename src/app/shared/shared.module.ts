import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '@/shared/components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SidebarComponent } from '@/shared/components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { SideBarItemComponent } from './components/side-bar-item/side-bar-item.component';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from '@/app-routing.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    FormsModule,
    MatButtonModule,
    AppRoutingModule,
  ],
  exports: [HeaderComponent],
})
export class SharedModule {}
