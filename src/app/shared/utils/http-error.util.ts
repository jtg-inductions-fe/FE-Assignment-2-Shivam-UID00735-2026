import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export const handleHttpError = (error: HttpErrorResponse) => {
  // logging during development remove after project will complete
  console.log('An error occurred', error.message);

  return throwError(() => new Error('Something went wrong. Please try again'));
};
