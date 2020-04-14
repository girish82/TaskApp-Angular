import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks = [];
  selectedFile: File = null;
  imageUrl;
  user;
  skip = 0;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTask();
    this.getAvatar();
  }

  getTask() {
    this.taskService.getTasks()
    .subscribe((res: any) => {
      this.tasks = res;
    });
  }

  getAvatar() {
    this.taskService.getUserId()
    .subscribe((res: any) => {
        this.imageUrl = 'https://pgirish-task-app.herokuapp.com/users/' + res._id + '/avatar';
        this.user = {
          name : res.name,
          age : res.age
        };
    });
  }

  getUserId() {
    this.taskService.getUserId()
    .subscribe((res: any) => {
        this.imageUrl = 'https://pgirish-task-app.herokuapp.com/users/' + res._id + '/avatar';
        console.log(this.imageUrl);
    });
  }

  onSubmit(data: NgForm) {
    this.taskService.AddTasks(data.value)
      .subscribe((res) => {
        this.getTask();
      });
  }

  deleteTask(id) {
    this.taskService.deleteTasks(id)
    .subscribe((res) => {
      this.getTask();
    });
  }

  editTask() {

  }

  search(status) {
    this.taskService.searchTasks(status)
    .subscribe((res: any) => {
         this.tasks = res;
    }, error => console.log(error));
  }

  onFileselect(event) {
    this.selectedFile =  event.target.files[0] as File;
    if (this.selectedFile) {
      const fd = new FormData();
      fd.append('avatar', this.selectedFile, this.selectedFile.name);
      this.taskService.uploadImage(fd)
        .subscribe((out) => console.log(out));
    }
  }

  getPage(num) {
    if (num === 'add') {
      this.skip = +this.skip + 1;

    } else  if (num === 'min') {
      this.skip = +this.skip + 1;
    } else {
      this.skip = num;
    }
    console.log(this.skip)
    this.taskService.getPage(this.skip)
    .subscribe((res: any) => {
         this.tasks = res;
    }, error => console.log(error));
  }
}
