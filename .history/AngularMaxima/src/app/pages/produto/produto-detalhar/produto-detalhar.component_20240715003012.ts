import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../produto.model'; // Importe o modelo do seu produto aqui

@Component({
  selector: 'app-produto-detalhar',
  templateUrl: './produto-detalhar.component.html',
  styleUrls: ['./produto-detalhar.component.css']
})
export class ProdutoDetalharComponent implements OnInit {
  produto: Produto | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const produtoId = Number(params.get('id')); 
      this.produto = {
        id: produtoId,
        codigo: 'P001',
        descricao: 'Produto de Exemplo',
        preco: 99.99,
        departamentoCodigo: 'D001',
        status: true,
        inutilizavel: false
      };
    });
  }
}
