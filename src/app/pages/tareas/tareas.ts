import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TareaForm } from '../../components/tarea-form/tarea-form';
import { TareaCard } from '../../components/tarea-card/tarea-card';
import { TareaService } from '../../services/tarea';
import { Tarea } from '../../models/tarea';
import { NotificacionService } from '../../services/notificacion';

@Component({
  selector: 'app-tareas',
  imports: [TareaForm, TareaCard, RouterLink],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css'
})
export class Tareas {
  private tareaService = inject(TareaService);
  private noti = inject(NotificacionService);
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
  this.noti.exito(`Tarea "${tarea.titulo}" creada 🎉`);
}

onEliminar(id: number) {
  const tarea = this.tareas().find(t => t.id === id);
  if (!tarea) return;

  const tareaEliminada = { ...tarea };
  this.tareaService.eliminar(id);

  // El toast con botón "Deshacer"
  this.noti.conAccion(
    `Tarea "${tarea.titulo}" eliminada`,
    'Deshacer',
    () => {
      this.tareaService.agregar(tareaEliminada);
      this.noti.info('Tarea restaurada ↩️');
    }
  );
}

onToggleCompletada(id: number) {
  this.tareaService.toggleCompletada(id);
  
  const tarea = this.tareas().find(t => t.id === id);
  if (tarea) {
    this.noti.info(
      tarea.completada
        ? `✅ "${tarea.titulo}" completada`
        : `⬜ "${tarea.titulo}" marcada como pendiente`
    );
  }
}
}