import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signIn = true;
  signInLabel = 'Sign In';
  regLabel = 'Register';
  success = true;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    console.log('reload')
  }

  onSubmit(data: NgForm) {
    const success = false;
    this.taskService.userLogin(data.value)
     .subscribe((res: any) => {
        if (res.token) {
          window.localStorage.setItem('token', res.token);
          this.taskService.getUser()
            .subscribe((user: any) => {
              this.success = true;
            },
            (error) => console.log(error));

        }
    }, (error) => {
      this.success = false;
    });



    // console.log(this.taskService.User);
  }

  signUp() {
    this.signIn = !this.signIn;
    if (this.signIn === true) {
      this.signInLabel = 'Sign In';
      this.regLabel = 'Register';
    } else {
      this.signInLabel = 'Register';
      this.regLabel = 'Sign In';
    }
  }
}
