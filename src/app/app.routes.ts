import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contacto } from './pages/contacto/contacto';
import { Usuarios } from './pages/usuarios/usuarios';
import { Registro } from './pages/registro/registro';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './guards/auth-guard';
import { guestGuard } from './guards/guest-guard';
import { Tareas } from './pages/tareas/tareas';
import { TareaDetalle } from './pages/tarea-detalle/tarea-detalle';
import { CrudUsuarios } from './pages/crud-usuarios/crud-usuarios';


export const routes: Routes = [
  { path: '',            component: Home,     title: 'Inicio' },
  { path: 'about',       component: About,    title: 'Acerca de' },
  { path: 'tareas',      component: Tareas,   title: 'Mis tareas' },  // ← nueva
  { path: 'tareas/:id',  component: TareaDetalle, title: 'Detalle de tarea' },
  { path: 'crud-usuarios', component: CrudUsuarios, title: 'CRUD Usuarios' },
  { path: 'usuarios',    component: Usuarios, title: 'Usuarios',   canActivate: [authGuard] },
  { path: 'contacto',    component: Contacto, title: 'Contacto',   canActivate: [authGuard] },
  { path: 'registro',    component: Registro, title: 'Registro' },
  { path: 'login',       component: Login,    title: 'Login',      canActivate: [guestGuard] },
  { path: 'crud-usuarios', component: CrudUsuarios, title: 'CRUD Usuarios' },
  { path: 'dashboard',   component: Dashboard, title: 'Mi cuenta', canActivate: [authGuard] },
  { path: '**',          component: NotFound, title: 'No encontrado' }
];