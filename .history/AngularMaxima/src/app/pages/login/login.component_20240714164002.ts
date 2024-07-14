import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.authService.login(credentials).subscribe(
        response => {
          // Lógica para redirecionar para a próxima página após login
          console.log('Login bem-sucedido:', response);
        },
        error => {
          this.loginError = true;
          console.error('Erro no login:', error);
        }
      );
    } else {
      // Marcar campos como tocados para mostrar mensagens de erro
      this.markFormFieldsAsTouched();
    }
  }

  markFormFieldsAsTouched(): void {
    Object.values(this.loginForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
