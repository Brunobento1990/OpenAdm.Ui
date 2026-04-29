import { BoxApp } from 'src/@open-adm/components/box'
import { TextApp } from 'src/@open-adm/components/text'
import { useTheme } from '@mui/material/styles'
import { IconApp } from 'src/@open-adm/components/icon'

interface CardTotalizadorProps {
  total: number
  titulo: string
  icon: string
  color: string
}

export function CardTotalizador(props: CardTotalizadorProps) {
  const { palette, shape } = useTheme()
  const borderRadius = `${shape.borderRadius}px`

  return (
    <>
      <BoxApp
        sx={{
          background: palette.background.paper,
          borderRadius,
          padding: '20px'
        }}
        border={`1px solid ${palette.divider}`}
        height='150px'
        overflowy='auto'
        display='flex'
        justifyContent='space-between'
        flexDirection='column'
        borderTop={`5px solid ${props.color}`}
      >
        <BoxApp display='flex' justifyContent='space-between'>
          <TextApp texto={props.titulo} fontSize='14px' fontWeight={600} />
          <BoxApp
            border={`0.7px solid ${props.color}`}
            borderRadius='50%'
            width='35px'
            height='35px'
            display='flex'
            alignItems='center'
            justifyContent='center'
            backgroundColor={props.color}
          >
            <IconApp icon={props.icon} color='white' />
          </BoxApp>
        </BoxApp>
        <TextApp texto={`${props.total}`} fontSize='26px' fontWeight={600} />
      </BoxApp>
    </>
  )
}
