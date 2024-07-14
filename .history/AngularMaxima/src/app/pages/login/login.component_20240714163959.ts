<div class="login-container">
  <header class="header">
    <h1>Bem-vindo ao Sistema de Controle Financeiro</h1>
  </header>
  <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
    <div class="form-group">
      <label for="username">Usuário:</label>
      <input type="text" id="username" formControlName="username" class="form-control" [ngClass]="{'input-error': loginForm.get('username').invalid && submitted}">
      <div *ngIf="loginForm.get('username').invalid && submitted" class="text-danger">
        O campo usuário é obrigatório.
      </div>
    </div>
    <div class="form-group">
      <label for="password">Senha:</label>
      <input type="password" id="password" formControlName="password" class="form-control" [ngClass]="{'input-error': loginForm.get('password').invalid && submitted}">
      <div *ngIf="loginForm.get('password').invalid && submitted" class="text-danger">
        O campo senha é obrigatório.
      </div>
    </div>
    <button type="submit" class="btn btn-primary login-button">Entrar</button>
  </form>
  <footer class="footer">
    <p>&copy; 2024 Sistema de Controle Financeiro. Todos os direitos reservados.</p>
  </footer>
</div>
