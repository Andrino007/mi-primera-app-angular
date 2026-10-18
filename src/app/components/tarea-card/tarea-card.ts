import { Component, input, output } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { Tarea } from '../../models/tarea';

@Component({
  selector: 'app-tarea-card',
  imports: [MatCard, MatCardContent, MatIcon, MatIconButton],
  templateUrl: './tarea-card.html',
  styleUrl: './tarea-card.css'
})
export class TareaCard {
  tarea = input.required<Tarea>();
  eliminar = output<number>();
  toggleCompletada = output<number>();

  onEliminar(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.eliminar.emit(this.tarea().id);
  }

  onToggle(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.toggleCompletada.emit(this.tarea().id);
  }
}