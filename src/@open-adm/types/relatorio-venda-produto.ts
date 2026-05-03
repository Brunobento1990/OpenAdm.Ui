export interface IRelatorioVendaProdutoRequest {
  dataInicial?: string
  dataFinal?: string
  skip: number
  tipo?: number
  asc: boolean
}

export interface IRelatorioVendaProdutoResponse {
  dados: any[]
  totalPagina: number
}
