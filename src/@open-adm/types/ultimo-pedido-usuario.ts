export interface IPaginacaoUltimoPedidoUsuario {
    dados: IUltimoPedidoUsuario[],
    totalPagina: number
}

export interface IPaginacaoUltimoPedidoUsuarioRequest {
    page: number;
    search: string;
    isJuridico: boolean;
}

export interface IUltimoPedidoUsuario {
    usuarioId: string,
    nome: string,
    cpfCnpj: string,
    telefone: string,
    pedidoId?: string,
    dataDoUltimoPedido?: string,
    total?: number,
    numeroDoPedido?: number,
    statusPedido?: number
}