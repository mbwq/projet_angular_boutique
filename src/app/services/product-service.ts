import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  constructor() {}

  getProducts() {
    return this.http.get('https://fakestoreapi.com/products');
  }
}
