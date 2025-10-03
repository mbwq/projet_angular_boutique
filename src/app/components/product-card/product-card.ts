import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  @Input() product: any;
  @Output() OnClicke = new EventEmitter<any>();

  constructor() { }


  ngOnInit(): void{}

  onProductClick(event: any) {
    console.log(event);
    this.OnClicke.emit({event: event, product:this.product});
  }

}
