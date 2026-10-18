import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {
  nombre = signal('');
  mensaje = signal('');
  enviado = signal(false);

  enviar() {
    if (!this.nombre() || !this.mensaje()) return;
    this.enviado.set(true);
    // Aquí luego conectarías con un backend real
  }

  resetear() {
    this.nombre.set('');
    this.mensaje.set('');
    this.enviado.set(false);
  }
}