'use client'

import { useEffect, useState } from 'react'
import { useApiParcelaCobranca } from 'src/@open-adm/api/use-api-parcela-cobranca'
import { BoxApp } from 'src/@open-adm/components/box'
import { ButtonCopy } from 'src/@open-adm/components/buttons/button-copy'
import { FormApp } from 'src/@open-adm/components/form'
import { FormRoot } from 'src/@open-adm/components/form/form-root'
import { LoadingAppTexto } from 'src/@open-adm/components/loading/loading-app-texto'
import { TextApp } from 'src/@open-adm/components/text'
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

      <FormApp
        submit={async () => console.log('')}
        loading={obter.loading}
        readonly
        titulo={'Mensalidade'}
        urlVoltar='/financeiro/cobranca'
      >
        {parcelaCobranca?.pago && (
          <BoxApp>
            <TextApp fontSize='22px' fontWeight={600} texto='A mensalidade se encontra paga' />
          </BoxApp>
        )}
        <>
          {parcelaCobranca?.pix && (
            <BoxApp display='flex' alignItems='center' justifyContent='center' flexDirection='column' gap='1rem'>
              <img src={`data:image/jpeg;base64,${parcelaCobranca.pix.qrCode || ''}`} width={200} />
              <ButtonCopy textoParaCopiar={parcelaCobranca.pix.copiaECola || ''} label='Pix copia e cola' />
            </BoxApp>
          )}
        </>
      </FormApp>
    </>
  )
}
