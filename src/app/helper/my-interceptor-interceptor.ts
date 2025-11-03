import { HttpInterceptorFn } from '@angular/common/http';
import { HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpHandlerFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const myInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // Récupérer les deux tokens
  const userToken = localStorage.getItem('token');
  const adminToken = localStorage.getItem('admin_token');
  let authReq = req;

  if(req.url.includes('/api/admin')) {
    if (adminToken) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${JSON.parse(adminToken)}`},
      });
    } else {
      router.navigate(['/Login']);
      return next(req);
    }
  } else if (userToken) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${JSON.parse(userToken)}`},
    });
  }

  return next(authReq).pipe(
    tap(event => {
      if (event.type === HttpEventType.Response) {
        console.log(`[${req.url}] → ${event.status}`);
      }
    })
  );

  console.log(req.url);
  return next(req);
};


/*export function myInterceptorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  return next(req).pipe(tap(event => {
    if (event.type === HttpEventType.Response) {
      console.log(req.url, 'returned a response with status', event.status);
    }
  }));
}*/