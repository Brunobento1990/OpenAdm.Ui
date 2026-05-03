import { Grid } from '@mui/material'
import { useFormik } from 'formik'
import { useState } from 'react'
import CustomTextField from 'src/@core/components/mui/text-field'
import { useFormikAdapter } from 'src/@open-adm/adapters/formik-adapter'
import { YupAdapter } from 'src/@open-adm/adapters/yup-adapter'
import { DropDownAutoFetchApp } from 'src/@open-adm/components/drop-down/drop-down-auto-fetch-app'
import { FormApp } from 'src/@open-adm/components/form'
import { GridApp, GridItemApp } from 'src/@open-adm/components/grid'
import { InputApp } from 'src/@open-adm/components/input/input-app'
import { InputDate } from 'src/@open-adm/components/input/input-date'
import { useSnackbar } from 'src/@open-adm/components/snack'
import { useNewApi } from 'src/@open-adm/hooks/use-new-api'
import { IUsuarioHome } from 'src/@open-adm/types/home'
import { generatePdfFromBase64 } from 'src/@open-adm/utils/download-pdf'

const defaultValues = {
  dataInicial: '',
  dataFinal: '',
  usuarioId: ''
}

interface IRelatorioPorPeriodo {
  dataInicial: string
  dataFinal: string
  usuarioId?: string
  usuario?: IUsuarioHome
}

export function RelatorioPorPeriodo() {
  const { fecth, loading } = useNewApi({
    method: 'POST',
    url: 'pedidos/relatorio-por-periodo'
  })
  const snack = useSnackbar()
  const formik = useFormikAdapter<IRelatorioPorPeriodo>({
    initialValues: defaultValues,
    validationSchema: new YupAdapter().string('dataInicial').string('dataFinal').build(),
    onSubmit: values => submit(values)
  })

  async function submit(values: any) {
    try {
      if (!values.usuarioId) {
        delete values.usuarioId
      }
      const response = await fecth<any>({ body: values, message: 'Download efetuado com sucesso!' })
      if (response?.count === 0) {
        snack.show('Não há pedidos para o período selecionado!', 'error')
        return
      }
      if (response?.pdf) {
        const pdf = await generatePdfFromBase64(response.pdf)
        const link = document.createElement('a')
        link.href = pdf
        link.download = `${formik.values.dataInicial}-${formik.values.dataFinal}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error) {}
  }

  return (
    <FormApp loading={loading} submit={formik.onSubmit} titulo='Relatório por período' tituloBotaoSalvar='Download'>
      <GridApp container spacing={5}>
        <GridItemApp item xs={12} sm={4}>
          <InputDate
            label='Data inicial'
            name='dataInicial'
            id='dataInicial'
            required
            value={formik.values.dataInicial}
            onBlur={formik.onBlur}
            onChange={formik.onChange}
            helperText={formik.helperText('dataInicial')}
            error={formik.error('dataInicial')}
          />
        </GridItemApp>
        <GridItemApp item xs={12} sm={4}>
          <InputDate
            label='Data final'
            name='dataFinal'
            id='dataFinal'
            required
            value={formik.values.dataFinal}
            onBlur={formik.onBlur}
            onChange={formik.onChange}
            helperText={formik.helperText('dataFinal')}
            error={formik.error('dataFinal')}
          />
        </GridItemApp>
        <GridItemApp item xs={12} sm={4}>
          <DropDownAutoFetchApp
            method='GET'
            id='usuarios'
            label={'Selecione um cliente'}
            url={'usuarios/list'}
            keyLabel={'nome'}
            value={formik.values.usuario}
            onChange={(_, value) => formik.setValue({ usuarioId: value?.id, usuario: value })}
          />
        </GridItemApp>
      </GridApp>
    </FormApp>
  )
}
