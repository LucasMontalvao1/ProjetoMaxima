import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
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

createProduto(codigo: string, descricao: string, preco: number, departamentoCodigo: string, status: number, inutilizavel: number): Observable<Produto> {
  const produto = {
    codigo,
    descricao,
    preco,
    departamentoCodigo,
    status,
    inutilizavel
  };

  return this.http.post<Produto>(this.apiUrl, produto).pipe(
    catchError((error) => {
      let errorMessage = 'Ocorreu um erro ao criar o produto.';

      if (error.error && error.error.title) {
        errorMessage = error.error.title;
      } else if (error.statusText) {
        errorMessage = error.statusText;
      }

      console.error('Erro ao criar produto:', error);
      return throwError(errorMessage);
    })
  );
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
