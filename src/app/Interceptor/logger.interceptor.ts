import { HttpInterceptorFn } from '@angular/common/http';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`Interceptor ${req.url}`);
  let tokenData;

  if (typeof window !== 'undefined') {
    tokenData = sessionStorage.getItem("userData");
  }

  let token = tokenData?JSON.parse(tokenData): null;
  console.log(token);

  if(token){
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token.token}`)
    })
    return next(authReq);
  }
    else {
      console.error('Token is null or invalid');
      return next(req);
    }
}
