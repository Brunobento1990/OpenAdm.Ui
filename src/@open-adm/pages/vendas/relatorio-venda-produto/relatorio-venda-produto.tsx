'use client'

import { Pagination } from '@mui/material'
import { useEffect, useState } from 'react'
import { useFormikAdapter } from 'src/@open-adm/adapters/formik-adapter'
import { BoxApp } from 'src/@open-adm/components/box'
import { CheckBoxApp } from 'src/@open-adm/components/check-box'
import { FormRoot } from 'src/@open-adm/components/form/form-root'
import { InputDate } from 'src/@open-adm/components/input/input-date'
import { RadioApp } from 'src/@open-adm/components/radio'
import { TabelaComDrag } from 'src/@open-adm/components/table/tabela-com-drag'
import { TableApp } from 'src/@open-adm/components/table/table-app'
import { TextApp } from 'src/@open-adm/components/text'
import { useNewApi } from 'src/@open-adm/hooks/use-new-api'
import {
  IRelatorioVendaProdutoRequest,
  IRelatorioVendaProdutoResponse
} from 'src/@open-adm/types/relatorio-venda-produto'

export function RelatorioVendaProduto() {
  const [response, setResponse] = useState<IRelatorioVendaProdutoResponse>()

  const { fecth, loading } = useNewApi({
    method: 'POST',
    url: 'relatorio-venda-produto',
    naoRenderizarResposta: true
  })

  const form = useFormikAdapter<IRelatorioVendaProdutoRequest>({
    initialValues: {
      skip: 1,
      asc: false
    },
    onSubmit: async () => await submit()
  })

  async function submit(skip?: number) {
    const responseApi = await fecth<IRelatorioVendaProdutoResponse>({
      body: { ...form.values, skip: skip || form.values.skip }
    })
    setResponse(responseApi)
  }

  return (
    <>
      <FormRoot.Form loading={loading} submit={form.onSubmit} titulo='Relatório venda de produto'>
        <FormRoot.FormRow spacing={3}>
          <FormRoot.FormItemRow xs={12} sm={3}>
            <InputDate
              id='dataInicial'
              label='Data inicial'
              name={'dataInicial'}
              onChange={form.onChange}
              value={form.values.dataInicial}
            />
          </FormRoot.FormItemRow>
          <FormRoot.FormItemRow xs={12} sm={3}>
            <InputDate
              id='dataFinal'
              label='Data final'
              name={'dataFinal'}
              onChange={form.onChange}
              value={form.values.dataFinal}
            />
          </FormRoot.FormItemRow>
          <FormRoot.FormItemRow xs={12} sm={6}>
            <RadioApp
              id='tipo'
              label=''
              row
              options={[
                {
                  label: 'Ultimos 7 dias',
                  value: 1
                },
                {
                  label: 'Ultimos 30 dias',
                  value: 2
                },
                {
                  label: 'Ultimos 90 dias',
                  value: 3
                }
              ]}
              value={form.values.tipo}
              onChange={form.onChange}
            />
          </FormRoot.FormItemRow>
        </FormRoot.FormRow>
        <FormRoot.FormRow spacing={3}>
          <FormRoot.FormItemRow xs={12} sm={6}>
            <CheckBoxApp label='Ordenar por menos vendidos' value={form.values.asc} id='asc' onChange={form.onChange} />
          </FormRoot.FormItemRow>
        </FormRoot.FormRow>
        {response && (
          <>
            <TabelaComDrag
              height={'450px'}
              columns={[
                {
                  field: 'foto',
                  headerName: 'Produto',
                  cellRenderer: (row: any) => {
                    return (
                      <BoxApp display='flex' alignItems='center' gap='10px'>
                        <img src={row.data.foto} style={{ maxWidth: '30px', borderRadius: '5px' }} />
                        <TextApp texto={row.data.descricao} />
                      </BoxApp>
                    )
                  }
                },
                {
                  field: 'quantidade',
                  headerName: 'Quantidade'
                },
                {
                  field: 'pesoTamanho',
                  headerName: 'Peso/Tamanho',
                  cellRenderer: (row: any) => (row.data.peso ? row.data.peso : row.data.tamanho)
                }
              ]}
              rows={
                response.dados?.map(x => {
                  return {
                    ...x,
                    id: `${x.id}-${x.peso || x.tamanho}`
                  }
                }) ?? []
              }
            />
            <BoxApp display='flex' alignItems='center' justifyContent='end' padding='10px'>
              <Pagination
                count={response.totalPagina}
                page={form.values.skip}
                variant='outlined'
                shape='rounded'
                size='small'
                color='primary'
                onChange={async (_, newPage) => {
                  form.setValue({
                    skip: newPage
                  })

                  await submit(newPage)
                }}
              />
            </BoxApp>
          </>
        )}
      </FormRoot.Form>
    </>
  )
}
