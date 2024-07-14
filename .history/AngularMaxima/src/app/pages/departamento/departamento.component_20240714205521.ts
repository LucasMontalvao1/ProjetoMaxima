import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Departamento } from '../../models/departamento.model';
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

  detalhesDepartamento(codigo: string): void {
    this.departamentoService.getDepartamentoByCodigo(codigo).subscribe(
      (departamento: Departamento) => {
        console.log('Detalhes do departamento:', departamento);
      },
      (error) => {
        console.error('Erro ao carregar detalhes do departamento:', error);
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

    editarDepartamento(codigo: string): void {
    const codigoNumerico = parseInt(codigo, 10); // Convertendo string para número

    const departamentoEditado: Departamento = {
      codigo: codigo,
      descricao: 'Descrição editada'
    };

    this.departamentoService.updateDepartamento(codigoNumerico, departamentoEditado).subscribe(
      (response: Departamento) => {
        console.log('Departamento atualizado com sucesso:', response);
        this.carregarDepartamentos();
      },
      (error) => {
        console.error('Erro ao atualizar departamento:', error);
      }
    );
    }

  excluirDepartamento(codigo: string): void {
    if (confirm('Tem certeza que deseja apagar este departamento?')) {
      this.departamentoService.deleteDepartamento(codigo).subscribe(
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
