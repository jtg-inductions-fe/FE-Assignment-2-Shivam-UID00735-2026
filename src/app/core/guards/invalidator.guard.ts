import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '@/core/constants';

export const invalidatorGuard: CanActivateFn = (route) => {
  const router = inject(Router);

  const rawId = route.paramMap.get('id');
  const id = Number(rawId);

  if (!rawId || rawId.trim() === '' || !Number.isInteger(id) || id < 0) {
    router.navigate([ROUTES.notFoundPageRoute]);
    return false;
  }

  return true;
};
