import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormGroup
} from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  private fb = new FormBuilder();

  // Estado de UI
  enviando = signal(false);
  exito = signal(false);

  // El formulario reactivo
  form = this.fb.group(
    {
      nombre: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordFuerte()
      ]],
      confirmar: ['', [
        Validators.required
      ]],
      edad: [null as number | null, [
        Validators.required,
        Validators.min(18),
        Validators.max(120)
      ]],
      terminos: [false, [
        Validators.requiredTrue
      ]]
    },
    {
      validators: this.passwordsIguales('password', 'confirmar')
    }
  );

  // ───────── Validadores personalizados ─────────

  /**
   * Verifica que la contraseña tenga mayúscula, minúscula y número.
   */
  private passwordFuerte() {
    return (control: AbstractControl): ValidationErrors | null => {
      const valor = control.value as string;
      if (!valor) return null;

      const tieneMayuscula = /[A-Z]/.test(valor);
      const tieneMinuscula = /[a-z]/.test(valor);
      const tieneNumero    = /\d/.test(valor);

      const errores: ValidationErrors = {};
      if (!tieneMayuscula) errores['sinMayuscula'] = true;
      if (!tieneMinuscula) errores['sinMinuscula'] = true;
      if (!tieneNumero)    errores['sinNumero'] = true;

      return Object.keys(errores).length ? errores : null;
    };
  }

  /**
   * Verifica que dos campos coincidan (a nivel de grupo).
   */
  private passwordsIguales(campo1: string, campo2: string) {
    return (group: AbstractControl): ValidationErrors | null => {
      const p1 = group.get(campo1)?.value;
      const p2 = group.get(campo2)?.value;
      if (!p1 || !p2) return null;
      return p1 === p2 ? null : { noCoinciden: true };
    };
  }

  // ───────── Helpers para el template ─────────

  /**
   * Marca todos los campos como touched para mostrar errores
   * cuando el usuario intenta enviar con el form inválido.
   */
  private marcarTodoComoTouched() {
    Object.values(this.form.controls).forEach(c => {
      c.markAsTouched();
    });
  }

  /**
   * Comprueba si un campo tiene un error específico Y ya fue tocado.
   */
  tieneError(campo: string, error: string): boolean {
    const control = this.form.get(campo);
    return !!(control?.touched && control?.hasError(error));
  }

  /**
   * Devuelve true si el campo es inválido y fue tocado.
   */
  campoInvalido(campo: string): boolean {
    const control = this.form.get(campo);
    return !!(control?.touched && control?.invalid);
  }

  // ───────── Envío ─────────

  enviar() {
    this.marcarTodoComoTouched();

    if (this.form.invalid) {
      console.warn('Formulario inválido');
      return;
    }

    this.enviando.set(true);

    // Simula una petición HTTP (aquí iría tu POST al backend)
    setTimeout(() => {
      console.log('Datos enviados:', this.form.value);
      this.enviando.set(false);
      this.exito.set(true);
      this.form.reset();
    }, 1500);
  }

  resetear() {
    this.form.reset();
    this.exito.set(false);
  }
}