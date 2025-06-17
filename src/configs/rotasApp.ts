export const rotasApp = {
    home: "/",
    login: "/authentication/login",
    banner: {
        pagincao: "/banners",
        create: "banners/create",
        view: "banners/view",
        edit: "banners/edit",
    },
    lojasParceiras: {
        pagincao: "/lojas-parceiras",
        create: "lojas-parceiras/create",
        view: "lojas-parceiras/view",
        edit: "lojas-parceiras/edit",
    },
    categoria: {
        pagincao: "/estoque/categoria",
        create: "categoria/create",
        view: "categoria/view",
        edit: "categoria/edit",
    },
    peso: {
        pagincao: "/estoque/peso",
        create: "peso/create",
        view: "peso/view",
        edit: "peso/edit",
    },
    tamanho: {
        pagincao: "/estoque/tamanho",
        create: "tamanho/create",
        view: "tamanho/view",
        edit: "tamanho/edit",
    },
    produto: {
        pagincao: "/estoque/produto",
        create: "produto/create",
        view: "produto/view",
        edit: "produto/edit",
    },
    movimentoProduto: {
        create: "movimento-produto/create",
        paginacao: "/estoque/movimentacao-produto",
    },
    posicaoEstoque: {
        edit: "posicao-estoque/edit",
        paginacao: "/estoque/posicao-estoque",
    },
    cliente: {
        create: "cliente/create",
        view: "cliente/view",
        paginacao: "/vendas/cliente",
    },
    tabelaDePreco: {
        create: "tabeladepreco/create",
        view: "/vendas/tabeladepreco/view",
        paginacao: "/vendas/tabeladepreco",
        edit: "/vendas/tabeladepreco/edit",
    },
    configuracaoEmail: {
        create: "configuracao/email",
    },
    configuracaoPedido: {
        create: "configuracao/pedido",
    },
    pedido: {
        modificarStatusPedido: "/vendas/pedidos/modificar-status-pedido",
        create: "/vendas/pedidos/create",
        paginacao: "/pedidos",
    },
};
