import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
  if (this.loginForm.valid) {
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      (response) => {
        console.log('Resposta do login:', response);

        // Exemplo: verificar se há um token de autenticação na resposta
        if (response.body && response.body.token) {
          // Login bem-sucedido, pode redirecionar ou fazer outras ações necessárias
          console.log('Login bem-sucedido! Token:', response.body.token);
          this.router.navigate(['/home']);
        } else {
          console.error('Resposta de login inesperada:', response);
          this.errorMessage = 'Erro ao realizar login. Por favor, tente novamente mais tarde.';
        }
      },
      (error) => {
        console.error('Erro no login:', error);
        if (error.status === 400) {
          this.errorMessage = 'Credenciais inválidas. Por favor, tente novamente.';
        } else {
          this.errorMessage = 'Erro ao realizar login. Por favor, tente novamente mais tarde.';
        }
      }
    );
  } else {
    console.error('Formulário inválido. Verifique os campos.');
    this.errorMessage = 'Por favor, preencha corretamente o usuário e senha.';
  }
}
}