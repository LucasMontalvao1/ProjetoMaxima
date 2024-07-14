import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  cadastroOpen: boolean = false;

  toggleCadastro(open: boolean) {
    this.cadastroOpen = open;
  }
}
