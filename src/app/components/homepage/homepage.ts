import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage {
  title!: string;
  description!: string;
  createdAd!: Date;
  imageUrl!: string;

  constructor(
    private productService: ProductService
  ) {}


  ngOnInit() {

    this.title = 'Fanatic PSG';
    this.description = 'Pour les amoureux du PSG, par des fan pour des fan 😎';
    this.createdAd = new Date();
    this.imageUrl = 'https://france-lab.com/wp-content/uploads/2017/09/PSG_Logo.jpg';




    this.productService.getProducts().subscribe({
      next: (products) => {
        console.log('Produits recuperes:', products);
      },
      error: (error) => {
        console.error('Erreur lors recuperation des produits');
      }
    });
  }

  
}
