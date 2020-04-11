import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable
({
  providedIn: 'root'
})

export class TaskService {

  User: {id: string, age: number, email: string, name: string};

  constructor(private http: HttpClient) { }

  userLogin(data, signIn) {
    console.log(data);
    if (signIn === 'Sign In') {
      return this.http.post('https://pgirish-task-app.herokuapp.com/users/login', data);
    } else {
      return this.http.post('https://pgirish-task-app.herokuapp.com/users', data);
    }
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

  getAvatar() {
    const token = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
       Authorization: 'Bearer ' + token });
    // let params = new HttpParams();
    // params = params.set('id', token);
    return this.http.get('https://pgirish-task-app.herokuapp.com/users/5e8ae5db16692d001749e060/avatar', {headers});
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

  searchTasks(srch) {
    console.log(srch);
    const token = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       Authorization: 'Bearer ' + token });
    // let params = new HttpParams();
    // params = params.set('completed', 'false');
   // console.log(params);
  //   const httpOptions = {
  //   headers,
  //   params
  // };

    if (srch === 2) {
      let params = new HttpParams();
      params = params.set('completed', 'true');
      return this.http.get('https://pgirish-task-app.herokuapp.com/tasks', {headers, params} );
      } else if (srch === 3) {
        let params = new HttpParams();
        params = params.set('completed', 'false');
        return this.http.get('https://pgirish-task-app.herokuapp.com/tasks', {headers, params});
      }
  }

  uploadImage(fd) {
    // console.log(fd)
    const token = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
       Authorization: 'Bearer ' + token });
    return this.http.post('https://pgirish-task-app.herokuapp.com/users/me/avatar', fd, {headers});
    // .subscribe((res: any) => {
    //    return res;
    // });
  }
}




