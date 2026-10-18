import { Component, input, inject, computed } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { TareaService } from '../../services/tarea';

@Component({
  selector: 'app-tarea-detalle',
  imports: [RouterLink],
  templateUrl: './tarea-detalle.html',
  styleUrl: './tarea-detalle.css'
})
export class TareaDetalle {
  private tareaService = inject(TareaService);
  private router = inject(Router);  // ← nuevo

  id = input<string>('');

  tarea = computed(() => {
    const idNum = Number(this.id());
    if (isNaN(idNum)) return undefined;
    return this.tareaService.obtenerPorId(idNum);
  });

  toggleCompletada() {
    const t = this.tarea();
    if (t) this.tareaService.toggleCompletada(t.id);
  }

  eliminar() {
    const t = this.tarea();
    if (!t) return;
    this.tareaService.eliminar(t.id);
    this.router.navigate(['/tareas']);  // ← navega al listado
  }
}