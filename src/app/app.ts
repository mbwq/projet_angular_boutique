import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UserService } from './services/user-service';
import { AdminService } from './services/admin-service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isAdmin: boolean = false;
  tokenSubscription: any;
  token: String = '';

  constructor(
    private userService: UserService,
    private adminService: AdminService
  ) {
    this.token = this.userService.token;
    this.isAdmin = this.adminService.isLoggedIn();
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

  //espace deconnexion admin
  logoutAdmin() {
    console.log('deconnexion admin', this.token)
    this.adminService.logout();
    this.token = '';
    this.isAdmin = false;
  }
}
