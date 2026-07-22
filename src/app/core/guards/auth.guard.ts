import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { loginPageRoute } from '../constants/routes.constants';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const getSession = cookieService.get('loggedInUser');

  if (getSession) {
    return true;
  }
  router.navigate([loginPageRoute]);
  return false;
};
