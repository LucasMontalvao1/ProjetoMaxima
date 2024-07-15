import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdutoService } from '../../../services/produto.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { Departamento } from 'src/app/models/departamento.model';

@Component({
  selector: 'app-produtos-criar',
  templateUrl: './produto-criar.component.html',
  styleUrls: ['./produto-criar.component.css']
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

      const produto = {
        codigo,
        descricao,
        preco,
        departamentoCodigo,
        status: statusValue,
        inutilizavel: inutilizavelValue
      };

      console.log('Dados do produto a serem enviados:', produto);

      this.produtoService.createProduto(
        produto.codigo,
        produto.descricao,
        produto.preco,
        produto.departamentoCodigo,
        produto.status,
        produto.inutilizavel
      ).subscribe(
        (response) => {
          console.log('Produto criado com sucesso:', response);
          alert('Produto criado com sucesso.');
          this.router.navigate(['/produtos']);
        },
        (error) => {
          console.error('Erro ao criar produto:', error);
          if (error.status === 400) {
            alert('Não foi possível criar o produto. Verifique os dados e tente novamente.');
          } else {
            alert('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.');
          }
        }
      );
    } else {
      console.error('Formulário inválido. Verifique os campos.');
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
}
