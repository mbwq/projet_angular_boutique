import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
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
      name: new FormControl('Angelme', [Validators.required, Validators.minLength(4)]),
      firstname: new FormControl('Pepe', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('pepe@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('qweqweqwe', [Validators.required, Validators.minLength(6)]),
      password_confirmation: new FormControl('qweqweqwe', [Validators.required, Validators.minLength(6)]),
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const form = control as FormGroup;
    const pass = form.get('password')?.value;
    const passConf = form.get('password_confirmation')?.value;
    return pass === passConf ? null : { mismatch: true };
  }


  onInit() {

  }

  onSubmit() {
    console.log(this.signupForm);
    if (this.signupForm.valid) {
      console.log('Formulaire valide:', this.signupForm);
      this.userService.signin(this.signupForm.value.name,this.signupForm.value.firstname,this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.password_confirmation).subscribe({
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

  // Accesseurs pour faciliter l'affichage/validation dans le template
  get name() {
    return this.signupForm.get('name');
  }

  get firstname() {
    return this.signupForm.get('firstname');
  }
}
