import { Component, OnInit, Output , EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';

export const User = {
  name : '',
  age : 2
};



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
  selectedFile: File = null;

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
   // console.log('reload');
  }

  onSubmit(data: NgForm) {
    const success = false;
    this.taskService.userLogin(data.value, this.signInLabel)
     .subscribe((res: any) => {
        if (res.token) {
          window.localStorage.setItem('token', res.token);
          this.taskService.getUser()
            .subscribe((user: any) => {
              this.success = true;
              if (this.selectedFile) {
                const fd = new FormData();
                fd.append('avatar', this.selectedFile, this.selectedFile.name);
                this.taskService.uploadImage(fd)
                  .subscribe((out) => console.log(out));
              }
              this.taskService.isUserLoggedIn.next(true);
              this.router.navigate(['/task']);
            },
            (error) => console.log(error));

        }
    }, (error) => {
      this.success = false;
    });
  }

  onFileselect(event) {
    this.selectedFile =  event.target.files[0] as File;
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
