import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions';
import { ProductService } from '../../services/product.service';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(() =>
        this.productService.getAll().pipe(
          map(products => ProductActions.loadProductsSuccess({ products })),
          catchError(error => of(ProductActions.loadProductsFailure({ error })))
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.createProduct),
      mergeMap(({ product }) =>
        this.productService.create(product).pipe(
          map(product => ProductActions.createProductSuccess({ product })),
          catchError(error => of(ProductActions.createProductFailure({ error })))
        )
      )
    )
  );

  createProductSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.createProductSuccess),
      tap(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Producto creado',
          detail: 'El producto fue creado correctamente',
          life: 3000,
        });
      })
    ),
    { dispatch: false }
  );

  createProductFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.createProductFailure),
      tap(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo crear el producto',
          life: 3000,
        });
      })
    ),
    { dispatch: false }
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap(({ product }) =>
        this.productService.update(product).pipe(
          map(product => ProductActions.updateProductSuccess({ product })),
          catchError(error => of(ProductActions.updateProductFailure({ error })))
        )
      )
    )
  );

  updateProductSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProductSuccess),
      tap(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Producto actualizado',
          detail: 'El producto fue actualizado correctamente',
          life: 3000,
        });
      })
    ),
    { dispatch: false }
  );

  updateProductFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProductFailure),
      tap(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar el producto',
          life: 3000,
        });
      })
    ),
    { dispatch: false }
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap(({ id }) =>
        this.productService.delete(id).pipe(
          map(() => ProductActions.deleteProductSuccess({ id })),
          catchError(error => of(ProductActions.deleteProductFailure({ error })))
        )
      )
    )
  );

  deleteProductSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProductSuccess),
      tap(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Producto eliminado',
          detail: 'El producto fue eliminado correctamente',
          life: 3000,
        });
      })
    ),
    { dispatch: false }
  );

  deleteProductFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProductFailure),
      tap(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el producto',
          life: 3000,
        });
      })
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private productService: ProductService, private messageService: MessageService) {}
}
