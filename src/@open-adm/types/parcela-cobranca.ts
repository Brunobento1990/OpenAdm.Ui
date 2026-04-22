export interface IParcelaCobranca {
  id: string
  dataDeCriacao: string
  dataDeAtualizacao: string
  numero: number
  dataDeVencimento: string
  dataDePagamento?: string
  mesCobranca: number
  anoCobranca: number
  valor: number
  valorPago: number
  pago: boolean
  vencido: boolean
  pix?: {
    qrCode?: string
    copiaECola?: string
  }
}
