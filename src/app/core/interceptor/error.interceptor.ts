import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private router = inject(Router);
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse | Error) => {
        if (err instanceof HttpErrorResponse && err.status >= 500) {
          this.router.navigateByUrl('/server-error');
        } else {
          console.log('Not a httpErrorResponse', err);
        }
        return throwError(() => err);
      }),
    );
  }
}
