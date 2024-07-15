import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto } from '../../../models/';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto-criar',
  templateUrl: './produto-criar.component.html',
  styleUrls: ['./produto-criar.component.css']
})
export class ProdutoCriarComponent implements OnInit {
  produtoForm: FormGroup;
  departamentosAtivos: any[]; // Certifique-se de definir corretamente o tipo de dado para departamentosAtivos

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.carregarDepartamentosAtivos();
  }

  initForm(): void {
    this.produtoForm = this.fb.group({
      codigo: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: ['', Validators.required],
      departamentoCodigo: ['', Validators.required],
      status: [false],
      inutilizavel: [false]
    });
  }

  onSubmit(): void {
    if (this.produtoForm.invalid) {
      // Exibir mensagem de erro para o usuário
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const novoProduto: Produto = this.produtoForm.value;

    this.produtoService.createProduto(novoProduto).subscribe(
      (response: Produto) => {
        console.log('Produto criado com sucesso:', response);
        // Exibir mensagem de sucesso para o usuário
        alert('Produto criado com sucesso.');
        this.carregarProdutos(); // Certifique-se de implementar este método se necessário
      },
      (error) => {
        console.error('Erro ao criar produto:', error);
        // Exibir mensagem de erro para o usuário
        if (error.status === 400) {
          alert('Não foi possível criar o produto. Verifique os dados e tente novamente.');
        } else {
          alert('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.');
        }
      }
    );
  }

  carregarDepartamentosAtivos(): void {
    // Implemente o método para carregar os departamentos ativos se necessário
  }
}
