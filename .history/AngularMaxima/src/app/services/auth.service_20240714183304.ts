import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post<any>(`${this.apiUrl}/login`, body, { responseType: 'text' as 'json' });
  }

    logout() {
    // Aqui você pode adicionar a lógica para limpar o token de autenticação, se necessário
    // Exemplo simples de limpar token:
    localStorage.removeItem('token');

    // Redireciona para a página de login após logout
    this.router.navigate(['/login']);
}
