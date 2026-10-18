import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.autenticado()) {
    return true;  // ✅ No logueado → puede ver el login
  }

  router.navigate(['/dashboard']);
  return false;
};