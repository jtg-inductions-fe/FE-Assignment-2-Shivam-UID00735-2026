import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from '@/core/services/auth.service';
import { inject } from '@angular/core';

import { ROUTES } from '@/core/constants';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getCurrentUserRole() !== 'admin') {
    return router.parseUrl(`/${ROUTES.notFoundPageRoute}`);
  }

  return true;
};
