import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Departamento } from '../../../models/departamento.model';
import { DepartamentoService } from '../../../services/departamento.service';
import { Produto } from '../../../models/produto.model';

@Component({
  selector: 'app-departamentos-deletar',
  templateUrl: './departamento-deletar.component.html',
  styleUrls: ['./departamento-deletar.component.css']
})
export class DepartamentoDeletarComponent implements OnInit {
  departamento: Departamento | undefined;
  departamentoCodigo: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departamentoService: DepartamentoService
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
    this.departamentoService.getProdutosVinculadosDepartamento(this.departamentoCodigo).subscribe(
      (produtos: Produto[]) => {
        if (produtos && produtos.length > 0) {
          alert('Não é possível apagar o departamento. Existem produtos vinculados a este departamento.');
        } else {
          this.departamentoService.deleteDepartamento(this.departamentoCodigo).subscribe(
            () => {
              console.log('Departamento apagado com sucesso.');
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
        if (error.status === 404) {
          console.log('Nenhum produto encontrado para o departamento com código', this.departamentoCodigo);
          this.apagarDepartamentoDiretamente();
        } else {
          console.error('Erro ao verificar produtos vinculados:', error);
          alert('Erro ao verificar produtos vinculados. Verifique o console para mais detalhes.');
        }
      }
    );
  }

  apagarDepartamentoDiretamente() {
    this.departamentoService.deleteDepartamento(this.departamentoCodigo).subscribe(
      () => {
        console.log('Departamento apagado com sucesso.');
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
}
