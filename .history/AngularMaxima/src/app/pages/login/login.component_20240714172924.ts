import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  showError = false; // Flag para controlar exibição de mensagem de erro

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
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
          if (response.status === 200) {
            console.log('Login bem-sucedido!');
            this.router.navigate(['/home']);
          } else {
            console.error('Erro desconhecido no login:', response);
            this.showError = true; // Mostra mensagem de erro no template
          }
        },
        (error) => {
          console.error('Erro no login:', error);
          if (error.status === 401) {
            alert('Credenciais inválidas. Por favor, tente novamente.');
          } else {
            alert('Erro ao realizar login. Por favor, tente novamente mais tarde.');
          }
        }
      );
    } else {
      console.error('Formulário inválido. Verifique os campos.');
      this.showError = true; // Mostra mensagem de erro no template
    }
  }

  // Método para fechar a mensagem de erro
  closeError() {
    this.showError = false;
  }
}
