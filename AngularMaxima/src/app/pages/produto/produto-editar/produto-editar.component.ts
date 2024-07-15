import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { Departamento } from 'src/app/models/departamento.model';

@Component({
  selector: 'app-produtos-editar',
  templateUrl: './produto-editar.component.html',
  styleUrls: ['./produto-editar.component.css']
})
export class ProdutoEditarComponent implements OnInit {
  produtoForm!: FormGroup;
  produtoId: number = 0;
  departamentosAtivos: Departamento[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService,
    private departamentoService: DepartamentoService
  ) {}

  ngOnInit(): void {
    this.produtoForm = this.formBuilder.group({
      id: [null],
      codigo: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: ['', Validators.required],
      departamentoCodigo: ['', Validators.required],
      status: [false],
      inutilizavel: [false]
    });

    this.carregarProdutoParaEdicao();
    this.carregarDepartamentos();
  }

  carregarProdutoParaEdicao() {
    this.produtoId = this.route.snapshot.params['id'];
    this.produtoService.getProdutoById(this.produtoId).subscribe(
      (produto: Produto) => {
        this.produtoForm.patchValue({
          id: produto.id,
          codigo: produto.codigo,
          descricao: produto.descricao,
          preco: produto.preco,
          departamentoCodigo: produto.departamentoCodigo,
          status: produto.status === 1,
          inutilizavel: produto.inutilizavel === 1
        });
      },
      (error) => {
        console.error('Erro ao carregar produto para edição:', error);
        alert('Erro ao carregar produto para edição. Verifique o console para mais detalhes.');
      }
    );
  }

  carregarDepartamentos() {
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

  onSubmit() {
    if (this.produtoForm.valid) {
      const statusValue = this.produtoForm.get('status')?.value ? 1 : 0;
      const inutilizavelValue = this.produtoForm.get('inutilizavel')?.value ? 1 : 0;

      const produto: Produto = {
        id: this.produtoForm.get('id')?.value,
        codigo: this.produtoForm.get('codigo')?.value,
        descricao: this.produtoForm.get('descricao')?.value,
        preco: this.produtoForm.get('preco')?.value,
        departamentoCodigo: this.produtoForm.get('departamentoCodigo')?.value,
        status: statusValue,
        inutilizavel: inutilizavelValue
      };

      this.produtoService.updateProduto(this.produtoId, produto).subscribe(
        (response) => {
          console.log('Produto atualizado com sucesso:', response);
          alert('Produto atualizado com sucesso.');
          this.router.navigate(['/produto']);
        },
        (error) => {
          console.error('Erro ao atualizar produto:', error);
          if (error.status === 400) {
            alert('Não foi possível atualizar o produto. Verifique os dados e tente novamente.');
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
