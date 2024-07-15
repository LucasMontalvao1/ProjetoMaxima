import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Departamento } from '../models/departamento.model';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private apiUrl = environment.apiUrl + '/departamento';

  constructor(private http: HttpClient) { }

  getAllDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.apiUrl);
  }

  getDepartamentoByCodigo(codigo: string): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.apiUrl}/${codigo}`);
  }

  createDepartamento(departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(this.apiUrl, departamento);
  }

  updateDepartamento(codigo: string, departamento: Departamento): Observable<Departamento> {
    return this.http.put<Departamento>(`${this.apiUrl}/${codigo}`, departamento);
  }

  deleteDepartamento(codigo: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${codigo}`);
  }
}
