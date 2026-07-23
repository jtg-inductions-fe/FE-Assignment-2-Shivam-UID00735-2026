import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '@/core/constants';

export const invalidatorGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const id = route.paramMap.get('id');

  const isValidId = id ? /^\d+$/.test(id) : false;

  if (!isValidId) {
    router.navigate([ROUTES.notFoundPageRoute]);
    return false;
  }

  return true;
};
