import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ProductCard } from "../product-card/product-card";
import { UserService } from '../../services/user-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  imports: [ProductCard, FormsModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage {
  title!: string;
  description!: string;
  createdAd!: Date;
  imageUrl!: string;
  user: any; //pour observable

  constructor(
    private userService: UserService,
    private productService: ProductService
  ) {}

  products:any = [];
  cart: any = [];
  isCartOpen: boolean = false;

  ngOnInit() {

    this.title = 'Fanatic PSG';
    this.description = 'FanBase du PSG, par des fan pour les fan 😎';
    this.createdAd = new Date();
    this.imageUrl = 'https://www.logoshape.com/wp-content/uploads/2024/11/paris-saint-germain-logo_logoshape.png';

    //this.loadUser(id);

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
    this.isCartOpen = true;
  }

  handleRemoveClick(productRemove: any) {
    console.log('Produit à retirer:', productRemove);
    this.cart = this.productService.removeCart(this.products);
  }

  handleAppendClick(productAppend: any) {
    //console.log('Produit à validé:', productAppend);
    //this.cart = this.productService.removeCart(this.products);
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  loadUser(id:number) {
    this.userService.getUser(id).subscribe({
      next: (data) => {
        this.user = data;
        console.log('Utilisateur récupéré :', data);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur', error);
      },
      complete: () => {
        console.log('Requête terminée');
      }
    });
  }
  
}
