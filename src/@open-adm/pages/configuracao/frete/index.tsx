import { useFormikAdapter } from 'src/@open-adm/adapters/formik-adapter'
import { initialValues, schema } from './config'
import { useApiConfiguracaoDeFrete } from './use-api-configuracao-de-frete'
import { useEffect } from 'react'
import { Checkbox, FormControlLabel, Grid } from '@mui/material'
import { InputCustom } from 'src/@open-adm/components/input'
import { useNavigateApp } from 'src/@open-adm/hooks/use-navigate-app'
import { IConfiguracaoDeFrete } from 'src/@open-adm/types/configuracao-de-frete'
import { FormApp } from 'src/@open-adm/components/form'
import { FormRoot } from 'src/@open-adm/components/form/form-root'
import { InputApp } from 'src/@open-adm/components/input/input-app'
import { CheckBoxApp } from 'src/@open-adm/components/check-box'
import { BoxApp } from 'src/@open-adm/components/box'
import { useModal } from 'src/@open-adm/components/modal/modal'

export function ConfiguracaoDeFrete() {
  const { show, close } = useModal()
  const form = useFormikAdapter<IConfiguracaoDeFrete>({
    initialValues,
    validationSchema: schema,
    onSubmit: submit
  })

  const { get, create } = useApiConfiguracaoDeFrete()

  async function init() {
    const response = await get.fetch()
    if (response) {
      form.setValue(response)
    }
  }

  async function submit(values: any) {
    await create.fetch(values)
  }

  function onChangeAtivo(ativo: boolean) {
    if (!ativo) {
      show({
        confirmed: () => {
          form.setValue({
            ativo: false
          })
          close()
        },
        message:
          'Desativar as configurações de frete irá desabilitar a cobrança de fretes no ecommerce, deseja continuar?'
      })
      return
    }
    form.setValue({
      ativo: ativo
    })
  }

  useEffect(() => {
    init()
  }, [])

  const loading = get.loading || create.loading

  return (
    <>
      <FormRoot.Form submit={form.onSubmit} loading={loading} titulo='Configurações de Frete'>
        <FormRoot.FormRow>
          <FormRoot.FormItemRow xs={12} sm={12}>
            <InputApp
              id='token'
              label='Token da API Melhor envio'
              maxLength={2000}
              onChange={form.onChange}
              onBlur={form.onBlur}
              error={form.error('token')}
              helperText={form.helperText('token')}
              value={form.values.token}
              required
              autoFocus
            />
          </FormRoot.FormItemRow>
        </FormRoot.FormRow>
        <FormRoot.FormRow>
          <FormRoot.FormItemRow xs={12} sm={3}>
            <InputApp
              id='cepOrigem'
              label='CEP de origem'
              maxLength={8}
              onChange={form.onChange}
              onBlur={form.onBlur}
              value={form.values.cepOrigem}
            />
          </FormRoot.FormItemRow>
          <FormRoot.FormItemRow xs={12} sm={9}>
            <BoxApp display='flex' alignItems='center' marginTop='1rem'>
              <CheckBoxApp
                label='Cobrar frete de clientes CPF'
                value={form.values.cobrarCpf}
                onChange={form.onChange}
                id='cobrarCpf'
              />
              <CheckBoxApp
                label='Cobrar frete de clientes CNPJ'
                value={form.values.cobrarCnpj}
                onChange={form.onChange}
                id='cobrarCnpj'
              />
              <CheckBoxApp
                label='Ativo'
                value={form.values.ativo}
                onChange={(_, value) => onChangeAtivo(value)}
                id='ativo'
              />
            </BoxApp>
          </FormRoot.FormItemRow>
        </FormRoot.FormRow>
      </FormRoot.Form>
    </>
  )
}
