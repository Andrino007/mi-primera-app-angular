import { Component, signal, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioCrudService } from '../../services/usuario-crud';
import { NotificacionService } from '../../services/notificacion';
import { UsuarioFormDialog } from '../../components/usuario-form-dialog/usuario-form-dialog';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-crud-usuarios',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './crud-usuarios.html',
  styleUrl: './crud-usuarios.css'
})
export class CrudUsuarios implements OnInit {
  private service = inject(UsuarioCrudService);
  private dialog = inject(MatDialog);
  private noti = inject(NotificacionService);

  usuarios = signal<Usuario[]>([]);
  columnas = ['id', 'nombre', 'email', 'rol', 'acciones'];

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.service.listar().subscribe({
      next: (data) => this.usuarios.set(data),
      error: () => this.noti.error('Error al cargar los usuarios')
    });
  }

  abrirFormulario(usuario?: Usuario) {
    const dialogRef = this.dialog.open(UsuarioFormDialog, {
      width: '450px',
      data: usuario || null
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (!resultado) return; // Canceló

      if (resultado.id) {
        // Editar
        this.service.actualizar(resultado).subscribe({
          next: () => { this.noti.exito('Usuario actualizado'); this.cargarDatos(); },
          error: () => this.noti.error('Error al actualizar')
        });
      } else {
        // Crear
        this.service.crear(resultado).subscribe({
          next: () => { this.noti.exito('Usuario creado'); this.cargarDatos(); },
          error: () => this.noti.error('Error al crear (¿email duplicado?)')
        });
      }
    });
  }

  eliminar(usuario: Usuario) {
    if (!confirm(`¿Eliminar a ${usuario.nombre}?`)) return;

    this.service.eliminar(usuario.id!).subscribe({
      next: () => { this.noti.info('Usuario eliminado'); this.cargarDatos(); },
      error: () => this.noti.error('Error al eliminar')
    });
  }
}