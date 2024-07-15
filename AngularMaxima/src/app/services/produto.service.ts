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

  createProduto(produto: Produto): Observable<Produto> {
    const body = [{
      codigo: produto.codigo,
      descricao: produto.descricao,
      departamentoCodigo: produto.departamentoCodigo,
      preco: produto.preco,
      status: produto.status,
      inutilizavel: produto.inutilizavel
    }];

    return this.http.post<Produto>(this.apiUrl, body);
  }

  updateProduto(id: number, produto: Produto): Observable<Produto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Produto>(url, produto);
  }

  updateProdutoInutilizavel(id: number): Observable<void> {
    const url = `${this.apiUrl}/inutilizar/${id}`;
    return this.http.patch<void>(url, { inutilizavel: 1 });
  }
}
