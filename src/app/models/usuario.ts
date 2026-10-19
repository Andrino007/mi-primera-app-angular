export interface Usuario {
  id?: number;
  nombre: string;
  email: string;
  telefono?: string;
  rol: 'admin' | 'usuario';
  created_at?: string;
}