import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable
({
  providedIn: 'root'
})

export class TaskService {

  User: {id: string, age: number, email: string, name: string};

  constructor(private http: HttpClient) { }

  userLogin(data) {
     return this.http.post('https://pgirish-task-app.herokuapp.com/users/login', data);
    // .subscribe((res: any) => {
    //     if (res.token) {
    //       window.localStorage.setItem('token', res.token);
    //       return this.getUser();
    //     }
    // });
  }

  getUser() {
    const token = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: 'Bearer ' + token });
    return this.http.get('https://pgirish-task-app.herokuapp.com/users/me', {headers});
    // .subscribe((res: any) => {
    //    return res;
    // });
  }

  getTasks() {
    const token = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: 'Bearer ' + token });
    return this.http.get('https://pgirish-task-app.herokuapp.com/tasks', {headers});
    // .subscribe((res: any) => {
    //    return res;
    // });
  }

  AddTasks(data) {
    const token = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: 'Bearer ' + token });
    return this.http.post('https://pgirish-task-app.herokuapp.com/tasks', data, {headers});
    // .subscribe((res: any) => {
    //    return res;
    // });
  }

  deleteTasks(id) {
    const token = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
       Authorization: 'Bearer ' + token });
    return this.http.delete('https://pgirish-task-app.herokuapp.com/tasks/' + id, {headers});
  }
}




