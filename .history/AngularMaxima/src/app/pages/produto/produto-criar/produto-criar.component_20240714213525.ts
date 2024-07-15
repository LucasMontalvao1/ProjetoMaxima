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
      const statusValue = this.produtoForm.get('status')?.value ? 1 : 0;
      const inutilizavelValue = this.produtoForm.get('inutilizavel')?.value ? 1 : 0;

      const { codigo, descricao, preco, departamentoCodigo } = this.produtoForm.value;

      this.produtoService.criarProduto(
        codigo,
        descricao,
        preco,
        departamentoCodigo,
        statusValue,
        inutilizavelValue
      ).subscribe(
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

  voltarParaHome() {
    this.router.navigate(['/home']);
  }

  voltarParaProdutos() {
    this.router.navigate(['/produtos']);
  }
}
