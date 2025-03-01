import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router= inject(Router);

   const  pLATFORM_ID = inject(PLATFORM_ID);

   if(isPlatformBrowser(pLATFORM_ID)){
    const token=localStorage.getItem('token');
    if(token){
      return true;
     }else{
      router.navigate(['/']);
      return false;
     }
   }
else{
  return true;
}
 

};
