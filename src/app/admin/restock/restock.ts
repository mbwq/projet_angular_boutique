import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminService } from '../../services/admin-service';
import { Route, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-restock',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './restock.html',
  styleUrl: './restock.scss'
})
export class Restock {
  createForm: FormGroup; 

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private router: Router
  ) {
    this.createForm = new FormGroup({
      nom: new FormControl('', [Validators.required]),
      prix: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      categorie: new FormControl('', [Validators.required]),
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

  AdminSubmit() {
    console.log(this.createForm);
    if (this.createForm.valid) {
      console.log('Formulaire produit valide:', this.createForm.value);
      this.adminService.getCreate(this.createForm.value.nom, this.createForm.value.prix, this.createForm.value.description, this.createForm.value.image, this.createForm.value.categorie).subscribe({
        next: (apiResponse) => {
          console.log('Creation reussi', apiResponse);
          this.router.navigate(['/admin/dashboard']);
        },
        error: (error) => {
          console.error('Erreur creation produit !', error);
        }
      });
    } else {
      console.log('Formulaire invalide');
      this.createForm.markAllAsTouched();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.createForm.patchValue({ image: file });
    this.createForm.get('image')?.updateValueAndValidity();
  }


}
