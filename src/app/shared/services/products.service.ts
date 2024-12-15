import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { ProductPayload } from '../interfaces/payload.product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  httpClient = inject(HttpClient);

  getAllProducts() {
    return this.httpClient.get<Product[]>('/api/products');
  }

  post(product: ProductPayload) {
    return this.httpClient.post('/api/products', product);
  }
  
}
