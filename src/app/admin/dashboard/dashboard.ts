import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductCard } from '../../components/product-card/product-card';
import { EmailValidator, FormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { ProductService } from '../../services/product-service';
import { AdminService } from '../../services/admin-service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  imageAdminUrl!: string;
  description!: string;
  createdAd!: Date;
  @Input() dashboard: any;
  admin:any = [];

  constructor(
        private userService: UserService,
        private productService: ProductService
  ) {}

  products:any = [];
  cart: any = [];
  isCartOpen: boolean = false;


  ngOnInit() {
    
    this.description = 'Votre passion et Notre passion 😎!!';
    this.createdAd = new Date();
    this.imageAdminUrl = 'https://www.logoshape.com/wp-content/uploads/2024/11/paris-saint-germain-logo_logoshape.png';


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


  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  loadUser(id:number) {
    this.userService.getUser(id).subscribe({
      next: (data) => {
        this.admin = data;
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

  recupAdmin(name: string) {
    this.userService.getAll().subscribe({
      next: (apiReponse) => this.admin = apiReponse,
      error: (error) => console.error('Erreur recuperation api', error)
    });
  }

}
