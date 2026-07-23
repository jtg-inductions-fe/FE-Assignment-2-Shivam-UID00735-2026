import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SharedModule } from '@/shared/shared.module';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [CommonModule, SharedModule, RouterModule, MatSidenavModule],
  exports: [MainLayoutComponent],
})
export class LayoutModule {}
