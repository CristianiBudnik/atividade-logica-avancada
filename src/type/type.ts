export type ItemEstoque = {
  codigo: number;
  nome: string;
  preco: number;
  quantidade: number;
};

export type RelatorioAuditoria = {
  valorTotalEstoque: number;
  produtosCriticos: ItemEstoque[];
};