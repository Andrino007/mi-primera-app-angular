import { Injectable, signal, computed, effect } from '@angular/core';
import { Tarea } from '../models/tarea';

@Injectable({ providedIn: 'root' })
export class TareaService {
  // Leer del localStorage al iniciar
  private _tareas = signal<Tarea[]>(
    JSON.parse(localStorage.getItem('tareas') || '[]')
  );

  tareas = this._tareas.asReadonly();

  constructor() {
    // Cada vez que las tareas cambien, guardarlas en el localStorage
    effect(() => {
      localStorage.setItem('tareas', JSON.stringify(this._tareas()));
    });
  }

  totalPendientes = computed(() => this._tareas().filter(t => !t.completada).length);

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