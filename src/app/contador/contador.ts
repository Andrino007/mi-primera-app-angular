import { Component, signal, computed } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-contador',
  styleUrl: './contador.css',
  templateUrl: './contador.html',
})
export class Contador {
  contador = signal(0);

  esPositivo = computed(() => this.contador() > 0);
  esCero = computed(() => this.contador() === 0);
  esNegativo = computed(() => this.contador() < 0);

  incrementar(){
    this.contador.update(valor => valor + 1);
  }
  decrementar() {
    this.contador.update(valor => valor - 1);
  }
  incrementar10(){
    this.contador.update(valor => valor + 10);
  }
  decrementar10(){
    this.contador.update(valor => valor - 10)
  } 

  resetear(){
    this.contador.set(0);
  }

}
