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

  loginForm?: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;
      this.login(username, password);
    } else {
      console.error('Formulário inválido. Verifique os campos.');
    }
  }

  login(username: string, password: string) {
    this.authService.login(username, password).subscribe(
      (response) => {
        console.log('Login bem-sucedido!', response);
        this.router.navigate(['/home']); // Redirecionamento para a página inicial após login
      },
      (error) => {
        console.error('Erro no login:', error);
        alert('Credenciais inválidas. Por favor, tente novamente.'); // Exemplo de feedback de erro
      }
    );
  }
}
