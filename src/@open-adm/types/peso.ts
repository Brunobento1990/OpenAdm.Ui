import { IBase } from './base'

export interface IPeso extends IBase {
  descricao: string
  pesoReal?: number
  alturaReal?: number
  larguraReal?: number
  comprimentoReal?: number
}
