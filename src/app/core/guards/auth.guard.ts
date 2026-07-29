import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '@/core/services';
import { ROUTES } from '@/core/constants';
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (authService.isLoggedIn()) {
    return true;
  }
  router.navigate([ROUTES.loginPageRoute]);
  return false;
};
