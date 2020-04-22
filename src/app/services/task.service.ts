import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  User: { id: string; age: number; email: string; name: string };

  constructor(private http: HttpClient) {}

  userLogin(data, signIn) {
    console.log(data);
    if (signIn === 'Sign In') {
      return this.http.post(
        'https://pgirish-task-app.herokuapp.com/users/login',
        data
      );
    } else {
      return this.http.post(
        'https://pgirish-task-app.herokuapp.com/users',
        data
      );
    }
  }

  getUser() {
    const token = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    return this.http.get('https://pgirish-task-app.herokuapp.com/users/me', {
      headers,
    });
  }

  getUserId() {
    const token = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    return this.http.get('https://pgirish-task-app.herokuapp.com/users/me', {
      headers,
    });
  }

  getTasks() {
    const token = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    return this.http.get('https://pgirish-task-app.herokuapp.com/tasks', {
      headers,
    });
  }

  getTasksById(id) {
    const token = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    return this.http.get('https://pgirish-task-app.herokuapp.com/tasks/' + id, {
      headers,
    });
  }


  getAvatar() {
    const token = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    return this.http.get('https://pgirish-task-app.herokuapp.com/users/me', {
      headers,
    });
  }

  AddTasks(data) {
    const token = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    return this.http.post(
      'https://pgirish-task-app.herokuapp.com/tasks',
      data,
      { headers }
    );
  }

  deleteTasks(id) {
    const token = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    return this.http.delete(
      'https://pgirish-task-app.herokuapp.com/tasks/' + id,
      { headers }
    );
  }

  editTasks(id, data) {
    const token = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    return this.http.patch(
      'https://pgirish-task-app.herokuapp.com/tasks/' + id, data,
      { headers }
    );
  }

  searchTasks(srch, num) {
    const token = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });

    let params = new HttpParams();
    params = params.append('limit', '5');
    params = params.append('skip', String(+num * 5));

    if (srch === '2') {
      params = params.append('completed', 'true');
      return this.http.get('https://pgirish-task-app.herokuapp.com/tasks', {
        headers,
        params,
      });
    } else if (srch === '3') {
      params = params.append('completed', 'false');
      return this.http.get('https://pgirish-task-app.herokuapp.com/tasks', {
        headers,
        params,
      });
    } else {
      return this.http.get('https://pgirish-task-app.herokuapp.com/tasks', {
        headers,
        params
      });
    }
  }

  uploadImage(fd) {
    const token = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.post(
      'https://pgirish-task-app.herokuapp.com/users/me/avatar',
      fd,
      { headers }
    );
  }

  getPage(num) {
    const token = window.localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });

    let params = new HttpParams();
    params = params.append('limit', '5');
    params = params.append('skip', num);
    return this.http.get('https://pgirish-task-app.herokuapp.com/tasks', {headers, params});
}

}
