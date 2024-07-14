import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup; // Adiciona o '!' para indicar que será inicializado no construtor
  loginError: string = ''; // Exemplo de inicialização direta

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password').value;
      
      this.authService.login({ username, password }).subscribe(
        response => {
          console.log('Resposta da API:', response);
          // Lógica para redirecionar ou processar a resposta
        },
        error => {
          console.error('Erro no login:', error);
          this.loginError = 'Erro ao tentar fazer login.';
        }
      );
    }
  }
}
