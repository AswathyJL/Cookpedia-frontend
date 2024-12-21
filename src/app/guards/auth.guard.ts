import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  if(sessionStorage.getItem("token")){
    // authorised user
  }
  else{
    alert("Unauthorised access... Please login!!!")
    // navigate to login
    router.navigateByUrl("/login")
    return false
  }
  return true;
};
