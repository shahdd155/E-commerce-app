import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  //ay logic 5as bel request aktbo hena


if(localStorage.getItem('token')){
  if(req.url.includes('orders')|| req.url.includes('cart')||req.url.includes('wishlist')){
    req=req.clone({
      setHeaders:{
        token:localStorage.getItem('token')!
      }
    })
  }
}
  return next(req); //ay logic 5as bel res aktbo ganb el retutn
};
