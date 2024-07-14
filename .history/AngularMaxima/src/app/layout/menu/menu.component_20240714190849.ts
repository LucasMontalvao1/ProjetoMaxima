import { Component } from '@angular/core';
import { AuthService } from '../';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
