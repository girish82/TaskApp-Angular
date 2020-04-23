import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  login = 'login';

  constructor(private taskService: TaskService) {
        this.taskService.isUserLoggedIn.subscribe( value => {
          this.login = value ? 'logout' : 'login';
      });
   }

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
