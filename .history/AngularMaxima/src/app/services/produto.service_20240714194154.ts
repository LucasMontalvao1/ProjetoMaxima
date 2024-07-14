import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { Router } from '@angular/router';
import { Produto } from '../models/produto.model'; // Importe a interface Produto aqui

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  getAllProdutos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/produtos`);
  }

  getProdutoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/produtos/${id}`);
  }

  createProduto(produto: Produto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/produtos`, produto);
  }

  updateProduto(id: number, produto: Produto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/produtos/${id}`, produto);
  }

  deleteProduto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/produtos/${id}`);
  }

  handleError(error: any) {
    // Aqui você pode implementar lógica para tratamento de erros
    console.error('Erro ocorrido:', error);
    // Lançar um erro específico, redirecionar, etc.
  }
}
