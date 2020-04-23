import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {

    constructor() {}
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = window.localStorage.getItem('token');
        if (token) {
              const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
              });
              const modifiedReq = req.clone({headers});
              return next.handle(modifiedReq);
            } else {
              return next.handle(req);
            }
          }}
