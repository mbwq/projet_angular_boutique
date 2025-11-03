import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-update',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update.html',
  styleUrl: './update.scss'
})
export class Update {
  updateForm!: FormGroup;
  private userid!: number;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      password_confirmation: ['']
    });

    // Charger les données actuelles
    this.userService.getUser(id).subscribe({
      next: (res) => {
        const user = res.user;
        this.updateForm.patchValue({
          name: user.name,
          firstname: user.firstname,
          email: user.email
        });
      },
      error: (err) => console.error('Erreur de chargement utilisateur', err)
    });
  }

  onSubmit() {
    if (this.updateForm.invalid) return;

    this.loading = true;
    this.userService.updateUser(this.updateForm.value, this.userid).subscribe({
      next: (res) => {
        this.successMessage = 'Vos informations ont été mises à jour avec succès.';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/setting']), 2000);
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la mise à jour.';
        console.error(err);
        this.loading = false;
      }
    });
  }

}
