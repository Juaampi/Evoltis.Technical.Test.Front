import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { MessageService } from 'primeng/api';

@Component({
  standalone: false,
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  productId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.productId = +id;
      this.productService.getById(this.productId).subscribe({
        next: (product) => {
          if (product) {
            this.form.patchValue(product);
          }
        },
        error: (err) => {
          console.error('Error al cargar producto:', err);
        }
      });
    }
  }

  save() {
    if (this.form.invalid) return;

    const product = this.form.value;

    if (this.isEdit) {
      this.productService.update({ id: this.productId, ...product }).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Producto actualizado',
            detail: 'El producto se actualizó correctamente.',
            life: 2000,
          });

          setTimeout(() => this.router.navigate(['/products']), 2000);
        },
        error: err => {
          console.error('Error al actualizar:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar el producto.',
          });
        }
      });
    }else {
      this.productService.create(product).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Producto agregado',
            detail: 'El producto se agregó correctamente.',
            life: 2000,
          });

          setTimeout(() => this.router.navigate(['/']), 2000);
        },
        error: err => {
          console.error('Error al crear:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo crear el producto.',
          });
        }
      });
    }
  }
}

