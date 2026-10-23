import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({ providedIn: 'root' })
export class UsuarioCrudService {
  private http = inject(HttpClient);
  // ⚠️ Asegúrate de que esta URL tenga /api-crud/ si el archivo está ahí
  private readonly API = 'https://pep-richly-arrogant.ngrok-free.dev/api-crud/usuarios.php';

  // Este header evita que Ngrok bloquee la petición de Angular
  private headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
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