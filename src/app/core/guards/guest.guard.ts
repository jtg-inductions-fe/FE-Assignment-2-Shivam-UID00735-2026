import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '@/core/services';
import { ROUTES } from '@/core/constants';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    router.navigate([ROUTES.dashboardPageRoute]);
    return false;
  }

  return true;
};
