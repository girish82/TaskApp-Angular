import { Component, OnInit } from '@angular/core';
import { WrappedNodeExpr } from '@angular/compiler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  login = 'login';

  constructor() { }

  ngOnInit() {
    this.checkLogin();
  }

  checkLogin() {
    const token = window.localStorage.getItem('token');
    this.login = token ? 'logout' : 'login';
  }

  logout() {
    const token = window.localStorage.getItem('token');
    if (token) {
      window.localStorage.removeItem('token');
      this.login = 'login';
    }
  }

}
