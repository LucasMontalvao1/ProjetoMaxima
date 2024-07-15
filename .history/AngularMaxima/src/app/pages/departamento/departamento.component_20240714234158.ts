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
}
