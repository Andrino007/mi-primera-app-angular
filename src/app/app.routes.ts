import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest-guard';

// Layout Privado
import { PrivateLayout } from './layouts/private-layout/private-layout';

// Páginas
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { Dashboard } from './pages/dashboard/dashboard';
import { CrudUsuarios } from './pages/crud-usuarios/crud-usuarios';
import { Tareas } from './pages/tareas/tareas';
import { TareaDetalle } from './pages/tarea-detalle/tarea-detalle'; // Asegúrate de importarlo
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  // Públicas
  { path: '', component: Home, title: 'Inicio' },
  { path: 'login', component: Login, title: 'Login', canActivate: [guestGuard] },
  { path: 'registro', component: Registro, title: 'Registro', canActivate: [guestGuard] },

  // Privadas (Layout con sidebar)
  {
    path: 'app',
    component: PrivateLayout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard, title: 'Dashboard' },
      { path: 'crud-usuarios', component: CrudUsuarios, title: 'Usuarios' },
      { path: 'tareas', component: Tareas, title: 'Tareas' },
      // 👇 ESTA ES LA RUTA QUE TE FALTA O ESTÁ MAL
      { path: 'tareas/:id', component: TareaDetalle, title: 'Detalle de Tarea' }, 
    ]
  },

  // 404
  { path: '**', component: NotFound, title: 'No encontrado' }
];