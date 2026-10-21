import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialog, ConfirmDialogData } from '../components/confirm-dialog/confirm-dialog';

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  private dialog = inject(MatDialog);

  abrir(data: ConfirmDialogData): Observable<boolean> {
    const ref = this.dialog.open(ConfirmDialog, {
      width: '420px',
      data,
      autoFocus: 'dialog',
      restoreFocus: false
    });
    return ref.afterClosed();
  }

  // Helpers semánticos
  confirmarEliminar(nombre: string): Observable<boolean> {
    return this.abrir({
      titulo: 'Eliminar elemento',
      mensaje: `¿Estás seguro que quieres eliminar "${nombre}"? Esta acción no se puede deshacer.`,
      textoAceptar: 'Sí, eliminar',
      textoCancelar: 'Cancelar',
      color: 'warn',
      icono: 'warning'
    });
  }
}