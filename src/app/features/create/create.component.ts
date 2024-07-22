import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ProductsService } from '../../shared/services/products.service';

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

  productService = inject(ProductsService);

  form = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    })
  });

  onSubmit() {
    this.productService.post({ 
      name: this.form.controls.name.value 
    })
    .subscribe(() => {
      alert('Produto salvo com sucesso!');
      this.form.reset()
    });
  }
}
