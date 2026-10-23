import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({ providedIn: 'root' })
export class UsuarioCrudService {
  private http = inject(HttpClient);
 private readonly API = '/api/usuarios.php';

  // Usamos el User-Agent en lugar del header personalizado
  private headers = new HttpHeaders({
    'User-Agent': 'Mozilla/5.0 (compatible; Angular-App/1.0)'
  });

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API, { headers: this.headers });
  }

  crear(usuario: Usuario): Observable<any> {
    return this.http.post(this.API, usuario, { headers: this.headers });
  }

  actualizar(usuario: Usuario): Observable<any> {
    return this.http.put(this.API, usuario, { headers: this.headers });
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.API}?id=${id}`, { headers: this.headers });
  }
}