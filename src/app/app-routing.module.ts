import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '@/features/auth/login/login.component';

import { authGuard } from '@/core/guards/auth.guard';
import { guestGuard } from '@/core/guards/guest.guard';
import { ROUTES } from '@/core/constants/routes.constants';
import { DashboardComponent } from '@/features/dashboard/dashboard.component';
import { ErrorPageComponent } from './shared/components/error-page/error-page.component';

const routes: Routes = [
  {
    path: ROUTES.loginPageRoute,
    component: LoginComponent,
    canActivate: [guestGuard],
  },
  {
    path: ROUTES.dashboardPageRoute,
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: ROUTES.loginPageRoute,
    component: ErrorPageComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
