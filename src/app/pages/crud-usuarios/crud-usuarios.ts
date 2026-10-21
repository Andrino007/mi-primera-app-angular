import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
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
  imports: [
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule,
    MatInputModule, 
    MatFormFieldModule, 
    MatButtonModule, 
    MatIconModule
  ],
  templateUrl: './crud-usuarios.html',
  styleUrl: './crud-usuarios.css'
})
export class CrudUsuarios implements OnInit, AfterViewInit {
  private service = inject(UsuarioCrudService);
  private dialog = inject(MatDialog);
  private noti = inject(NotificacionService);

  // 1. Fuente de datos de Material (reemplaza al signal)
  dataSource = new MatTableDataSource<Usuario>([]);
  columnas = ['id', 'nombre', 'email', 'rol', 'acciones'];

  // 2. Referencias para ordenar y paginar
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.cargarDatos();
  }

  // 3. Conectamos el Sort y el Paginator (esto va aquí, no en ngOnInit)
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    // Filtro personalizado
    this.dataSource.filterPredicate = (data: Usuario, filter: string) => {
      const texto = filter.trim().toLowerCase();
      return data.nombre.toLowerCase().includes(texto) ||
             data.email.toLowerCase().includes(texto);
    };
  }

  cargarDatos() {
    this.service.listar().subscribe({
      next: (data) => this.dataSource.data = data,
      error: () => this.noti.error('Error al cargar los usuarios')
    });
  }

  aplicarFiltro(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  abrirFormulario(usuario?: Usuario) {
    const dialogRef = this.dialog.open(UsuarioFormDialog, {
      width: '450px',
      data: usuario || null
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if (!resultado) return;

      if (resultado.id) {
        this.service.actualizar(resultado).subscribe({
          next: () => { this.noti.exito('Usuario actualizado'); this.cargarDatos(); },
          error: () => this.noti.error('Error al actualizar')
        });
      } else {
        this.service.crear(resultado).subscribe({
          next: () => { this.noti.exito('Usuario creado'); this.cargarDatos(); },
          error: () => this.noti.error('Error al crear')
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