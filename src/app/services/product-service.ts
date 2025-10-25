import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  public cart: any[] = [];
  constructor() {
    this.cart = JSON.parse(<string>localStorage.getItem('cart'));
    console.log(this.cart);
    if (!this.cart) {
      localStorage.setItem('cart', JSON.stringify([]));
      this.cart = [];
    }
  }

  getProducts() {
    return this.http.get('http://127.0.0.1:8000/api/produits');
  }

  addToCart(product: any) {
    this.cart.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    console.log(this.cart);
    return this.cart;
  }

  removeCart(product: any) {
    this.cart.splice(product ,1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    
    return this.cart;
  }
}
