import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule ,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm: FormGroup;
  //user: any; pour observable

  constructor(
    private userService: UserService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('johnd', [Validators.required]),
      password: new FormControl('m38rmF$', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() {
    this.userService.getAll().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    });
  }
  
  onSubmit() {
    console.log(this.loginForm);
    if (this.loginForm.valid) {
      console.log('Formulaire valide:', this.loginForm.value);
      this.userService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
        next: (response:any) => {
          console.log('Connexion réussie', response);
          //localStorage.setItem('token', JSON.stringify(response.token));
          this.userService.setToken(response.token);
        },
        error: (error) => {
          console.error('Erreur lors de connexion', error);
        }
      });
      //ici on peut appeler un service pour crée l'utilisateur
    } else {
      console.log('Formulaire invalide');
      this.loginForm.markAllAsTouched();//affiche les erreur
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  /*ngOnCreate() {
    this.userService.getUser('1').subscribe({
      next: (response) => {
        this.user = response;
        console.log(this.user);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur', error);
      }
    });
  }*/

}
