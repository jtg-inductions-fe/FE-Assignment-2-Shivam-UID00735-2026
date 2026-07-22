import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class MainInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse | Error) => {
        if (err instanceof HttpErrorResponse) {
          console.log('Server side error', err);
        } else {
          console.log('Not a httpErrorResponse', err);
        }
        return throwError(() => err);
      }),
    );
  }
}
