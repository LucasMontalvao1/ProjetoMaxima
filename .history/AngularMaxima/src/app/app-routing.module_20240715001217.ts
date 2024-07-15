import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProdutoComponent } from './pages/produto/produto.component';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { ProdutoCriarComponent } from './pages/produto/produto-criar/produto-criar.component';
import { ProdutoEditarComponent } from './pages/produto/produto-editar/produto-editar.component';
import { ProdutoDetalharComponent } from './pages/produto/produto-detalhar/produto-detalhar.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'produto', component: ProdutoComponent},
  { path: 'produto/criar', component: ProdutoCriarComponent},
  { path: 'produto/editar/:id', component: ProdutoEditarComponent},
  { path: 'produto/detalhar', component: ProdutoDetalharComponent},
  { path: 'departamento', component: DepartamentoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
