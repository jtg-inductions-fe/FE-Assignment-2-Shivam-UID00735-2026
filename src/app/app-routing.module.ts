import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard, guestGuard } from '@/core/guards';

import { ROUTES } from '@/core/constants/routes.constants';
import { DashboardComponent } from '@/features/dashboard/dashboard.component';
import { ErrorPageComponent } from '@/shared/components/error-page/error-page.component';
import { LoginComponent } from './features/auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROUTES.dashboardPageRoute,
  },
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
    path: 'server-error',
    component: ErrorPageComponent,
    data: { errorType: 'errorPage' },
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
