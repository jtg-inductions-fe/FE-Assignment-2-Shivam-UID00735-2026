import { CanActivateFn } from '@angular/router';
import { AuthService } from '@/core/services/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { ROUTES } from '@/core/constants';

export const ownerAccessGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const restaurantId = Number(route.paramMap.get('id'));

  if (isNaN(restaurantId)) {
    router.navigate([ROUTES.notFoundPageRoute]);
    return false;
  }

  if (authService.getCurrentUserRole() === 'owner') {
    const restaurantIds = authService.getOwnersRestaurantIds() ?? [];

    if (restaurantIds.includes(restaurantId)) {
      return true;
    }

    router.navigate([ROUTES.dashboardPageRoute, restaurantIds[0]]);
    return false;
  }

  return true;
};
