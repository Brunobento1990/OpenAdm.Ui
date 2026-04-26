'use client'

import { useTheme } from '@mui/material/styles'
import { TextApp } from '../text'
import { BoxApp } from '../box'

export interface IAgrupamento {
  id: number
  descricao: string
  total: number
  percentual: number
  cor?: string
}

interface GraficoVelaProps {
  dados: IAgrupamento[]
  titulo: string
  subTitulo: string
}

export function GraficoVelaHorizontal(props: GraficoVelaProps) {
  const { palette, shape } = useTheme()

  const fallbackColors = [palette.primary.main, palette.success.main, palette.info.main, palette.error.main]

  const getColor = (item: IAgrupamento, index: number) => item.cor || fallbackColors[index % fallbackColors.length]

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
      overflowy='auto'
    >
      <TextApp texto={props.titulo} fontSize='14px' fontWeight={600} />
      <TextApp texto={props.subTitulo} fontSize='12px' color='textDisabled' />

      <BoxApp display='flex' flexDirection='column' gap='8px'>
        {props.dados.map((item, i) => (
          <BoxApp key={item.id} width='100%' display='flex' flexDirection='column'>
            <BoxApp display='flex' alignItems='center' justifyContent='space-between' width='100%'>
              <TextApp texto={item.descricao} fontSize='12px' fontWeight={500} />
              <BoxApp display='flex' alignItems='center' gap='0.1rem'>
                <TextApp texto={String(item.total)} fontSize='11px' color='textSecondary' textAlign='center' />
                {' - '}
                <TextApp texto={`${item.percentual}%`} fontSize='11px' color='textSecondary' textAlign='center' />
              </BoxApp>
            </BoxApp>
            <BoxApp
              height='7px'
              display='flex'
              justifyContent='space-between'
              borderRadius={borderRadius}
              width={`100%`}
            >
              <BoxApp
                borderRadius={`5px 0px 0px 5px`}
                backgroundColor={getColor(item, i)}
                width={`${item.percentual}%`}
              >
                <></>
              </BoxApp>
              <BoxApp
                borderRadius={`0px 5px 5px 0px`}
                backgroundColor={'#c9c9c9'}
                width={`${105 - item.percentual}%`.trim()}
              >
                <></>
              </BoxApp>
            </BoxApp>
          </BoxApp>
        ))}
      </BoxApp>
    </BoxApp>
  )
}
