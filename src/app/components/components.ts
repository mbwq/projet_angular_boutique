import { Component } from '@angular/core';

@Component({
  selector: 'app-components',
  imports: [],
  templateUrl: './components.html',
  styleUrl: './components.scss'
})
export class Components {
  title!: string;
  description!: string;
  createdAd!: Date;
  imageUrl!: string;

  ngOnInit() {
    this.title = 'Fanatic PSG';
    this.description = 'Pour les amoureux du PSG, par des fan pour des fan 😎';
    this.createdAd = new Date();
    this.imageUrl = 'https://france-lab.com/wp-content/uploads/2017/09/PSG_Logo.jpg';
  }

}
