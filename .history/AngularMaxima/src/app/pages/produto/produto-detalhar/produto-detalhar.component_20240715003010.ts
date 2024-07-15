import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../../../models/produto.model';
import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-produto-editar',
  templateUrl: './produto-d.component.html',
  styleUrls: ['./produto-editar.component.css']
})
export class ProdutoEditarComponent implements OnInit {
  produtoForm!: FormGroup;
  produtoId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService
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
      }
    );
  }

  cancelarEdicao() {
    this.router.navigate(['/produtos']);
  }
}
