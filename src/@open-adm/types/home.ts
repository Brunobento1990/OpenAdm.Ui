import { ICliente } from './cliente'

export interface IHome {
  movimentos: IMovimentoProdutoHome[]
  faturas: IFaturaHome[]
  totalAReceber: number
  statusPedido: IStatusPedidoHome[]
  quantidadeDeAcessoEcommerce: number
  quantidadeDeUsuarioCnpj: number
  quantidadeDeUsuarioCpf: number
  variacaoMensalPedido: IVariacaoMensalPedido
  usuarioSemPedidoCpf: ICliente[]
  usuarioSemPedidoCnpj: ICliente[]
  pedidosPorDia: IPedidosPorDia[]
  totalProdutoEstoque: number
  totalProdutoEstoqueReservado: number
  quantidadeProdutoDisponivel: number
  produtosMaisVendidos: IVendaProduto[]
  produtosMenosVendidos: IVendaProduto[]
  cobranca: ICobrancaHome
}

export interface ICobrancaHome {
  totalHoje: number
  totalSemana: number
  totalCobranca: number
  quantidadeACobrar: number
  cobrancasMaisAntigas: IItemCobrancaHome[]
}

interface IItemCobrancaHome {
  pedidoId: string
  numeroPedido: number
  valor: number
  aDias: number
  cliente: string
}

export interface IVendaProduto {
  id: string
  descricao: string
  foto: string
  peso?: string
  tamanho?: string
  quantidade: number
}

export interface IStatusPedidoHome {
  quantidade: number
  status: number
  porcentagem: number
}

export interface IPedidosPorDia {
  data: string
  total: number
  diaSemana: string
}

export interface IVariacaoMensalPedido {
  mes: string
  totalAnoAnterior: number
  totalAnoAtual: number
  porcentagem: number
  anoAtual: number
  anoAnterior: number
}

export interface IFaturaHome {
  mes: string
  count: number
}

export interface IMovimentoProdutoHome {
  mes: string
  data: string
  dados: IDadosMovimentoProdutoHome[]
}

export interface IDadosMovimentoProdutoHome {
  quantidade: number
  categoria: string
}

export interface IPosicaoEstoqueHome {
  id: string
  dataDeCriacao: string
  dataDeAtualizacao: string
  numero: number
  quantidade: number
  produtoId: string
  produto: string
  tamanho: string
  peso: string
  foto: string
}

export interface IUsuarioHome {
  id: string
  dataDeCriacao: string
  dataDeAtualizacao: string
  numero: number
  totalPedidos: number
  totalCompra: number
  usuario: string
}
