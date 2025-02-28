import { inject, PLATFORM_ID } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  const router= inject(Router)
  

  const  pLATFORM_ID = inject(PLATFORM_ID);
  if(platformBrowser()){
    const token=localStorage.getItem('token');

    if(token){
      router.navigate(['/home'])
      return false
    }
  
    else{
      return true
    }
  }
  else{
    return false;
  }
 
};
