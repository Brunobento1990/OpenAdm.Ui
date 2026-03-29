import { IBase } from './base'

export interface ITamanho extends IBase {
  descricao: string
  pesoReal?: number
  alturaReal?: number
  larguraReal?: number
  comprimentoReal?: number
}
