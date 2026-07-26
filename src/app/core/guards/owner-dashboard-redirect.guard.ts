import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@/core/services';
import { ROUTES } from '@/core/constants';

export const ownerDashboardRedirectGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getCurrentUserRole() === 'owner') {
    const restaurantIds = authService.getOwnersRestaurantIds() ?? [];

    if (restaurantIds.length === 0) {
      router.navigate([ROUTES.notFoundPageRoute]);
      return false;
    }

    router.navigate([ROUTES.dashboardPageRoute, restaurantIds[0]]);
    return false;
  }

  return true;
};
