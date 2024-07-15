import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Produto } from '../../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-produto-detalhar',
  templateUrl: './produto-detalhar.component.html',
  styleUrls: ['./produto-detalhar.component.css']
})
export class ProdutoDetalharComponent implements OnInit {
  produtoForm: FormGroup;
  produto: Produto;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService
  ) {
    this.produtoForm = this.formBuilder.group({
      codigo: [''],
      descricao: [''],
      preco: [''],
      departamentoCodigo: [''],
      status: [''],
      inutilizavel: ['']
    });
  }

  ngOnInit(): void {
    this.carregarProduto();
  }

  carregarProduto() {
    const produtoId = this.route.snapshot.params['id'];
    this.produtoService.getProdutoById(produtoId).subscribe(
      (produto: Produto) => {
        this.produto = produto;
        this.produtoForm.patchValue({
          codigo: produto.codigo,
          descricao: produto.descricao,
          preco: produto.preco,
          departamentoCodigo: produto.departamentoCodigo,
          status: produto.status === 1 ? 'Ativo' : 'Inativo',
          inutilizavel: produto.inutilizavel === 1 ? 'Sim' : 'Não'
        });
      },
      (error) => {
        console.error('Erro ao carregar produto:', error);
      }
    );
  }

  confirmarExclusao() {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      // Abre o componente ou serviço para realizar a exclusão
      this.router.navigate(['/produto/excluir', this.produto.id]);
    }
  }

  voltar() {
    // Voltar para a página anterior
    this.router.navigate(['/produto']);
  }
}
