import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';
import { Departamento } from '../../../models/departamento.model';
import { DepartamentoService } from '../../../services/departamento.service';

@Component({
  selector: 'app-produto-deletar',
  templateUrl: './produto-deletar.component.html',
  styleUrls: ['./produto-deletar.component.css']
})
export class ProdutoDeletarComponent implements OnInit {
  produto: Produto | undefined;
  departamentosAtivos: Departamento[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService,
    private departamentoService: DepartamentoService
  ) { }

  ngOnInit(): void {
    this.carregarProduto();
    this.carregarDepartamentos();
  }

  carregarProduto(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.produtoService.getProdutoById(id).subscribe(
      (data: Produto) => {
        this.produto = data;
      },
      (error) => {
        console.error('Erro ao carregar produto:', error);
        alert('Erro ao carregar produto. Verifique o console para mais detalhes.');
      }
    );
  }

  carregarDepartamentos(): void {
    this.departamentoService.getAllDepartamentos().subscribe(
      (data: Departamento[]) => {
        this.departamentosAtivos = data;
      },
      (error) => {
        console.error('Erro ao carregar departamentos:', error);
        alert('Erro ao carregar departamentos. Verifique o console para mais detalhes.');
      }
    );
  }

  apagarProduto(): void {
    if (this.produto && this.produto.id) {
      this.produtoService.updateProdutoInutilizavel(this.produto.id).subscribe(
        () => {
          console.log('Produto marcado como inutilizável com sucesso.');
          alert('Produto marcado como inutilizável com sucesso.');
          this.router.navigate(['/produto']);
        },
        (error) => {
          console.error('Erro ao marcar produto como inutilizável:', error);
          alert('Ocorreu um erro ao tentar marcar o produto como inutilizável. Verifique o console para mais detalhes.');
        }
      );
    } else {
      console.error('ID do produto não encontrado.');
      alert('ID do produto não encontrado.');
    }
  }
}
