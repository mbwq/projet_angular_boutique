import { Inject ,inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //private http = inject(HttpClient);
  public tokenSubject: BehaviorSubject<String>;

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID)private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      let storedToken = '';
    try {
      const raw = localStorage.getItem('token');
      storedToken = raw ? JSON.parse(raw) : '';
    } catch (error) {
      console.warn('Token invalide dans le localStorage, réinitialisation.');
      localStorage.removeItem('token');
    }
      this.tokenSubject = new BehaviorSubject<String>(storedToken);
    } else {
      this.tokenSubject = new BehaviorSubject<String>('');
    }

  }

  public get token(): String {
    return this.tokenSubject.value;
  }

  setToken(token: String) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', JSON.stringify(token));
    }
    this.tokenSubject.next(token);
  }

  login(email: string, password: string) {
    return this.http.post('http://127.0.0.1:8000/api/connexion', { email, password});
  }

  signin(name: string, firstname: string, email: string, password: string, password_confirmation: string) {
    return this.http.post('http://127.0.0.1:8000/api/inscription', { name, firstname, email, password, password_confirmation});
  }

  getAll() {
    return this.http.get('http://127.0.0.1:8000/api/liste_user');
  }
  // observable
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://127.0.0.1:8000/api/listeUser/info', { headers });
  }

  logout() {
    this.setToken('');
    if (isPlatformBrowser(this.platformId)){
      localStorage.removeItem('token');
    }
    this.router.navigate(['/']);//page d'acceuil
  }

}
