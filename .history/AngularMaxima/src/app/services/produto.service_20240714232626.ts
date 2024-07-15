import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = environment.apiUrl + '/produto';

  constructor(private http: HttpClient) { }

  getAllProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  getProdutoById(id: number): Observable<Produto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Produto>(url);
  }

 createProduto(produto: any): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  updateProduto(id: number, produto: Produto): Observable<Produto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Produto>(url, produto);
  }

  deleteProduto(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
