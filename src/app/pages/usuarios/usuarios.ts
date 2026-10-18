import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { UsuarioService, Usuario } from '../../services/usuario';

@Component({
  selector: 'app-usuarios',
  imports: [],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class Usuarios implements OnInit {
  private usuarioService = inject(UsuarioService);

  usuarios = signal<Usuario[]>([]);
  cargando = signal(true);
  error = signal<string | null>(null);
  filtro = signal('');

  usuariosFiltrados = computed(() => {
    const texto = this.filtro().toLowerCase().trim();
    if (!texto) return this.usuarios();

    return this.usuarios().filter(u =>
      u.name.toLowerCase().includes(texto) ||
      u.email.toLowerCase().includes(texto)
    );
  });

  total = computed(() => this.usuariosFiltrados().length);

  ngOnInit() { this.cargarUsuarios(); }

  cargarUsuarios() {
    this.cargando.set(true);
    this.error.set(null);

    this.usuarioService.listar().subscribe({
      next: (data) => { this.usuarios.set(data); this.cargando.set(false); },
      error: () => { this.error.set('No se pudieron cargar los usuarios.'); this.cargando.set(false); }
    });
  }

  actualizarFiltro(event: Event) {
    this.filtro.set((event.target as HTMLInputElement).value);
  }

  limpiarFiltro() { this.filtro.set(''); }
}