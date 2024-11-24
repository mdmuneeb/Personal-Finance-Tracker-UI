import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  // Add the 'ngrok-skip-browser-warning' header to every request
  let headers = req.headers.set('ngrok-skip-browser-warning', '69420');

  // Retrieve token from sessionStorage
  let tokenData;
  let token;
  let authToken;
  try {
    tokenData = sessionStorage.getItem('userData');
  } catch (error) {
    console.error('Error accessing sessionStorage:', error);
  }
  if (typeof window !== 'undefined'){

    token = tokenData ? JSON.parse(tokenData) : null;
    authToken = token?.token;
  }

  console.log('Auth Token:', authToken);  // Log token for debugging

  // If there's an authToken, add it to the headers
  if (authToken) {
    headers = headers.set('Authorization', `Bearer ${authToken}`);
  }

  // Log the final headers and request URL for debugging
  console.log('Request URL:', req.url);
  console.log('Request Headers:', headers);

  // Clone the request with the updated headers
  const authReq = req.clone({ headers });

  // Proceed with the request
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.log('Token expired or unauthorized. Redirecting to login.');
        router.navigate(['/loginPage']);
      }
      // Log the error for debugging
      console.error('Request error:', error);
      return throwError(() => error);
    })
  );
};
