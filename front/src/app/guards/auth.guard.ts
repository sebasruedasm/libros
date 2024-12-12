import { inject } from '@angular/core';
import { CanActivateFn , Router} from '@angular/router';
import {of} from "rxjs";
// import { Router } from 'express';

export const authGuard: CanActivateFn = (route, state) => { //PARA PROTEGER LAS RUTAS

  let token = localStorage.getItem("token");
  const router =inject(Router);

  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    // const token = localStorage.getItem("token");

    if (!token) {
      router.navigateByUrl('login').then();
      return of(false);
    }

    return of(true);
  } else {
    router.navigateByUrl('login').then();
    return of(false);
  }




};
