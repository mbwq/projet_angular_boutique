import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UserService } from './services/user-service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isLoggedIn: boolean = false;
  tokenSubscription: any;
  token: String = '';

  constructor(
    private userService: UserService
  ) {
    this.token = this.userService.token;
  }

  ngOnInit() {
    console.log(this.token);
    this.tokenSubscription = this.userService.tokenSubject.subscribe({
      next: (token) => {
        console.log('Token mis à jour:', token);
        this.token = token;
      }
    });
  }

  ngOnDestroy() {
    this.tokenSubscription.unsubscribe();
  }

  logout() {
    this.userService.logout();
  }
}
