import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { notFoundPageRoute } from '../constants/routes.constants';

export const invalidatorGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const id = route.paramMap.get('id');

  const isValidId = id ? /^\d+$/.test(id) : false;

  if (!isValidId) {
    router.navigate([notFoundPageRoute]);
    return false;
  }

  return true;
};
