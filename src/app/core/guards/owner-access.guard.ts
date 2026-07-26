import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@/core/services/auth.service';
import { ROUTES } from '@/core/constants';

export const ownerAccessGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const rawId = route.paramMap.get('id');
  const restaurantId = Number(rawId);

  if (
    !rawId ||
    rawId.trim() === '' ||
    !Number.isInteger(restaurantId) ||
    restaurantId < 0
  ) {
    router.navigate([ROUTES.notFoundPageRoute]);
    return false;
  }

  if (authService.getCurrentUserRole() === 'owner') {
    const restaurantIds = authService.getOwnersRestaurantIds() ?? [];

    if (restaurantIds.length === 0) {
      router.navigate([ROUTES.notFoundPageRoute]);
      return false;
    }

    if (restaurantIds.includes(restaurantId)) {
      return true;
    }

    router.navigate([ROUTES.dashboardPageRoute, restaurantIds[0]]);
    return false;
  }

  return true;
};
