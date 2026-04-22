'use client'

import { useEffect, useState } from 'react'
import { useApiParcelaCobranca } from 'src/@open-adm/api/use-api-parcela-cobranca'
import { ButtonCopy } from 'src/@open-adm/components/buttons/button-copy'
import { FormApp } from 'src/@open-adm/components/form'
import { LoadingAppTexto } from 'src/@open-adm/components/loading/loading-app-texto'
import { useNavigateApp } from 'src/@open-adm/hooks/use-navigate-app'
import { IParcelaCobranca } from 'src/@open-adm/types/parcela-cobranca'

export function VisuzalizarParcelaCobranca() {
  const { obter } = useApiParcelaCobranca()
  const { id } = useNavigateApp()
  const [parcelaCobranca, setParcelaCobranca] = useState<IParcelaCobranca>()

  async function init() {
    if (!id) {
      return
    }
    const response = await obter.fetch(id)
    setParcelaCobranca(response)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      {obter.loading && <LoadingAppTexto comBox />}

      <FormApp submit={async () => console.log('')} readonly titulo={'Mensalidade'} urlVoltar='/financeiro/cobranca'>
        <>
          {parcelaCobranca?.pix && (
            <>
              <ButtonCopy textoParaCopiar={parcelaCobranca.pix.copiaECola || ''} label='Pix copia e cola' />
            </>
          )}
        </>
      </FormApp>
    </>
  )
}
