"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
(0, promises_1.readFile)('./api/estoque.json', 'utf-8')
    .then((conteudo) => {
    return JSON.parse(conteudo);
})
    .then((itens) => {
    const valorTotalEstoque = itens.reduce((acumulador, item) => {
        return acumulador + item.preco * item.quantidade;
    }, 0);
    const produtosCriticos = itens
        .filter((item) => item.quantidade < 5)
        .map(({ codigo, nome, preco, quantidade }) => ({
        codigo,
        nome,
        preco,
        quantidade,
    }));
    const relatorio = {
        valorTotalEstoque,
        produtosCriticos,
    };
    console.log('[AUDITORIA] Relatório processado com sucesso:', relatorio);
    return relatorio;
})
    .then((relatorio) => {
    const dadosParaSalvar = JSON.stringify(relatorio, null, 2);
    return (0, promises_1.writeFile)('./auditoria.json', dadosParaSalvar, 'utf-8');
})
    .then(() => {
    console.log('[SUCESSO] Arquivo ./auditoria.json gerado com sucesso!');
})
    .catch((erro) => {
    const mensagem = erro instanceof Error ? erro.message : String(erro);
    console.error('[ERRO NA AUDITORIA]:', mensagem);
});
