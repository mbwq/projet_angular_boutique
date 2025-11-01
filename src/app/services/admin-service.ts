import { Inject ,inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  public tokenSubject: BehaviorSubject<String>;

  constructor (
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('admin_token');
      this.tokenSubject = new BehaviorSubject<String>(token ? JSON.parse(token) : '');
    } else {
      this.tokenSubject = new BehaviorSubject<String>('');
    }
  }

  public get token(): String {
    return this.tokenSubject.value;
  }

  setToken(token: String) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('admin_token', JSON.stringify(token));
    }
    this.tokenSubject.next(token);
  }

    //pour crée des produit
  getCreate(nom: string, prix: number, description: string, image: string, categorie: number) {
    return this.http.post('http://127.0.0.1:8000/api/admin/createProduit', { nom, prix, description, image, categorie});
  }

  login(email: string, password: string){
    return this.http.post('http://127.0.0.1:8000/api/admin/connexion', { email, password});
  }

  isLoggedIn() {
    return !!localStorage.getItem('admin_token');
  }

  logout() {
    this.setToken('');
    if (isPlatformBrowser(this.platformId)){
      localStorage.removeItem('admin_token');
    }
    this.router.navigate(['/Login']);//page d'acceuil
  }
  
}
