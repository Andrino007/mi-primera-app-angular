import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TareaForm } from '../../components/tarea-form/tarea-form';
import { TareaCard } from '../../components/tarea-card/tarea-card';
import { TareaService } from '../../services/tarea';
import { Tarea } from '../../models/tarea';

@Component({
  selector: 'app-tareas',
  imports: [TareaForm, TareaCard, RouterLink],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css'
})
export class Tareas {
  private tareaService = inject(TareaService);

  // Expone el servicio al template
  tareas = this.tareaService.tareas;
  totalPendientes = this.tareaService.totalPendientes;

  filtro = signal<'todas' | 'pendientes' | 'completadas'>('todas');

  tareasFiltradas = computed(() => {
    const f = this.filtro();
    const lista = this.tareas();

    switch (f) {
      case 'pendientes':  return lista.filter(t => !t.completada);
      case 'completadas': return lista.filter(t => t.completada);
      default:            return lista;
    }
  });

  onTareaCreada(tarea: Tarea) {
    this.tareaService.agregar(tarea);
  }

  onEliminar(id: number) {
    this.tareaService.eliminar(id);
  }

  onToggleCompletada(id: number) {
    this.tareaService.toggleCompletada(id);
  }
}