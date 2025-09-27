import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule],
  templateUrl: './signin.html',
  styleUrl: './signin.scss'
})
export class Signin {
  signupForm: FormGroup;

  constructor(
    private userService: UserService
  ) {
    this.signupForm = new FormGroup({
      username: new FormControl('Pepe', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('pepe@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('qweqweqwe', [Validators.required, Validators.minLength(6)]),
    });
  }

  onInit() {

  }

  onSubmit() {
    console.log(this.signupForm);
    if (this.signupForm.valid) {
      console.log('Formulaire valide:', this.signupForm);
      this.userService.signin(this.signupForm.value.username, this.signupForm.value.password, this.signupForm.value.email).subscribe({
        next: (response: any) => {

          console.log('Connexion réussi', response);
          this.userService.getAll().subscribe({
            next: (response: any) => {
              console.log(response);
            },
            error: (error:any) => {}
          });
        },
        error: (error:any) => {
          console.error('Erreur lors de la connexion', error);
        }
      });
      //Ici on peut appeler un service pour créer l'utilisateur
    } else {
      console.log('Formulaire invalide');
      this.signupForm.markAllAsTouched(); //ici afficher les ereurs
    }
  }

  get username() {
    return this.signupForm.get('username');
  }
}
