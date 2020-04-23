import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, UrlTree, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor() {}
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean  {
          const token = window.localStorage.getItem('token');
          return token ? true : false;
        }
      }
