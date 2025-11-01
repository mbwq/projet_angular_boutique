import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { AdminService } from '../../services/admin-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm: FormGroup;
  

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),//a mettre plus tard test
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
      //const { email, password, role } = this.loginForm.value;
      console.log('Formulaire valide:', this.loginForm.value);
      if (this.loginForm.value.role === 'admin') {
        //choix connexion admin
        this.adminService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
          next: (response:any) => {
            console.log('Connexion admin reussi', response);
            this.adminService.setToken(response.token);
            this.router.navigate(['/admin/dashboard']);
          },
          error: (error) => {
            console.error('Erreur admin connexion!', error);
          }
        });
      } else {
        //choix connexion utilisateur
        this.userService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (response:any) => {
          console.log('Connexion réussie', response);
          //localStorage.setItem('token', JSON.stringify(response.token));
          this.userService.setToken(response.token);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Erreur lors de connexion', error);
        }
      });
      }
      //ici on peut appeler un service pour crée l'utilisateur
    } else {
      console.log('Formulaire invalide');
      this.loginForm.markAllAsTouched();//affiche les erreur
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

}
