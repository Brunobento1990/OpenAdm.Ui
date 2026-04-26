'use client'

import { useTheme } from '@mui/material/styles'
import { BoxApp } from '../box'
import { TextApp } from '../text'

export interface IAgrupamentoDadosPorDia {
  data: string
  total: number
  descricaoDia: string
}

interface GraficoVelasProps {
  dados: IAgrupamentoDadosPorDia[]
  titulo: string
  subTitulo: string
}

const ALTURA_AREA_BARRAS = 200

export function GraficoVelaVertical(props: GraficoVelasProps) {
  const { palette, shape } = useTheme()

  const maxTotal = Math.max(...props.dados.map(d => d.total), 1)

  const borderRadius = `${shape.borderRadius}px`

  return (
    <BoxApp
      sx={{
        background: palette.background.paper,
        border: `1px solid ${palette.divider}`,
        borderRadius,
        padding: '20px'
      }}
      height='350px'
      display='flex'
      flexDirection='column'
    >
      <BoxApp display='flex' justifyContent='space-between'>
        <BoxApp>
          <TextApp texto={props.titulo} fontSize='14px' fontWeight={600} />
          <TextApp marginBottom='1rem' texto={props.subTitulo} fontSize='12px' color='textDisabled' />
        </BoxApp>
        <BoxApp>
          <TextApp marginBottom='1rem' texto={`últ. ${props.dados.length} dias`} fontSize='12px' color='textDisabled' />
        </BoxApp>
      </BoxApp>

      {props.dados.length === 0 ? (
        <BoxApp flex={1} display='flex' alignItems='center' justifyContent='center'>
          <TextApp texto='Sem dados' fontSize='12px' color='textSecondary' />
        </BoxApp>
      ) : (
        <BoxApp flex={1} display='flex' flexDirection='column' gap='8px'>
          <BoxApp
            display='flex'
            alignItems='end'
            justifyContent='space-between'
            gap='8px'
            sx={{ height: `${ALTURA_AREA_BARRAS}px` }}
          >
            {props.dados.map((item, i) => {
              const alturaPx = Math.max(Math.round((item.total / maxTotal) * ALTURA_AREA_BARRAS), 4)
              return (
                <BoxApp
                  key={`${item.data}-${i}`}
                  display='flex'
                  flexDirection='column'
                  alignItems='center'
                  justifyContent='end'
                  gap='4px'
                  sx={{ flex: 1, height: '100%' }}
                >
                  <TextApp
                    texto={String(item.total)}
                    fontSize='11px'
                    fontWeight={600}
                    color='textSecondary'
                    textAlign='center'
                  />
                  <BoxApp
                    width='100%'
                    backgroundColor={palette.primary.main}
                    sx={{
                      height: `${alturaPx}px`,
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 0.8s cubic-bezier(.34,1.56,.64,1)',
                      opacity: 0.85
                    }}
                  >
                    <></>
                  </BoxApp>
                </BoxApp>
              )
            })}
          </BoxApp>

          <BoxApp
            display='flex'
            justifyContent='space-between'
            gap='8px'
            sx={{ borderTop: `1px solid ${palette.divider}`, paddingTop: '6px' }}
          >
            {props.dados.map((item, i) => (
              <BoxApp key={`label-${item.data}-${i}`} sx={{ flex: 1, textAlign: 'center' }}>
                <TextApp texto={item.descricaoDia} fontSize='10px' color='textDisabled' textAlign='center' />
              </BoxApp>
            ))}
          </BoxApp>
        </BoxApp>
      )}
    </BoxApp>
  )
}
