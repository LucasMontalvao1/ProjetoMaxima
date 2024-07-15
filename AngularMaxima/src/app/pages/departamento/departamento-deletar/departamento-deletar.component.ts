import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Departamento } from '../../../models/departamento.model';
import { DepartamentoService } from '../../../services/departamento.service';
import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-departamentos-deletar',
  templateUrl: './departamento-deletar.component.html',
  styleUrls: ['./departamento-deletar.component.css']
})
export class DepartamentoDeletarComponent implements OnInit {
  departamento!: Departamento;
  departamentoCodigo: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departamentoService: DepartamentoService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.departamentoCodigo = this.route.snapshot.params['codigo'];
    this.carregarDepartamento();
  }

  carregarDepartamento() {
    this.departamentoService.getDepartamentoByCodigo(this.departamentoCodigo).subscribe(
      (data: Departamento) => {
        this.departamento = data;
      },
      (error) => {
        console.error('Erro ao carregar departamento:', error);
        alert('Erro ao carregar departamento. Verifique o console para mais detalhes.');
      }
    );
  }

  apagarDepartamento() {
  this.produtoService.getProdutosByDepartamentoCodigo(this.departamentoCodigo).subscribe(
    (produtos) => {
      if (produtos && produtos.length > 0) {
        alert('Não é possível apagar o departamento. Existem produtos vinculados a este departamento.');
      } else {
        this.departamentoService.deleteDepartamento(this.departamento.codigo).subscribe(
          (response) => {
            console.log('Departamento apagado com sucesso:', response);
            alert('Departamento apagado com sucesso.');
            this.router.navigate(['/departamento']);
          },
          (error) => {
            console.error('Erro ao apagar departamento:', error);
            if (error.status === 400) {
              alert('Não foi possível apagar o departamento. Verifique os dados e tente novamente.');
            } else {
              alert('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.');
            }
          }
        );
      }
    },
    (error) => {
      console.error('Erro ao verificar produtos vinculados:', error);
      alert('Erro ao verificar produtos vinculados. Verifique o console para mais detalhes.');
    }
  );
  }
}