import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  public tokenSubject: BehaviorSubject<String>;

  constructor() {
    this.tokenSubject = new BehaviorSubject<String>(
      JSON.parse(<string>localStorage.getItem('token'))
    );
  }

  public get token(): String {
    return this.tokenSubject.value;
  }
  login(username: string, password: string) {
    return this.http.post('https://fakestoreapi.com/auth/login', { username, password});
  }

  signin(username: string, password: string, email: string) {
    return this.http.post('https://fakestoreapi.com/users', { username, password, email});
  }

  getAll() {
    return this.http.get('https://fakestoreapi.com/users');
  }
}
