import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { Departamento } from 'src/app/models/departamento.model';

@Component({
  selector: 'app-produto-detalhar',
  templateUrl: './produto-detalhar.component.html',
  styleUrls: ['./produto-detalhar.component.css']
})
export class ProdutoDetalharComponent implements OnInit {
  produto: Produto | undefined;
  produtoId: number = 0;
  departamentosAtivos: Departamento[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService,
    private departamentoService: DepartamentoService
  ) {}

  ngOnInit(): void {
    this.produtoId = Number(this.route.snapshot.params['id']);
    this.carregarProduto();
    this.carregarDepartamentos();
  }

  carregarProduto() {
    this.produtoService.getProdutoById(this.produtoId).subscribe(
      (produto: Produto) => {
        this.produto = produto;
      },
      (error) => {
        console.error('Erro ao carregar produto para detalhar:', error);
      }
    );
  }

  carregarDepartamentos() {
    this.departamentoService.getAllDepartamentos().subscribe(
      (data: Departamento[]) => {
        this.departamentosAtivos = data;
      },
      (error) => {
        console.error('Erro ao carregar departamentos:', error);
      }
    );
  }
}
