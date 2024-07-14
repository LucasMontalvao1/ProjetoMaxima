import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Departamento } from '../../models';
import { DepartamentoService } from '../../services/departamento.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {
  departamentos: Departamento[] = [];

  constructor(private departamentoService: DepartamentoService) { }

  ngOnInit(): void {
    this.carregarDepartamentos();
  }

  carregarDepartamentos(): void {
    this.departamentoService.getAllDepartamentos().subscribe(
      (data: Departamento[]) => {
        this.departamentos = data;
      },
      (error) => {
        console.error('Erro ao carregar departamentos:', error);
      }
    );
  }

  buscarDepartamentoPorCodigo(codigo: string): void {
    this.departamentoService.getDepartamentoByCodigo(codigo).subscribe(
      (departamento: Departamento) => {
        console.log('Departamento encontrado:', departamento);
      },
      (error) => {
        console.error('Erro ao buscar departamento por código:', error);
      }
    );
  }

  criarDepartamento(): void {
    const novoDepartamento: Departamento = {
      codigo: 'NovoCodigo',
      descricao: 'Nova Descrição'
    };

    this.departamentoService.createDepartamento(novoDepartamento).subscribe(
      (response: Departamento) => {
        console.log('Departamento criado com sucesso:', response);
        this.carregarDepartamentos();
      },
      (error) => {
        console.error('Erro ao criar departamento:', error);
      }
    );
  }

  editarDepartamento(id: number): void {
    // Implementar lógica para edição de departamento
    // Exemplo básico: carregar o departamento pelo ID, fazer as alterações necessárias e chamar o serviço de atualização
    const departamentoEditado: Departamento = {
      id: id,
      codigo: 'CodigoEditado',
      descricao: 'DescriçãoEditada'
    };

    this.departamentoService.updateDepartamento(id, departamentoEditado).subscribe(
      (response: Departamento) => {
        console.log('Departamento atualizado com sucesso:', response);
        this.carregarDepartamentos();
      },
      (error) => {
        console.error('Erro ao editar departamento:', error);
      }
    );
  }

  detalhesDepartamento(id: number): void {
    this.departamentoService.getDepartamentoById(id).subscribe(
      (departamento: Departamento) => {
        console.log('Detalhes do departamento:', departamento);
        // Aqui você pode exibir os detalhes do departamento em um modal ou página separada
      },
      (error) => {
        console.error('Erro ao carregar detalhes do departamento:', error);
      }
    );
  }

  excluirDepartamento(id: number): void {
    if (confirm('Tem certeza que deseja apagar este departamento?')) {
      this.departamentoService.deleteDepartamento(id).subscribe(
        () => {
          console.log('Departamento excluído com sucesso.');
          this.carregarDepartamentos();
        },
        (error) => {
          console.error('Erro ao apagar departamento:', error);
        }
      );
    }
  }
}
