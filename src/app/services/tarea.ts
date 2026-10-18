import { Injectable, signal, computed } from '@angular/core';
import { Tarea } from '../models/tarea';

@Injectable({ providedIn: 'root' })
export class TareaService {
  private _tareas = signal<Tarea[]>([
    { id: 1, titulo: 'Aprender Angular', completada: true,  prioridad: 'alta' },
    { id: 2, titulo: 'Hacer ejercicio',  completada: false, prioridad: 'media' },
    { id: 3, titulo: 'Leer un libro',    completada: false, prioridad: 'baja' }
  ]);

  tareas = this._tareas.asReadonly();

  totalPendientes = computed(() =>
    this._tareas().filter(t => !t.completada).length
  );

  // Devuelve una tarea por id (o undefined si no existe)
  obtenerPorId(id: number): Tarea | undefined {
    return this._tareas().find(t => t.id === id);
  }

  agregar(tarea: Tarea) {
    this._tareas.update(lista => [tarea, ...lista]);
  }

  eliminar(id: number) {
    this._tareas.update(lista => lista.filter(t => t.id !== id));
  }

  toggleCompletada(id: number) {
    this._tareas.update(lista =>
      lista.map(t => t.id === id ? { ...t, completada: !t.completada } : t)
    );
  }
}