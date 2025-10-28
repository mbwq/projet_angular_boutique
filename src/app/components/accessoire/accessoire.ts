import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-accessoire',
  imports: [CommonModule],
  templateUrl: './accessoire.html',
  styleUrl: './accessoire.scss'
})
export class Accessoire {
  produit: any = [];

  constructor(private productService: ProductService) {}

    ngOnInit() {
    const categorieId = 2;
    this.productService.getCategorie(categorieId).subscribe({
      next: (data) => this.produit = data,
      error: (error) => console.error(error)
    });
  }

}
