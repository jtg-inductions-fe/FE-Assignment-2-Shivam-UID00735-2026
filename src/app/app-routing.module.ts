import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '@/features/auth/login/login.component';
import { DashboardComponent } from '@/features/dashboard/dashboard.component';
import { authGuard } from '@/core/guards/auth.guard';
import { guestGuard } from '@/core/guards/guest.guard';
import {
  loginPageRoute,
  dashboardPageRoute,
} from '@/core/constants/routes.constants';

const routes: Routes = [
  {
    path: loginPageRoute,
    component: LoginComponent,
    canActivate: [guestGuard],
  },
  {
    path: dashboardPageRoute,
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: loginPageRoute,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
