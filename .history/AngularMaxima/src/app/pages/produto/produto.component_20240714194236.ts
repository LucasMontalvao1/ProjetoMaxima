// produtos.component.ts

import { Component, OnInit } from '@angular/core';
import { Produto } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.loadProdutos();
  }

  loadProdutos(): void {
    this.produtoService.getAllProdutos().subscribe(
      (data: Produto[]) => {
        this.produtos = data;
      },
      (error) => {
        console.error('Erro ao carregar produtos:', error);
      }
    );
  }

  buscarProdutoPorId(id: number): void {
    this.produtoService.getProdutoById(id).subscribe(
      (produto: Produto) => {
        console.log('Produto encontrado:', produto);
        // Aqui você pode implementar lógica para lidar com o produto encontrado
      },
      (error) => {
        console.error('Erro ao buscar produto por ID:', error);
      }
    );
  }

  buscarProdutoPorCodigo(codigo: string): void {
    this.produtoService.getProdutoByCodigo(codigo).subscribe(
      (produto: Produto) => {
        console.log('Produto encontrado:', produto);
        // Aqui você pode implementar lógica para lidar com o produto encontrado
      },
      (error) => {
        console.error('Erro ao buscar produto por código:', error);
      }
    );
  }

  criarProduto(): void {
    const novoProduto: Produto = {
      codigo: 'NovoCodigo',
      descricao: 'Nova Descrição',
      preco: 0,
      departamentoCodigo: '001',
      status: 0,
      inutilizavel: 0
    };

    this.produtoS