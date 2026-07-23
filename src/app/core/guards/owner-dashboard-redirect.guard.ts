import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@/core/services';
import { ROUTES } from '@/core/constants';

// !Created New Guard to redirect to dashboard page
export const ownerDashboardRedirectGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getCurrentUserRole() === 'owner') {
    const restaurantId = authService.getOwnersRestaurantIds()?.[0];
    if (restaurantId) {
      router.navigate([ROUTES.dashboardPageRoute, restaurantId]);
      return false;
    }
  }
  return true;
};
