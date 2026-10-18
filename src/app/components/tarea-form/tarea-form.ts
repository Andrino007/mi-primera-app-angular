import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tarea } from '../../models/tarea';

@Component({
  selector: 'app-tarea-form',
  imports: [FormsModule],
  templateUrl: './tarea-form.html',
  styleUrl: './tarea-form.css'
})
export class TareaForm {
  // 🔼 Salida: emite la tarea al padre cuando se crea
  tareaCreada = output<Tarea>();

  // Estado local
  titulo = signal('');
  prioridad = signal<'baja' | 'media' | 'alta'>('media');

  crear() {
    const tituloLimpio = this.titulo().trim();
    if (!tituloLimpio) return;

    this.tareaCreada.emit({
      id: Date.now(),
      titulo: tituloLimpio,
      completada: false,
      prioridad: this.prioridad()
    });

    // Reset
    this.titulo.set('');
    this.prioridad.set('media');
  }
}