import { ICliente } from "./cliente";

export interface IHome {
    posicaoDeEstoques: IPosicaoEstoqueHome[];
    topUsuariosTotalCompra: IUsuarioHome[];
    topUsuariosTotalPedido: IUsuarioHome[];
    movimentos: IMovimentoProdutoHome[];
    faturas: IFaturaHome[];
    totalAReceber: number;
    statusPedido: IStatusPedidoHome[];
    quantidadeDeAcessoEcommerce: number;
    quantidadeDeUsuarioCnpj: number;
    quantidadeDeUsuarioCpf: number;
    variacaoMensalPedido: IVariacaoMensalPedido;
    usuarioSemPedido: ICliente[]
}

export interface IStatusPedidoHome {
    quantidade: number;
    status: number;
}
export interface IVariacaoMensalPedido {
    mes: string;
    totalAnoAnterior: number;
    totalAnoAtual: number;
    porcentagem: number;
    anoAtual: number;
    anoAnterior: number;
}

export interface IFaturaHome {
    mes: string;
    count: number;
}

export interface IMovimentoProdutoHome {
    mes: string;
    data: string;
    dados: IDadosMovimentoProdutoHome[];
}

export interface IDadosMovimentoProdutoHome {
    quantidade: number;
    categoria: string;
}

export interface IPosicaoEstoqueHome {
    id: string;
    dataDeCriacao: string;
    dataDeAtualizacao: string;
    numero: number;
    quantidade: number;
    produtoId: string;
    produto: string;
    tamanho: string;
    peso: string;
    foto: string;
}

export interface IUsuarioHome {
    id: string;
    dataDeCriacao: string;
    dataDeAtualizacao: string;
    numero: number;
    totalPedidos: number;
    totalCompra: number;
    usuario: string;
}
