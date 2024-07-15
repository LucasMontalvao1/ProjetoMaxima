import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-produto-detalhar',
  templateUrl: './produto-detalhar.component.html',
  styleUrls: ['./produto-detalhar.component.css']
})
export class ProdutoDetalharComponent implements OnInit {
  produto: Produto | undefined;
  produtoId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.produtoId = Number(this.route.snapshot.params['id']);
    this.carregarProduto();
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
}
