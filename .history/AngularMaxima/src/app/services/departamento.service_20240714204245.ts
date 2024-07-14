import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { Departamento } from '../';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private apiUrl = environment.apiUrl + '/departamentos';

  constructor(private http: HttpClient) { }

  getAllDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.apiUrl);
  }

  getDepartamentoById(codigo: string): Observable<Departamento> {
    const url = `${this.apiUrl}/${codigo}`;
    return this.http.get<Departamento>(url);
  }

  criarDepartamento(departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(this.apiUrl, departamento);
  }

  atualizarDepartamento(departamento: Departamento): Observable<Departamento> {
    const url = `${this.apiUrl}/${departamento.codigo}`;
    return this.http.put<Departamento>(url, departamento);
  }

  deletarDepartamento(codigo: string): Observable<void> {
    const url = `${this.apiUrl}/${codigo}`;
    return this.http.delete<void>(url);
  }
}
