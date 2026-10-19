import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificacionService {
  private snackBar = inject(MatSnackBar);

  private baseConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  };

  exito(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      ...this.baseConfig,
      panelClass: ['snack-exito']
    });
  }

  error(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      ...this.baseConfig,
      panelClass: ['snack-error']
    });
  }

  info(mensaje: string) {
    this.snackBar.open(mensaje, 'OK', {
      ...this.baseConfig,
      panelClass: ['snack-info']
    });
  }

  conAccion(mensaje: string, accion: string, callback: () => void) {
    const ref = this.snackBar.open(mensaje, accion, {
      ...this.baseConfig,
      duration: 5000,
      panelClass: ['snack-info']
    });

    ref.onAction().subscribe(() => callback());
  }
}