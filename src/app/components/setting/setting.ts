import { Component } from '@angular/core';
import { UserService } from '../../services/user-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  imports: [CommonModule],
  templateUrl: './setting.html',
  styleUrl: './setting.scss'
})
export class Setting {
  user: any = [];
  //loading = true;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(id: number) {
    this.userService.getUser(id).subscribe({
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

  goToEdit() {
    this.router.navigate(['/EditUser']);
  }

  DeleteCompte() {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce compte ? Toutes vos informations, commandes et autres données seront détruites définitivement!!!"
    );

    if(confirmation) {
      this.deleteAccount();
    }
  }

  deleteAccount() {
    this.userService.deleteUser(this.user.id).subscribe({
      next: (res) => {
        alert("Votre compte a bien été supprimé !");
        this.userService.logout();
      },
      error: (err) => {
        console.error("Erreur lors de la suppression :", err);
        alert("Erreur lors de la suppression du compte.");
      }
    })
  }

}
