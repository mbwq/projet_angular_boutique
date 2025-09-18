import { Component, signal } from '@angular/core';
import { Components } from "./components/components";

@Component({
  selector: 'app-root',
  imports: [Components],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
