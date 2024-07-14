export interface Produto {
  id?: number;
  codigo: string;
  descricao: string;
  preco: number;
  departamentoCodigo: string;
  status: number;
  inutilizavel: number;
}
