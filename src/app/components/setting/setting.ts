import { Component } from '@angular/core';
import { UserService } from '../../services/user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-setting',
  imports: [CommonModule],
  templateUrl: './setting.html',
  styleUrl: './setting.scss'
})
export class Setting {
  user: any = [];
  //loading = true;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser().subscribe({
      next: (apiResponse) => {
        this.user = apiResponse.user;
        //this.loading = false;
        console.log(apiResponse);
      },
      error: (error) => {
        console.log('Erreur de recuperation utilisateur connecter', error);
        //this.loading = false;
      }
    });
  }

}
