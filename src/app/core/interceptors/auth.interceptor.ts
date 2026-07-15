import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

// Un interceptor funcional se ejecuta para TODA petición HTTP saliente.
// Aquí adjuntamos el JWT guardado en localStorage, así ningún componente
// tiene que acordarse de enviarlo manualmente.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(Auth).obtenerToken();

  if (!token) {
    return next(req);
  }

  const peticionConToken = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });
  return next(peticionConToken);
};
