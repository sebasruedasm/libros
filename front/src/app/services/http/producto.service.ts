import {HttpClient} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {environment} from '../../environment/environment';
import {Observable} from 'rxjs';
import {ProductoInterface} from '../../interfaces/producto-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private readonly _http = inject(HttpClient);
  private _url = environment.api;

  constructor() {
  }

  getAllProduct(): Observable<ProductoInterface[]> {
    return this._http.get<ProductoInterface[]>(`${this._url}/books/`)
  }

  getProductById(id: number): Observable<any> {
    return this._http.get<ProductoInterface>(`${this._url}/books/${id}`);
  }

  searchProductsByName(titulo: string): Observable<any> {
    
    return this._http.get<any>(`${this._url}/books/search?title=${titulo}`);
  }


  addProducto(product: any): Observable<any> {
    return this._http.post<any>(`${this._url}/books/`, product);
  }


  updateProducto(id: number, product: any): Observable<any> {
    return this._http.put<ProductoInterface[]>(`${this._url}/books/${id}`, product);
  }

  deleteProducto(id: number): Observable<any> {
    return this._http.delete<ProductoInterface[]>(`${this._url}/books/${id}`);
  }
}
