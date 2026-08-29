'use client'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useFormikAdapter } from 'src/@open-adm/adapters/formik-adapter'
import { useApiPedido } from 'src/@open-adm/api/UseApiPedido'
import { useApiFatura } from 'src/@open-adm/api/use-api-fatura'
import { BoxApp } from 'src/@open-adm/components/box'
import { ButtonApp } from 'src/@open-adm/components/buttons'
import { DividerApp } from 'src/@open-adm/components/divider'
import { DropDownApp } from 'src/@open-adm/components/drop-down/drop-down-app'
import { FormItemRow } from 'src/@open-adm/components/form/item-row'
import { FormRow } from 'src/@open-adm/components/form/row'
import { FormRoot } from 'src/@open-adm/components/form/form-root'
import { InputCustom, MaskType } from 'src/@open-adm/components/input'
import { ModalWithChildren } from 'src/@open-adm/components/modal'
import { TextApp } from 'src/@open-adm/components/text'
import { opcoesStatusPedido, StatusPedidoEnum } from 'src/@open-adm/enuns/status-pedido'
import { useNavigateApp } from 'src/@open-adm/hooks/use-navigate-app'
import { IPedido } from 'src/@open-adm/types/pedido'
import { formatDateComHoras } from 'src/@open-adm/utils/convert-date'
import { cleanFormatMoney, formatMoney } from 'src/@open-adm/utils/format-money'
import { rotasApp } from 'src/configs/rotasApp'

export function ModificarStatusPedidoForm() {
  const { obter, atualizarStatus } = useApiPedido()
  const { baixarAutomaticamente, bonificar } = useApiFatura()
  const { navigate, id } = useNavigateApp()
  const [modalParcelamentoAberto, setModalParcelamentoAberto] = useState(false)
  const [modalDescontoAberto, setModalDescontoAberto] = useState(false)
  const [desconto, setDesconto] = useState('')
  const form = useFormikAdapter<IPedido>({
    onSubmit: submit
  })

  async function init() {
    const response = await obter.fetch(id as string)
    if (response) {
      form.setValue(response)
    }
  }

  async function submit() {
    await atualizarStatusPedido()
  }

  async function atualizarStatusPedido() {
    const response = await atualizarStatus.fetch({
      pedidoId: form.values.id,
      statusPedido: form.values.statusPedido
    })
    if (response) {
      if (form.values.statusPedido === StatusPedidoEnum.Entregue) {
        setModalParcelamentoAberto(true)
        return
      }

      navigate(rotasApp.pedido.paginacao)
    }
  }

  function continuarAlteracaoStatus() {
    setModalParcelamentoAberto(false)
    navigate(rotasApp.pedido.paginacao)
  }

  function negociarCobranca() {
    setModalParcelamentoAberto(false)
    navigate(`${rotasApp.financeiro.negociarCobranca}/${form.values.id}`)
  }

  function abrirDescontoAVista() {
    setDesconto('')
    setModalParcelamentoAberto(false)
    setModalDescontoAberto(true)
  }

  function cancelarDescontoAVista() {
    setModalDescontoAberto(false)
    setModalParcelamentoAberto(true)
  }

  async function baixarAVista() {
    const response = await baixarAutomaticamente.fetch({
      pedidoId: form.values.id,
      desconto: valorDesconto
    })

    if (response?.resultado) {
      setModalDescontoAberto(false)
      continuarAlteracaoStatus()
    }
  }

  async function bonificarPedido() {
    const response = await bonificar.fetch(form.values.id)

    if (response?.resultado) {
      continuarAlteracaoStatus()
    }
  }

  useEffect(() => {
    init()
  }, [])

  const loading = obter.status === 'loading' || atualizarStatus.status === 'loading'
  const loadingAcaoFatura = baixarAutomaticamente.status === 'loading' || bonificar.status === 'loading'
  const valorDesconto = cleanFormatMoney(desconto) ?? 0
  const valorTotal = form.values.valorTotal ?? 0
  const descontoInvalido = valorDesconto > valorTotal
  const valorFinal = Math.max(valorTotal - valorDesconto, 0)

  return (
    <>
      <FormRoot.Form
        submit={form.onSubmit}
        loading={loading}
        titulo='Status do pedido'
        urlVoltar={rotasApp.pedido.paginacao}
      >
        <BoxApp>
          <TextApp texto={`N°: #${form.values.numero}`} />
          <TextApp texto={`Data de cadastro: ${formatDateComHoras(form.values.dataDeCriacao)}`} />
          <TextApp texto={`Cliente: ${form.values.usuario}`} />
          <TextApp texto={`Total: ${formatMoney(form.values.valorTotal)}`} />
        </BoxApp>
        <DividerApp color='primary' chip='Selecione o status' marginTop='1rem' marginBotton='1rem' />
        <DropDownApp
          id='statusPedido'
          keyLabel='label'
          label='Status'
          required
          onChange={form.onChange}
          values={opcoesStatusPedido}
          value={opcoesStatusPedido.find(x => x.id === form.values.statusPedido)}
        />
      </FormRoot.Form>
      <ModalWithChildren
        open={modalParcelamentoAberto}
        close={() => setModalParcelamentoAberto(false)}
        desabilitarFooter
      >
        <Typography variant='h3' sx={{ mb: 3 }}>
          Deseja parcelar o pedido?
        </Typography>
        <Grid
          size={{ xs: 12 }}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'flex-end',
            gap: 2,
            '& > button': { width: { xs: '100%', sm: 'auto' } }
          }}
        >
          <ButtonApp
            variant='outlined'
            onClick={bonificarPedido}
            title='Bonificado'
            loading={bonificar.status === 'loading'}
            disabled={loadingAcaoFatura}
          />
          <ButtonApp
            variant='outlined'
            onClick={abrirDescontoAVista}
            title='Baixar a vista'
            disabled={loadingAcaoFatura}
          />
          <ButtonApp
            variant='contained'
            onClick={negociarCobranca}
            title='Parcelar'
            disabled={loadingAcaoFatura}
          />
        </Grid>
      </ModalWithChildren>
      <ModalWithChildren open={modalDescontoAberto} close={cancelarDescontoAVista} desabilitarFooter>
        <Typography variant='h3' sx={{ mb: 3 }}>
          Baixar pedido à vista
        </Typography>
        <BoxApp>
          <TextApp texto={`Valor do pedido: ${formatMoney(valorTotal)}`} />
          <TextApp texto={`Valor após desconto: ${formatMoney(valorFinal)}`} />
        </BoxApp>
        <FormRow marginTop='1rem'>
          <FormItemRow xs={12} sm={12}>
            <InputCustom
              fullWidth
              autoFocus
              id='desconto'
              name='desconto'
              label='Desconto'
              value={desconto}
              mask={MaskType.MONEY}
              onChange={(_, value) => setDesconto(value)}
              error={descontoInvalido}
              helperText={descontoInvalido ? 'O desconto não pode ser maior que o valor do pedido' : undefined}
            />
          </FormItemRow>
        </FormRow>
        <Grid
          size={{ xs: 12 }}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            justifyContent: 'flex-end',
            gap: 2,
            mt: 3,
            '& > button': { width: { xs: '100%', sm: 'auto' } }
          }}
        >
          <ButtonApp
            variant='outlined'
            onClick={cancelarDescontoAVista}
            title='Cancelar'
            disabled={loadingAcaoFatura}
          />
          <ButtonApp
            variant='contained'
            onClick={baixarAVista}
            title='Confirmar baixa'
            loading={baixarAutomaticamente.status === 'loading'}
            disabled={descontoInvalido || loadingAcaoFatura}
          />
        </Grid>
      </ModalWithChildren>
    </>
  )
}
