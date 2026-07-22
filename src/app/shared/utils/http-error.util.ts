import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export const handleHttpError = (error: HttpErrorResponse) => {
  return throwError(() => new Error('Something went wrong. Please try again'));
};
