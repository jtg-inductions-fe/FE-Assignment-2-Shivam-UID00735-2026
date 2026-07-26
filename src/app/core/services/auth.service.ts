import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, map } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { ROUTES } from '@/core/constants';

import { User, UserRole } from '@/models';

import { API_URL, AUTH_CONSTANTS } from '@/core/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private router = inject(Router);

  private usersDataURL = API_URL.usersDataURL;
  private userSubject = new BehaviorSubject<Omit<User, 'password'> | null>(
    this.getInitialUser(),
  );

  currentUser$ = this.userSubject.asObservable();

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersDataURL);
  }

  validateUser(email: string, password: string): Observable<boolean> {
    return this.getUsers().pipe(
      map((users) => {
        if (!users) {
          return false;
        }
        const user = users.find(
          (user) => user.email === email && user.password === password,
        );
        if (!user) {
          return false;
        }
        this.userSubject.next(user);
        this.cookieService.set(
          AUTH_CONSTANTS.COOKIE_USER_SESSION_KEY,
          JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            restaurantIds: user.restaurantIds,
          }),
          {
            path: '/',
            expires: 7,
          },
        );

        return true;
      }),
    );
  }

  isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }

  logout(): void {
    this.userSubject.next(null);
    this.cookieService.delete(AUTH_CONSTANTS.COOKIE_USER_SESSION_KEY, '/');
    this.router.navigateByUrl(ROUTES.loginPageRoute);
  }

  private getInitialUser(): Omit<User, 'password'> | null {
    const cookieValue = this.cookieService.get(
      AUTH_CONSTANTS.COOKIE_USER_SESSION_KEY,
    );

    if (!cookieValue) return null;

    try {
      return JSON.parse(cookieValue);
    } catch {
      this.cookieService.delete(AUTH_CONSTANTS.COOKIE_USER_SESSION_KEY, '/');
      return null;
    }
  }

  getOwnersRestaurantIds(): number[] | null {
    const user = this.userSubject.value;
    if (!user) {
      return null;
    }
    return user.restaurantIds ?? null;
  }

  getCurrentUserRole(): UserRole {
    return this.userSubject.value?.role ?? null;
  }

  getCurrentUser(): Omit<User, 'password'> | null {
    return this.userSubject.value;
  }
}
