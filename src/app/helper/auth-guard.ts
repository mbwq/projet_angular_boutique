import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const adminToken = localStorage.getItem('admin_token');

  if(adminToken) {
    return true;
  } else {
    console.warn('Accès refusé: inconnu');
    router.navigate(['/Login']);
    return false;
  }
};
