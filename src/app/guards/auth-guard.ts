import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.autenticado()) {
    return true;  // ✅ Deja pasar
  }

  // ❌ Redirige al login guardando la URL intentada
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};