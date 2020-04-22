import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  user: {name: string, age: number} = {name : '', age : 0};
  skip = 0;
  status = 0;
  edit = 0;
  addLabel = 'Add Tasks';
  alertMsg = '';

  // @ViewChild('description', {static: false}) description: ElementRef;
  // @ViewChild('completed', {static: false}) state: ElementRef;
  desc = '';
  state = '';



  constructor(private taskService: TaskService) { }

  ngOnInit() {
    // this.getTask();
    this.getPage(0);
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
    if (this.edit !== 0 ) {
      this.taskService.editTasks(this.edit, data.value)
      .subscribe((res) => {
        // this.getTask();
        this.getPage(0);
        this.edit = 0;
        this.addLabel = 'Add Tasks';
        this.alertMsg = 'Task Updated Successfully !!';
      });
    } else {
      this.taskService.AddTasks(data.value)
        .subscribe((res) => {
          // this.getTask();
          this.getPage(0);
          this.alertMsg = 'Task Added Successfully !!';
        });
    }
    this.state = '';
    this.desc = '';
    data.reset();

  }

  deleteTask(id) {
    this.taskService.deleteTasks(id)
    .subscribe((res) => {
      // this.getTask();
      this.getPage(0);
    });
  }

  editTask(id,data: NgForm) {
    this.edit = id;
    this.addLabel = 'Update Task';
    this.taskService.getTasksById(id)
    .subscribe((res: any) => {
      this.desc = res.description;
      this.state = res.completed;
    });
    // console.log(data.value)
  }

  search(status) {
    this.status = status;
    this.taskService.searchTasks(status, 0)
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
        .subscribe((out) => this.getAvatar());
    }
  }

  getPage(num) {
    if (num === 'add') {
      this.skip = +this.skip + 1;
    } else  if (num === 'min') {
      this.skip = +this.skip === 0 ? 0 : +this.skip - 1;
    } else {
      this.skip = num;
    }
    console.log(this.skip)
    // this.taskService.getPage(this.skip)
    // .subscribe((res: any) => {
    //      this.tasks = res;
    // }, error => console.log(error));
    console.log(this.status)
    this.taskService.searchTasks(this.status, this.skip)
    .subscribe((res: any) => {
         this.tasks = res;
    }, error => console.log(error));
  }

  onHandleError() {
    this.alertMsg = '';
  }

}
