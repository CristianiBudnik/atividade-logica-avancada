import { readFile, writeFile } from 'fs/promises';
import type { ItemEstoque, RelatorioAuditoria } from './type/type';

readFile('./api/estoque.json', 'utf-8')

  .then((conteudoItem: string): ItemEstoque[] => {
    return JSON.parse(conteudoItem) as ItemEstoque[];
  })

  .then((itensQuantidade: ItemEstoque[]): RelatorioAuditoria => {
    const valorTotalEstoque = itensQuantidade.reduce((acumulador, item) => {
      return acumulador + item.preco * item.quantidade;
    }, 0);

    const produtosCriticos: ItemEstoque[] = itensQuantidade
      .filter((item) => item.quantidade < 5)
      .map(({ codigo, nome, preco, quantidade }) => ({
        codigo, nome, preco, quantidade,
      }));

    const relatorio: RelatorioAuditoria = {
      valorTotalEstoque, produtosCriticos,
    };
    console.log('[AUDITORIA] Relatório realizado com sucesso:', relatorio);
    return relatorio;
  })

  .then((relatorio: RelatorioAuditoria) => {
    const relatorioParaSalvar = JSON.stringify(relatorio, null, 2);
    return writeFile('./auditoria.json', relatorioParaSalvar, 'utf-8');
  })

  .then(() => {
    console.log('[SUCESSO] Arquivo ./auditoria.json gerado com sucesso!');
  })
  
  .catch((erro: unknown) => {
    const mensagem = erro instanceof Error ? erro.message : String(erro);
    console.error('[ERRO NA AUDITORIA]:', mensagem);
  });
  