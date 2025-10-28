import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maillot',
  imports: [CommonModule],
  templateUrl: './maillot.html',
  styleUrl: './maillot.scss'
})
export class Maillot {
  produit: any = [];

  constructor(private productService: ProductService){}

  ngOnInit() {
    const categorieId = 1;
    this.productService.getCategorie(categorieId).subscribe({
      next: (data) => this.produit = data,
      error: (error) => console.error(error)
    });
  }

}
