import { YupAdapter } from 'src/@open-adm/adapters/yup-adapter'
import { IConfiguracaoDeFrete } from 'src/@open-adm/types/configuracao-de-frete'

export const initialValues: Partial<IConfiguracaoDeFrete> = {
  ativo: true,
  cobrarCnpj: true,
  cobrarCpf: true,
  token: ''
}

export const schema = new YupAdapter().string('token').build()
