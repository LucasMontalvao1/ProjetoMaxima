import { Component, OnInit } from '@angular/core';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = []; 

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.getAllProdutos().subscribe(
      (data: Produto[]) => {
        this.produtos = data;
      },
      (error) => {
        console.error('Erro ao carregar produtos:', error);
      }
    );
  }

  editarProduto(id: number): void {

  }

  detalhesProduto(id: number): void {
  }

  excluirProduto(id: number): void {
    if (confirm('Tem certeza que deseja apagar este produto?')) {
      this.produtoService.deleteProduto(id).subscribe(
        () => {
          console.log('Produto excluído com sucesso.');
          this.carregarProdutos(); 
        },
        (error) => {
          console.error('Erro ao apagar produto:', error);
        }
      );
    }
  }
}
