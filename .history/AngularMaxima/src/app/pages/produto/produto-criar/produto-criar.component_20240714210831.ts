import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdutoService } from '../../../services/produto.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { Departamento } from 'src/app/models/departamento.model';

@Component({
  selector: 'app-produtos-criar',
  templateUrl: './produtos-criar.component.html',
  styleUrls: ['./produtos-criar.component.css']
})
export class ProdutosCriarComponent implements OnInit {

  produtoForm!: FormGroup;
  departamentosAtivos: Departamento[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private produtoService: ProdutoService,
    private departamentoService: DepartamentoService
  ) {}

  ngOnInit(): void {
    this.produtoForm = this.formBuilder.group({
      codigo: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: ['', Validators.required],
      departamentoCodigo: ['', Validators.required],
      status: [false],
      inutilizavel: [false]
    });

    this.carregarDepartamentos();
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

  onSubmit() {
    if (this.produtoForm.valid) {
      const { codigo, descricao, preco, departamentoCodigo, status, inutilizavel } = this.produtoForm.value;

      const novoProduto: Produto = {
        codigo,
        descricao,
        preco,
        departamentoCodigo,
        status: status ? 1 : 0, // Converte boolean para number 1 ou 0
        inutilizavel: inutilizavel ? 1 : 0 // Converte boolean para number 1 ou 0
      };

      this.produtoService.createProduto(novoProduto).subscribe(
        (response) => {
          console.log('Produto criado com sucesso:', response);
          this.router.navigate(['/produtos']);
        },
        (error) => {
          console.error('Erro ao criar produto:', error);
        }
      );
    } else {
      console.error('Formulário inválido. Verifique os campos.');
    }
  }
}
