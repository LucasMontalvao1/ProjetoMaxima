import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<HttpResponse<any>> {
    const body = { login: username, senha: password }; 
    return this.http.post<any>(`${this.apiUrl}/login`, body, { observe: 'response' });
  }
}
