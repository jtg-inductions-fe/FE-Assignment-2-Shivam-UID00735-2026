import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  authGuard,
  guestGuard,
  invalidatorGuard,
  ownerAccessGuard,
  ownerDashboardRedirectGuard,
} from '@/core/guards';

import { ROUTES } from '@/core/constants/routes.constants';
import { DashboardComponent } from '@/features/dashboard/dashboard.component';
import { ErrorPageComponent } from '@/shared/components/error-page/error-page.component';
import { LoginComponent } from '@/features/auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTES.dashboardPageRoute,
    pathMatch: 'full',
  },
  {
    path: ROUTES.loginPageRoute,
    component: LoginComponent,
    canActivate: [guestGuard],
  },
  {
    path: ROUTES.dashboardPageRoute + '/:id',
    component: DashboardComponent,
    canActivate: [authGuard, invalidatorGuard, ownerAccessGuard],
  },
  {
    path: ROUTES.dashboardPageRoute,
    component: DashboardComponent,
    canActivate: [authGuard, ownerDashboardRedirectGuard],
  },
  {
    path: 'server-error',
    component: ErrorPageComponent,
    data: { errorType: 'errorPage' },
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
