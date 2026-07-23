import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from '@/core/services/auth.service';
import { inject } from '@angular/core';

import { notFoundPageRoute } from '../constants/routes.constants';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getCurrentUserRole() !== 'admin') {
    router.navigate([notFoundPageRoute]);
  }

  return true;
};
