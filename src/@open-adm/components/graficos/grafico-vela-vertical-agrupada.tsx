'use client'

import { useTheme } from '@mui/material/styles'
import { BoxApp } from '../box'
import { TextApp } from '../text'
import { Tooltip } from '@mui/material'
import { useState } from 'react'

interface IDadoCategoria {
  quantidade: number
  categoria: string
}

export interface IAgrupamentoDadosPorMes {
  mes: string
  data: string
  dados: IDadoCategoria[]
}

interface GraficoVelasProps {
  dados: IAgrupamentoDadosPorMes[]
  titulo: string
  subTitulo: string
}

const ALTURA_AREA_BARRAS = 200

export function GraficoVelaVerticalAgrupado(props: GraficoVelasProps) {
  const [tooltipOpen, setTooltipOpen] = useState<string | null>(null)

  const { palette, shape } = useTheme()

  const maxTotal = Math.max(...props.dados.flatMap(d => d.dados.map(x => x.quantidade)), 1)

  const borderRadius = `${shape.borderRadius}px`

  const fallbackColors = [palette.primary.main, palette.success.main, palette.info.main, palette.error.main]

  const getColor = (index: number) => fallbackColors[index % fallbackColors.length]

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
      {/* HEADER */}
      <BoxApp display='flex' justifyContent='space-between'>
        <BoxApp>
          <TextApp texto={props.titulo} fontSize='14px' fontWeight={600} />
          <TextApp marginBottom='1rem' texto={props.subTitulo} fontSize='12px' color='textDisabled' />
        </BoxApp>
        <TextApp marginBottom='1rem' texto={`${props.dados.length} meses`} fontSize='12px' color='textDisabled' />
      </BoxApp>

      {/* SEM DADOS */}
      {props.dados.length === 0 ? (
        <BoxApp flex={1} display='flex' alignItems='center' justifyContent='center'>
          <TextApp texto='Sem dados' fontSize='12px' color='textSecondary' />
        </BoxApp>
      ) : (
        <BoxApp flex={1} display='flex' flexDirection='column' gap='8px'>
          {/* 🔥 SCROLL HORIZONTAL */}
          <BoxApp
            sx={{
              overflowX: 'auto',
              overflowY: 'hidden',
              '&::-webkit-scrollbar': {
                height: '6px'
              }
            }}
          >
            <BoxApp
              sx={{
                minWidth: `${props.dados.length * 90}px`
              }}
            >
              {/* ÁREA DAS BARRAS */}
              <BoxApp
                display='flex'
                alignItems='end'
                gap='12px'
                sx={{
                  height: `${ALTURA_AREA_BARRAS}px`
                }}
              >
                {props.dados.map((item, i) => (
                  <BoxApp
                    key={`${item.data}-${i}`}
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='end'
                    gap='4px'
                    sx={{
                      minWidth: '70px',
                      flexShrink: 0,
                      height: '100%'
                    }}
                  >
                    {/* BARRAS AGRUPADAS */}
                    <BoxApp
                      display='flex'
                      alignItems='end'
                      justifyContent='center'
                      gap='4px'
                      sx={{ width: '100%', height: '100%' }}
                    >
                      {item.dados.map((dado, j) => {
                        const alturaPx = Math.max(Math.round((dado.quantidade / maxTotal) * ALTURA_AREA_BARRAS), 4)

                        const id = `${i}-${j}`

                        return (
                          <Tooltip
                            key={id}
                            title={`${dado.categoria} - ${dado.quantidade}`}
                            arrow
                            open={tooltipOpen === id}
                            onClose={() => setTooltipOpen(null)}
                            disableHoverListener
                            disableFocusListener
                            disableTouchListener
                            placement='top'
                          >
                            <BoxApp
                              display='flex'
                              flexDirection='column'
                              alignItems='center'
                              justifyContent='end'
                              onClick={() => {
                                setTooltipOpen(prev => (prev === id ? null : id))
                              }}
                              sx={{
                                flex: 1,
                                maxWidth: '16px',
                                height: '100%',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  opacity: 1,
                                  transform: 'scale(1.05)'
                                }
                              }}
                            >
                              {/* VALOR */}
                              <TextApp
                                texto={String(dado.quantidade)}
                                fontSize='10px'
                                fontWeight={600}
                                color='textSecondary'
                                textAlign='center'
                              />

                              {/* BARRA */}
                              <BoxApp
                                sx={{
                                  width: '100%',
                                  height: `${alturaPx}px`,
                                  borderRadius: '4px 4px 0 0',
                                  opacity: 0.9
                                }}
                                backgroundColor={getColor(j)}
                              >
                                <></>
                              </BoxApp>
                            </BoxApp>
                          </Tooltip>
                        )
                      })}
                    </BoxApp>
                  </BoxApp>
                ))}
              </BoxApp>

              {/* 🔥 LABELS SINCRONIZADOS */}
              <BoxApp
                display='flex'
                gap='12px'
                sx={{
                  borderTop: `1px solid ${palette.divider}`,
                  paddingTop: '6px'
                }}
              >
                {props.dados.map((item, i) => (
                  <BoxApp
                    key={`label-${item.data}-${i}`}
                    sx={{
                      minWidth: '70px',
                      flexShrink: 0,
                      textAlign: 'center'
                    }}
                  >
                    <TextApp texto={item.mes} fontSize='10px' color='textDisabled' textAlign='center' />
                  </BoxApp>
                ))}
              </BoxApp>
            </BoxApp>
          </BoxApp>
        </BoxApp>
      )}
    </BoxApp>
  )
}
