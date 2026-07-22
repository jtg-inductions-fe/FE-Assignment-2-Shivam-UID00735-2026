import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SharedModule } from '@/shared/shared.module';
import { AppRoutingModule } from '@/app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [CommonModule, SharedModule, AppRoutingModule, MatSidenavModule],
  exports: [MainLayoutComponent],
})
export class LayoutModule {}
