import { useTheme } from '@mui/material/styles'
import { BoxApp } from 'src/@open-adm/components/box'
import { IconApp } from 'src/@open-adm/components/icon'
import { TextApp } from 'src/@open-adm/components/text'
import { IParcelasVencimentoHome } from 'src/@open-adm/types/home'
import { formatMoney } from 'src/@open-adm/utils/format-money'

interface ParcelasVencimentoHomeProps {
  parcelas?: IParcelasVencimentoHome
}

function ParcelasVencimentoHome(props: ParcelasVencimentoHomeProps) {
  const { palette, shape } = useTheme()
  const borderRadius = `${shape.borderRadius}px`

  return (
    <BoxApp
      sx={{ background: palette.background.paper }}
      border={`1px solid ${palette.divider}`}
      borderRadius={borderRadius}
      borderTop={`5px solid ${palette.info.main}`}
      padding='20px'
      minHeight='180px'
    >
      <BoxApp display='flex' alignItems='center' gap='12px' marginBottom='20px'>
        <BoxApp
          backgroundColor={palette.info.main}
          borderRadius='50%'
          width='35px'
          height='35px'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <IconApp icon='solar:calendar-mark-outline' color='white' />
        </BoxApp>
        <BoxApp>
          <TextApp texto='Vencimento de parcelas' fontSize='14px' fontWeight={600} />
          <TextApp texto='Hoje e próximos 7 dias' fontSize='12px' />
        </BoxApp>
      </BoxApp>

      <BoxApp display='flex' gap='24px'>
        <BoxApp width='100%'>
          <TextApp texto='A receber' color={palette.success.main} fontSize='14px' fontWeight={600} />
          <TextApp texto={`Hoje: ${formatMoney(props.parcelas?.aReceberHoje ?? 0)}`} />
          <TextApp texto={`Na semana: ${formatMoney(props.parcelas?.aReceberSemana ?? 0)}`} />
        </BoxApp>
        <BoxApp width='100%'>
          <TextApp texto='A pagar' color={palette.error.main} fontSize='14px' fontWeight={600} />
          <TextApp texto={`Hoje: ${formatMoney(props.parcelas?.aPagarHoje ?? 0)}`} />
          <TextApp texto={`Na semana: ${formatMoney(props.parcelas?.aPagarSemana ?? 0)}`} />
        </BoxApp>
      </BoxApp>
    </BoxApp>
  )
}

export default ParcelasVencimentoHome
