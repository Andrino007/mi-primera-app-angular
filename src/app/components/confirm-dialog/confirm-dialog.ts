import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDialogData {
  titulo: string;
  mensaje: string;
  textoAceptar?: string;
  textoCancelar?: string;
  color?: 'primary' | 'warn';
  icono?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title class="titulo">
      @if (data.icono) {
        <mat-icon [class]="data.color === 'warn' ? 'icon-warn' : 'icon-primary'">
          {{ data.icono }}
        </mat-icon>
      }
      {{ data.titulo }}
    </h2>

    <mat-dialog-content class="contenido">
      {{ data.mensaje }}
    </mat-dialog-content>

    <mat-dialog-actions align="end" class="acciones">
      <button mat-button (click)="cancelar()">
        {{ data.textoCancelar ?? 'Cancelar' }}
      </button>
      <button
        mat-flat-button
        [color]="data.color ?? 'primary'"
        (click)="aceptar()">
        {{ data.textoAceptar ?? 'Aceptar' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .titulo {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .icon-warn    { color: #dc3545; }
    .icon-primary { color: #3f51b5; }
    .contenido {
      color: #555;
      line-height: 1.5;
      padding-top: 8px;
    }
    .acciones { padding-top: 16px; }
  `]
})
export class ConfirmDialog {
  dialogRef = inject(MatDialogRef<ConfirmDialog, boolean>);
  data: ConfirmDialogData = inject(MAT_DIALOG_DATA);

  aceptar() {
    this.dialogRef.close(true);
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}