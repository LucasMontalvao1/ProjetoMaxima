import { Component } from '@angular/core';
import { AuthService } from '../../';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) {}

  login(username: string, password: string) {
    this.authService.login(username, password).subscribe(
      (response) => {
        // Sucesso: redirecionar para a página inicial ou fazer outra ação
        console.log('Login bem-sucedido!', response);
        this.router.navigate(['/home']); // Exemplo de redirecionamento para a página inicial
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
