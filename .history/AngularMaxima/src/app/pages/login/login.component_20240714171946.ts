import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginModel = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Você pode adicionar lógica de inicialização aqui, se necessário
  }

  onSubmit() {
    if (this.loginModel.valid) {
      const username = this.loginModel.get('username')?.value;
      const password = this.loginModel.get('password')?.value;
      this.login(username, password);
    } else {
      // Formulário inválido, pode adicionar tratamento aqui se necessário
    }
  }

  login(username: string, password: string) {
    this.authService.login(username, password).subscribe(
      (response) => {
        // Sucesso: redirecionar para a página inicial ou fazer outra ação
        console.log('Login bem-sucedido!', response);
        this.router.navigate(['/home']); // Redirecionamento para a página inicial
      },
      (error) => {
        // Erro: lidar com o erro e fornecer feedback adequado
        console.error('Erro no login:', error);
        // Exemplo simples de como você pode tratar diferentes tipos de erro
        if (error.status === 401) {
          alert('Credenciais inválidas. Por favor, tente novamente.');
        } else {
          alert('Erro ao realizar login. Por favor, tente novamente mais tarde.');
        }
      }
    );
  }
}
