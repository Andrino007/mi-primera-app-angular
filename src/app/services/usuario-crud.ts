import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({ providedIn: 'root' })
export class UsuarioCrudService {
  private http = inject(HttpClient);
  // Ajusta la URL según tu servidor (MAMP usa 8888, XAMPP usa 80)
  private readonly API = 'http://localhost:8888/api-crud/usuarios.php';

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API);
  }

  crear(usuario: Usuario): Observable<any> {
    return this.http.post(this.API, usuario);
  }

  actualizar(usuario: Usuario): Observable<any> {
    return this.http.put(this.API, usuario);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.API}?id=${id}`);
  }
}