import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { handleHttpError } from '@/shared/utils/http-error.util';
import { loginPageRoute } from '@/core/constants/routes.constants';
import { User } from '@/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private route = inject(Router);

  private usersDataURL = 'assets/data/users.json';
  private userSubject = new BehaviorSubject<Omit<User, 'password'> | null>(
    this.getInitialUser(),
  );
  currentUser$ = this.userSubject.asObservable();

  // fetching users data
  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.usersDataURL)
      .pipe(catchError((err) => handleHttpError(err)));
  }

  // this function is validating the email and password which are coming from the form, and after validating store the data in cookie
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
          'loggedInUser',
          JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
          }),
        );

        return true;
      }),
      catchError(() => of(false)),
    );
  }

  // check the user is logged in or not
  isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }

  // this function redirect to logged in User and deleting the cookie and make user subject null
  logout() {
    this.userSubject.next(null);

    this.cookieService.delete('loggedInUser', '/');
    this.route.navigateByUrl(loginPageRoute);
  }

  private getInitialUser(): Omit<User, 'password'> | null {
    const cookieValue = this.cookieService.get('loggedInUser');

    if (!cookieValue) return null;

    try {
      return JSON.parse(cookieValue);
    } catch {
      this.cookieService.delete('loggedInUser');
      return null;
    }
  }
}
