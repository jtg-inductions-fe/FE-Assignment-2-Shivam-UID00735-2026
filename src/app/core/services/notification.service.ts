import { Injectable, inject } from '@angular/core';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  showSuccessMessage(message: string, action: string): void {
    this.openSnackBar(message, action, 'success-snackbar');
  }

  showErrorMessage(message: string, action: string): void {
    this.openSnackBar(message, action, 'error-snackbar');
  }

  private openSnackBar(message: string, action: string, panelClass: string) {
    this.snackBar.open(message, action, {
      ...this.defaultConfig,
      panelClass: [panelClass],
    });
  }

  private defaultConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  };
}
