export interface Produto {
  id?: number;
  codigo: string;
  descricao: string;
  preco: number;
  departamentoCodigo: string;
  status: boolean;
  inutilizavel: boolean;
}
