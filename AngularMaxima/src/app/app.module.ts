import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './layout/menu/menu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { ProdutoCriarComponent } from '../../src/app/pages/produto/produto-criar/produto-criar.component';
import { ProdutoEditarComponent } from './pages/produto/produto-editar/produto-editar.component';
import { ProdutoDetalharComponent } from './pages/produto/produto-detalhar/produto-detalhar.component';
import { RouterModule } from '@angular/router';
import { ProdutoDeletarComponent } from './pages/produto/produto-deletar/produto-deletar.component';
import { DepartamentoCriarComponent } from './pages/departamento/departamento-criar/departamento-criar.component';
import { DepartamentoEditarComponent } from './pages/departamento/departamento-editar/departamento-editar.component';
import { DepartamentoDeletarComponent } from './pages/departamento/departamento-deletar/departamento-deletar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    FooterComponent,
    ProdutoComponent,
    ProdutoCriarComponent,
    ProdutoEditarComponent,
    ProdutoDetalharComponent,
    DepartamentoComponent,
    ProdutoDeletarComponent,
    DepartamentoCriarComponent,
    DepartamentoEditarComponent,
    DepartamentoDeletarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
