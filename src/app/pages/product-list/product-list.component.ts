import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import * as ProductActions from '../../store/product/product.actions';
import * as fromProduct from '../../store/product/product.selectors';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  @ViewChild('dt') dt!: Table;
  products$: Observable<Product[]>;

  constructor(
    private store: Store,
    private confirmationService: ConfirmationService  ) {
    this.products$ = this.store.select(fromProduct.selectAllProducts);
  }

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  deleteProduct(id: number): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro que quieres eliminar este producto?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(ProductActions.deleteProduct({ id }));
      }
    });
  }

  editProduct(product: Product): void {
    this.store.dispatch(ProductActions.updateProduct({ product }));
  }

  filterTable(event: Event, field: string) {
    const input = event.target as HTMLInputElement;
    this.dt.filter(input.value, field, 'contains');
  }
}
