import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  let tokenData;
  const router = inject(Router);

  if (typeof window !== 'undefined') {
    try {
      tokenData = sessionStorage.getItem("userData");
    } catch (error) {
      console.error('Error accessing sessionStorage:', error);
    }
  }

  let token = tokenData ? JSON.parse(tokenData) : null;
  const authToken = token?.token;
  console.log(authToken);

  if (!authToken) {
    console.error('Token is null or invalid');
    return next(req);
  }

  const skipIntercept = ['/refreshToken', '/login'].some(url => req.url.includes(url));
  if (skipIntercept) {
    return next(req);
  }

  // Add both Authorization and custom headers
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${authToken}`,
    'ngrok-skip-browser-warning': '69420'
  });

  const authReq = req.clone({ headers });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.error('Token expired or unauthorized. Redirecting to login.');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
}
