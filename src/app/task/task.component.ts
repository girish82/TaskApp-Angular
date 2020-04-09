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

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTask();
  }

  getTask() {
    this.taskService.getTasks()
    .subscribe((res: any) => {
        this.tasks = res;
    });
  }

  onSubmit(data: NgForm) {
    this.taskService.AddTasks(data.value)
      .subscribe((res) => {
        this.getTask();
      });
  }

  deleteTask(id) {
    console.log(id)
    this.taskService.deleteTasks(id)
    .subscribe((res) => {
      this.getTask();
    });
  }

  editTask() {

  }
}
