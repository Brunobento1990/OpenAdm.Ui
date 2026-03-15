import { IBase } from './base'

export interface IConfiguracaoDeFrete extends IBase {
  token: string
  ativo: boolean
  cobrarCnpj: boolean
  cobrarCpf: boolean
  cepOrigem?: string
}
