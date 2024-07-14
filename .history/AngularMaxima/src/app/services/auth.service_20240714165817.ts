import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: LoginModel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }
}
