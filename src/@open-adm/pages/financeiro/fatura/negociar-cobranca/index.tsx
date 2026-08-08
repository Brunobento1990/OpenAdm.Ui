'use client'

import { useEffect, useState } from 'react'
import { useFormikAdapter } from 'src/@open-adm/adapters/formik-adapter'
import { useApiPedido } from 'src/@open-adm/api/UseApiPedido'
import { useApiFatura } from 'src/@open-adm/api/use-api-fatura'
import { BoxApp } from 'src/@open-adm/components/box'
import { DividerApp } from 'src/@open-adm/components/divider'
import { DropDown } from 'src/@open-adm/components/drop-down'
import { FormApp } from 'src/@open-adm/components/form'
import { GridApp, GridItemApp } from 'src/@open-adm/components/grid'
import { InputCustom, MaskType } from 'src/@open-adm/components/input'
import { IconButtonAppComTooltip } from 'src/@open-adm/components/icon/icon-button-app-tool-tip'
import { useSnackbar } from 'src/@open-adm/components/snack'
import { TextApp } from 'src/@open-adm/components/text'
import { TipoFaturaEnum } from 'src/@open-adm/enuns/tipo-fatura-enum'
import { useNavigateApp } from 'src/@open-adm/hooks/use-navigate-app'
import { ICobrancaPedidoResponse, IParcelaCriar } from 'src/@open-adm/types/fatura'
import { meiosDePagamentos } from 'src/@open-adm/types/contas-a-receber'
import { cleanFormatMoney, formatMoney } from 'src/@open-adm/utils/format-money'
import { geradorParcelas } from 'src/@open-adm/utils/gerador-parcelas'
import { rotasApp } from 'src/configs/rotasApp'

interface INegociarCobrancaForm {
  quantidadeDeParcelas: number
  parcelas: IParcelaCriar[]
}

const QUANTIDADE_MINIMA_PARCELAS = 1

export function NegociarCobrancaPage() {
  const { id, navigate } = useNavigateApp()
  const { cobranca } = useApiPedido()
  const { negociar } = useApiFatura()
  const snack = useSnackbar()
  const [dadosCobranca, setDadosCobranca] = useState<ICobrancaPedidoResponse>()
  const form = useFormikAdapter<INegociarCobrancaForm>({
    onSubmit: submit,
    initialValues: {
      quantidadeDeParcelas: QUANTIDADE_MINIMA_PARCELAS,
      parcelas: []
    }
  })

  async function init() {
    if (!id) return

    const response = await cobranca.fetch(id)
    if (!response) return

    setDadosCobranca(response)
    form.setValue({
      quantidadeDeParcelas: QUANTIDADE_MINIMA_PARCELAS,
      parcelas:
        geradorParcelas({ valor: response.total, quantidadeDeParcelas: QUANTIDADE_MINIMA_PARCELAS }) ?? []
    })
  }

  function atualizarQuantidadeDeParcelas(_: string, value?: string | number) {
    const quantidadeDeParcelas = Number(value)
    const parcelas = geradorParcelas({
      valor: dadosCobranca?.total,
      quantidadeDeParcelas
    })

    form.setValue({
      quantidadeDeParcelas,
      parcelas: parcelas ?? []
    })
  }

  function alterarQuantidadeDeParcelas(incremento: number) {
    const novaQuantidade = Math.max(
      QUANTIDADE_MINIMA_PARCELAS,
      form.values.quantidadeDeParcelas + incremento
    )

    atualizarQuantidadeDeParcelas('quantidadeDeParcelas', novaQuantidade)
  }

  function editarParcela(index: number, campo: keyof IParcelaCriar, value: unknown) {
    form.setValue({
      parcelas: form.values.parcelas.map((parcela, parcelaIndex) =>
        parcelaIndex === index ? { ...parcela, [campo]: value } : parcela
      )
    })
  }

  async function submit() {
    if (!dadosCobranca || form.values.parcelas.length === 0) {
      snack.show('Informe uma quantidade de parcelas válida', 'error')
      return
    }

    if (form.values.parcelas.some(parcela => !parcela.dataDeVencimento || !parcela.meioDePagamento)) {
      snack.show('Informe o vencimento e o meio de pagamento de todas as parcelas', 'error')
      return
    }

    const response = await negociar.fetch({
      pedidoId: dadosCobranca.pedidoId,
      tipo: TipoFaturaEnum.AReceber,
      parcelas: form.values.parcelas.map(parcela => ({
        ...parcela,
        valor: cleanFormatMoney(parcela.valor) ?? 0
      }))
    })

    if (response) {
      navigate(rotasApp.pedido.paginacao)
    }
  }

  useEffect(() => {
    init()
  }, [id])

  const loading = !dadosCobranca || cobranca.status === 'loading' || negociar.status === 'loading'

  return (
    <FormApp titulo='Negociar cobrança' urlVoltar={rotasApp.pedido.paginacao} submit={form.onSubmit} loading={loading}>
      <BoxApp
        display='flex'
        flexDirection='column'
        gap='0.5rem'
        padding='1rem'
        border='1px solid'
        borderColor='divider'
        borderRadius='8px'
      >
        <TextApp texto={`Pedido: #${dadosCobranca?.numero ?? ''}`} fontWeight={600} />
        <TextApp texto={`Total: ${formatMoney(dadosCobranca?.total)}`} fontWeight={600} />
      </BoxApp>

      <GridApp spacing={2} marginTop='1rem'>
        <GridItemApp xs={12} sm={4}>
          <BoxApp display='flex' alignItems='end' gap='0.5rem' width='100%'>
            <IconButtonAppComTooltip
              ariaLabel='Diminuir quantidade de parcelas'
              titulo='Diminuir quantidade de parcelas'
              icon='tabler:minus'
              color='primary'
              disabled={form.values.quantidadeDeParcelas <= QUANTIDADE_MINIMA_PARCELAS || loading}
              onClick={() => alterarQuantidadeDeParcelas(-1)}
              sx={{ width: 40, height: 40, flexShrink: 0 }}
            />
            <BoxApp flex={1} minWidth='0'>
              <InputCustom
                fullWidth
                required
                id='quantidadeDeParcelas'
                name='quantidadeDeParcelas'
                label='Quantidade de parcelas'
                type='number'
                value={form.values.quantidadeDeParcelas}
                onChange={atualizarQuantidadeDeParcelas}
              />
            </BoxApp>
            <IconButtonAppComTooltip
              ariaLabel='Aumentar quantidade de parcelas'
              titulo='Aumentar quantidade de parcelas'
              icon='tabler:plus'
              color='primary'
              disabled={loading}
              onClick={() => alterarQuantidadeDeParcelas(1)}
              sx={{ width: 40, height: 40, flexShrink: 0 }}
            />
          </BoxApp>
        </GridItemApp>
        <GridItemApp xs={12} sm={4}>
          <InputCustom
            fullWidth
            readonly
            id='total'
            name='total'
            label='Total da cobrança'
            mask={MaskType.MONEY}
            value={dadosCobranca?.total}
          />
        </GridItemApp>
      </GridApp>

      <DividerApp chip='Parcelas' marginTop='1rem' marginBotton='1rem' />

      <GridApp spacing={2}>
        {form.values.parcelas.map((parcela, index) => (
          <GridItemApp xs={12} sm={3} key={parcela.numeroDaParcela}>
            <BoxApp
              display='flex'
              flexDirection='column'
              gap='1rem'
              padding='1rem'
              border='1px solid'
              borderColor='divider'
              borderRadius='8px'
              height='100%'
              boxSizing='border-box'
            >
              <TextApp texto={`Parcela ${parcela.numeroDaParcela}`} color='primary.main' fontWeight={600} />
              <InputCustom
                fullWidth
                required
                id={`vencimento-${index}`}
                name={`vencimento-${index}`}
                label='Vencimento'
                type='date'
                value={parcela.dataDeVencimento}
                onChange={(_, value) => editarParcela(index, 'dataDeVencimento', value)}
              />
              <DropDown
                required
                id={`meioDePagamento-${index}`}
                key={`meioDePagamento-${index}`}
                keyLabel='descricao'
                label='Meio de pagamento'
                values={meiosDePagamentos}
                value={meiosDePagamentos.find(item => item.id === parcela.meioDePagamento)}
                onChange={(_, value) => editarParcela(index, 'meioDePagamento', value)}
              />
              <InputCustom
                fullWidth
                readonly
                id={`valor-${index}`}
                name={`valor-${index}`}
                label='Valor'
                mask={MaskType.MONEY}
                value={parcela.valor}
              />
            </BoxApp>
          </GridItemApp>
        ))}
      </GridApp>
    </FormApp>
  )
}
