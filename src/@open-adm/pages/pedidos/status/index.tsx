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
import { FormRoot } from 'src/@open-adm/components/form/form-root'
import { ModalWithChildren } from 'src/@open-adm/components/modal'
import { TextApp } from 'src/@open-adm/components/text'
import { opcoesStatusPedido } from 'src/@open-adm/enuns/status-pedido'
import { useNavigateApp } from 'src/@open-adm/hooks/use-navigate-app'
import { IPedido } from 'src/@open-adm/types/pedido'
import { formatDateComHoras } from 'src/@open-adm/utils/convert-date'
import { formatMoney } from 'src/@open-adm/utils/format-money'
import { rotasApp } from 'src/configs/rotasApp'

export function ModificarStatusPedidoForm() {
  const { obter, atualizarStatus } = useApiPedido()
  const { baixarAutomaticamente } = useApiFatura()
  const { navigate, id } = useNavigateApp()
  const [modalParcelamentoAberto, setModalParcelamentoAberto] = useState(false)
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
      if (form.values.statusPedido === 3) {
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

  async function baixarAVista() {
    const response = await baixarAutomaticamente.fetch(form.values.id)

    if (response?.resultado) {
      continuarAlteracaoStatus()
    }
  }

  useEffect(() => {
    init()
  }, [])

  const loading = obter.status === 'loading' || atualizarStatus.status === 'loading'

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
        <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <ButtonApp
            variant='outlined'
            onClick={baixarAVista}
            title='Baixar a vista'
            loading={baixarAutomaticamente.status === 'loading'}
          />
          <ButtonApp
            variant='contained'
            onClick={continuarAlteracaoStatus}
            title='Parcelar'
            disabled={baixarAutomaticamente.status === 'loading'}
          />
        </Grid>
      </ModalWithChildren>
    </>
  )
}
