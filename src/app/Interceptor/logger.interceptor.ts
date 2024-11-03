import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  // console.log(`Interceptor ${req.url}`);
  let tokenData;
  const router = inject(Router);

  if (typeof window !== 'undefined') {
    // tokenData = sessionStorage.getItem("userData");
    try {
      tokenData = sessionStorage.getItem("userData");
    } catch (error) {
      console.error('Error accessing sessionStorage:', error);
    }
  }

  // let token = tokenData?JSON.parse(tokenData): null;
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

  // if(token){
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token.token}`)
  })
  // return next(authReq);
  // }
  //   else {
  //     console.error('Token is null or invalid');
  //     return next(req);
  //   }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.error('Token expired or unauthorized. Redirecting to login.');
        // Navigate to login page
        router.navigate(['/login']);
      }
      return throwError(() => error); // Rethrow the error after handling
    })
  );
}
