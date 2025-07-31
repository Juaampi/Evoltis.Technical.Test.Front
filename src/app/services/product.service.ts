import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private apiUrl = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({
      'x-api-key':  environment.apiKey

    })
  };

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, this.httpOptions);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product,  this.httpOptions);
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product,  this.httpOptions);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`,  this.httpOptions);
  }
}
