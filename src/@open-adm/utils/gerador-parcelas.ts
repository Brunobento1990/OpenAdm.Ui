import { IParcelaCriar } from '../types/fatura'
import { MeioDePagamentoEnum } from '../enuns/meio-de-pagamento-enum'
import { cleanFormatMoney } from './format-money'

interface IPropsGerarParcela {
  valor?: string | number
  quantidadeDeParcelas: number
}

export function geradorParcelas(props: IPropsGerarParcela): IParcelaCriar[] | undefined {
  const valor = cleanFormatMoney(props.valor)
  const quantidadeDeParcelas = Number(props.quantidadeDeParcelas)

  if (!valor || !Number.isInteger(quantidadeDeParcelas) || quantidadeDeParcelas < 1) {
    return undefined
  }

  const totalEmCentavos = Math.round(valor * 100)
  const valorBaseEmCentavos = Math.floor(totalEmCentavos / quantidadeDeParcelas)
  const centavosRestantes = totalEmCentavos - valorBaseEmCentavos * quantidadeDeParcelas

  return Array.from({ length: quantidadeDeParcelas }, (_, index) => {
    const ultimaParcela = index === quantidadeDeParcelas - 1
    const valorEmCentavos = valorBaseEmCentavos + (ultimaParcela ? centavosRestantes : 0)

    return {
      dataDeVencimento: proximoVencimento(index + 1),
      numeroDaParcela: index + 1,
      meioDePagamento: MeioDePagamentoEnum.Dinheiro,
      valor: valorEmCentavos / 100
    }
  })
}

function proximoVencimento(mesesAAdicionar: number): string {
  const hoje = new Date()
  const primeiroDiaDoMes = new Date(hoje.getFullYear(), hoje.getMonth() + mesesAAdicionar, 1)
  const ultimoDiaDoMes = new Date(
    primeiroDiaDoMes.getFullYear(),
    primeiroDiaDoMes.getMonth() + 1,
    0
  ).getDate()
  const dia = Math.min(hoje.getDate(), ultimoDiaDoMes)

  return [
    primeiroDiaDoMes.getFullYear(),
    String(primeiroDiaDoMes.getMonth() + 1).padStart(2, '0'),
    String(dia).padStart(2, '0')
  ].join('-')
}
