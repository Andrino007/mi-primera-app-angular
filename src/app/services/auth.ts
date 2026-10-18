import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  usuario: Usuario;
}

const TOKEN_KEY = 'auth_token';
const USER_KEY  = 'auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);

  private _usuario = signal<Usuario | null>(this.leerUsuarioGuardado());
  private _token   = signal<string | null>(localStorage.getItem(TOKEN_KEY));

  usuario = this._usuario.asReadonly();
  token   = this._token.asReadonly();
  autenticado = computed(() => this._usuario() !== null && this._token() !== null);

  // 🔥 VERSIÓN MOCK — sin backend, sin MySQL
  login(usuario: string, password: string): Observable<LoginResponse> {
    const usuariosMock = [
      { usuario: 'admin', password: '123456',   id: 1, email: 'admin@test.com' },
      { usuario: 'maria', password: 'password', id: 2, email: 'maria@test.com' },
      { usuario: 'juan',  password: 'qwerty',   id: 3, email: 'juan@test.com' }
    ];

    const encontrado = usuariosMock.find(
      u => u.usuario === usuario && u.password === password
    );

    // Simula latencia de red de 800ms usando timer
    return timer(800).pipe(
      switchMap(() => {
        if (!encontrado) {
          return throwError(() => ({ status: 401 }));
        }

        const res: LoginResponse = {
          token: 'mock-token-' + Date.now(),
          usuario: {
            id: encontrado.id,
            nombre: encontrado.usuario,
            email: encontrado.email
          }
        };
        return of(res);
      }),
      tap(res => this.guardarSesion(res))
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._usuario.set(null);
    this._token.set(null);
    this.router.navigate(['/login']);
  }

  private guardarSesion(res: LoginResponse): void {
    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.usuario));
    this._token.set(res.token);
    this._usuario.set(res.usuario);
  }

  private leerUsuarioGuardado(): Usuario | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }
}