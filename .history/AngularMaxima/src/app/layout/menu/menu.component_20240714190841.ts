import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
    // Aqui você pode adicionar mais lógica após o logout, como redirecionar para a página de login
  }
}
