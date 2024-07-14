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

  loginForm!: FormGroup; // Aqui é onde o erro ocorre

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { login, senha } = this.loginForm.value;
      this.authService.login(login, senha).subscribe(
        (response) => {
          console.log('Login bem-sucedido!', response);
          this.router.navigate(['/home']);
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
    }
  }
}
