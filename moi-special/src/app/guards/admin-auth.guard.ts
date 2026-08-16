import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const adminAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  if (authService.isSuperAdmin()) {
    return true;
  }

  toastService.showAdmin('Bu sayfaya yalnızca Yetkili Süper Yönetici (Abdullah Keklik) erişebilir.', 'Yetkisiz Erişim Engellendi 🔒');
  router.navigate(['/']);
  return false;
};
