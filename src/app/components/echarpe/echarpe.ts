import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-echarpe',
  imports: [CommonModule],
  templateUrl: './echarpe.html',
  styleUrl: './echarpe.scss'
})
export class Echarpe {
  produit: any = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    const categorieId = 3;
    this.productService.getCategorie(categorieId).subscribe({
      next: (data) => this.produit = data,
      error: (error) => console.error(error)
    });
  }

}
