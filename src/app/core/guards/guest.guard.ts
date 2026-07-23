import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@/core/services/auth.service';
import { ROUTES } from '@/core/constants/routes.constants';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    router.navigate([ROUTES.dashboardPageRoute]);
    return false;
  }

  return true;
};
