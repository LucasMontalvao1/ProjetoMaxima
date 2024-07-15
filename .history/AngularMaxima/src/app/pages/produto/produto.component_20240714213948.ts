import { Component } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent {

  constructor(private produtoService: ProdutoService) { }

  criarNovoProduto() {
    // Supondo que você tenha os valores necessários para criar um novo produto
    const codigo = 'P001';
    const descricao = 'Descrição do produto';
    const preco = 100.0;
    const departamentoCodigo = 'D001';
    const status = 1; // Exemplo de valor para status
    const inutilizavel = 0; // Exemplo de valor para inutilizável

    // Chamar a função criarProduto com todos os argumentos necessários
    this.produtoService.createProduto(codigo, descricao, preco, departamentoCodigo, status, inutilizavel)
      .subscribe(
        (response) => {
          console.log('Produto criado com sucesso:', response);
          // Realizar qualquer outra ação necessária após a criação do produto
        },
        (error) => {
          console.error('Erro ao criar produto:', error);
        }
      );
  }

}
