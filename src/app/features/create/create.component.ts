import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ProductsService } from '../../shared/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatCardModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  router = inject(Router);

  productService = inject(ProductsService);

  matSnackBar = inject(MatSnackBar);

  form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    })
  });

  onSubmit() {

    if (this.form.invalid) {
      this.matSnackBar.open('Preencha o campo nome', 'OK', {
        duration: 3000,
      });
      return;
    }

    this.productService.post({ 
      name: this.form.controls.name.value 
    })
    .subscribe(() => {
      this.matSnackBar.open('Produto cadastrado com sucesso', 'OK', {
        duration: 3000,
      });
      this.form.reset()
      this.router.navigate(['/']);
    });
  }
}
