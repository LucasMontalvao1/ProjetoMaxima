import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Departamento } from '../models/departamento.model';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.apiUrl}/departamento`);
  }

  getDepartamentoByCodigo(codigo: string): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.apiUrl}/departamento/${codigo}`);
  }

  createDepartamento(departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(`${this.apiUrl}/departamento`, departamento);
  }

  updateDepartamento(codigo: string, departamento: Departamento): Observable<Departamento> {
    return this.http.put<Departamento>(`${this.apiUrl}/departamento/${codigo}`, departamento);
  }

  deleteDepartamento(codigo: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/departamento/${codigo}`);
  }

  getProdutosVinculadosDepartamento(codigo: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/Produto/departamento/${codigo}`);
  }
}
