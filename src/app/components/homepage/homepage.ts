import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ProductCard } from "../product-card/product-card";
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-homepage',
  imports: [ProductCard],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage {
  title!: string;
  description!: string;
  createdAd!: Date;
  imageUrl!: string;

  constructor(
    private userService: UserService,
    private productService: ProductService
  ) {}

  products:any = [];
  cart: any = [];

  ngOnInit() {

    this.title = 'Fanatic PSG';
    this.description = 'FanBase du PSG, par des fan pour les fan 😎';
    this.createdAd = new Date();
    this.imageUrl = 'https://france-lab.com/wp-content/uploads/2017/09/PSG_Logo.jpg';

    

    this.productService.getProducts().subscribe({
      next: (apiResponce) => {
        console.log('Produits recuperes:', apiResponce);
        this.products = apiResponce;
      },
      error: (error) => {
        console.error('Erreur lors recuperation des produits', error);
      }
    });
    this.cart = this.productService.cart;
    console.log("cart =",this.cart);
  }

    
  handleProductClick(callback: any) {
    let product = callback.event;
    console.log('Produit cliqué:', product);
    this.cart = this.productService.addToCart(callback.product);
    console.log("cart =",this.cart);
  }
  
}
