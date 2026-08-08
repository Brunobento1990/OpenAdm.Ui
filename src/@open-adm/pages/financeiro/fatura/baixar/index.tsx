import { useEffect, useState } from 'react'
import { useFormikAdapter } from 'src/@open-adm/adapters/formik-adapter'
import { useApiParcela } from 'src/@open-adm/api/use-api-parcela'
import { BoxApp } from 'src/@open-adm/components/box'
import { StatusApp } from 'src/@open-adm/components/chip'
import { DropDown } from 'src/@open-adm/components/drop-down'
import { FormApp } from 'src/@open-adm/components/form'
import { FormItemRow } from 'src/@open-adm/components/form/item-row'
import { FormRow } from 'src/@open-adm/components/form/row'
import { InputCustom, MaskType } from 'src/@open-adm/components/input'
import { TextApp } from 'src/@open-adm/components/text'
import { useNavigateApp } from 'src/@open-adm/hooks/use-navigate-app'
import { meiosDePagamentos } from 'src/@open-adm/types/contas-a-receber'
import { IParcela } from 'src/@open-adm/types/fatura'
import { formatDate } from 'src/@open-adm/utils/convert-date'
import { cleanFormatMoney, formatMoney } from 'src/@open-adm/utils/format-money'
import { TipoFaturaEnum } from 'src/@open-adm/enuns/tipo-fatura-enum'

export function BaixarParcela() {
  const { obterParcela, pagarParcela } = useApiParcela()
  const { id, navigate } = useNavigateApp()
  const form = useFormikAdapter<IParcela>({
    onSubmit: pagar
  })
  const [dataDePagamento, setDataDePagemento] = useState('')

  async function init() {
    const response = await obterParcela(id ?? '')
    if (response) {
      form.setValue(response)
    }
  }

  async function pagar() {
    const response = await pagarParcela.fetch({
      id: form.values.id,
      valor: cleanFormatMoney(form.values.valorAPagarAReceber) ?? 0,
      dataDePagamento: dataDePagamento?.length && dataDePagamento.length > 0 ? dataDePagamento : undefined,
      desconto: cleanFormatMoney(form.values.desconto),
      meioDePagamento: form.values.meioDePagamento,
      observacao: form.values.observacao,
      juros: cleanFormatMoney(form.values.juros)
    })

    if (response) {
      navigate(urlVoltar)
      return
    }
  }

  const urlVoltar =
    form.values.fatura?.tipo === TipoFaturaEnum.APagar ? '/financeiro/contas-a-pagar' : '/financeiro/contas-a-receber'

  useEffect(() => {
    init()
  }, [])

  return (
    <FormApp titulo='Baixar parcela' loading={pagarParcela.loading} submit={form.onSubmit} urlVoltar={urlVoltar}>
      <BoxApp display='flex' flexDirection='column' gap='.5rem'>
        <TextApp texto={`Fatura: #${form.values.fatura?.numero ?? ''}`} />
        <TextApp texto={`Cliente: ${form.values.fatura?.usuario?.nome ?? ''}`} />
        {form.values.fatura?.pedido && <TextApp texto={`Pedido: #${form.values.fatura.pedido.numero ?? ''}`} />}
        <TextApp texto={`Vencimento: ${formatDate(form.values.dataDeVencimento)}`} />
        <TextApp texto={`Parcela: ${form.values.numeroDaParcela}`} />
        <TextApp texto={`Valor pago/Recebido: ${formatMoney(form.values.valorPagoRecebido)}`} />
        <TextApp texto={`Valor a pagar/a receber: ${formatMoney(form.values.valorAPagarAReceber)}`} />
      </BoxApp>
      <FormRow spacing={3}>
        <FormItemRow sm={6} xs={12}>
          <InputCustom
            fullWidth
            id='valorAPagarAReceber'
            label='Valor'
            name='valorAPagarAReceber'
            value={form.values.valorAPagarAReceber}
            mask={MaskType.MONEY}
            onChange={form.onChange}
            onBlur={form.onBlur}
            required
          />
        </FormItemRow>
        <FormItemRow sm={3} xs={12}>
          <InputCustom
            fullWidth
            id='desconto'
            label='Desconto'
            name='desconto'
            value={form.values.desconto}
            mask={MaskType.MONEY}
            onChange={form.onChange}
            onBlur={form.onBlur}
          />
        </FormItemRow>
        <FormItemRow sm={3} xs={12}>
          <InputCustom
            fullWidth
            id='juros'
            label='Juros'
            name='juros'
            value={form.values.juros}
            mask={MaskType.MONEY}
            onChange={form.onChange}
            onBlur={form.onBlur}
          />
        </FormItemRow>
        <FormItemRow sm={6} xs={12}>
          <DropDown
            id='meioDePagamento'
            keyLabel='descricao'
            label='Meio de pagamento'
            values={meiosDePagamentos}
            key={'meioDePagamento'}
            value={meiosDePagamentos.find(x => x.id === form.values.meioDePagamento)}
            onChange={form.onChange}
            onBlur={form.onBlur}
          />
        </FormItemRow>
        <FormItemRow sm={6} xs={12}>
          <InputCustom
            fullWidth
            id='dataDePagamento'
            label='Data de pagamento'
            name='dataDePagamento'
            value={dataDePagamento}
            type='date'
            onChange={(_, value) => setDataDePagemento(value)}
          />
        </FormItemRow>
      </FormRow>
      <FormRow spacing={3}>
        <FormItemRow sm={12} xs={12}>
          <InputCustom
            fullWidth
            id='observacao'
            label='observacao'
            name='observacao'
            value={form.values.observacao}
            maxLength={500}
            onChange={form.onChange}
            onBlur={form.onBlur}
          />
        </FormItemRow>
      </FormRow>
    </FormApp>
  )
}
