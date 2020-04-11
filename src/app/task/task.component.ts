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

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTask();
    this.getAvatar()
  }

  getTask() {
    this.taskService.getTasks()
    .subscribe((res: any) => {
        this.tasks = res;
    });
  }

  getAvatar() {
    this.taskService.getAvatar()
    .subscribe((res: any) => {
        console.log(res);
    });
  }

  onSubmit(data: NgForm) {
    this.taskService.AddTasks(data.value)
      .subscribe((res) => {
        this.getTask();
      });
  }

  deleteTask(id) {
   // console.log(id)
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
    },error=>console.log(error));
  }

  onFileselect(event) {
    this.selectedFile =  event.target.files[0] as File;
    // console.log(this.selectedFile);
    if (this.selectedFile) {
      const fd = new FormData();
      fd.append('avatar', this.selectedFile, this.selectedFile.name);
      this.taskService.uploadImage(fd)
        .subscribe((out) => console.log(out));
    }
  }
}
