import { BoxApp } from 'src/@open-adm/components/box'
import { TextApp } from 'src/@open-adm/components/text'
import { ICobrancaHome } from 'src/@open-adm/types/home'
import { useTheme } from '@mui/material/styles'
import { formatMoney } from 'src/@open-adm/utils/format-money'
import { IconApp } from 'src/@open-adm/components/icon'
import { GridApp, GridItemApp } from 'src/@open-adm/components/grid'
import { DividerApp } from 'src/@open-adm/components/divider'
import { ButtonApp } from 'src/@open-adm/components/buttons'
import { useNavigateApp } from 'src/@open-adm/hooks/use-navigate-app'
import { rotasApp } from 'src/configs/rotasApp'

interface CobrancaPeriodoHomeHome {
  cobranca?: ICobrancaHome
}

function CobrancaPeriodoHome(props: CobrancaPeriodoHomeHome) {
  const { navigate } = useNavigateApp()
  const { palette, shape } = useTheme()

  if (!props.cobranca) {
    return <></>
  }

  const borderRadius = `${shape.borderRadius}px`

  function negociarCobranca(pedidoId: string) {
    navigate(`${rotasApp.financeiro.negociarCobranca}/${pedidoId}`)
  }

  return (
    <>
      <DividerApp chip='Cobranças' />
      <GridApp container>
        <GridItemApp item xs={12} sm={3}>
          <BoxApp
            sx={{
              background: palette.background.paper,
              borderRadius,
              padding: '20px'
            }}
            border={`1px solid ${palette.divider}`}
            height='220px'
          >
            <BoxApp display='flex' gap='1rem'>
              <BoxApp
                border={`0.7px solid ${palette.warning.main}`}
                borderRadius='50%'
                width='35px'
                height='35px'
                display='flex'
                alignItems='center'
                justifyContent='center'
                backgroundColor={palette.warning.main}
              >
                <IconApp icon={'solar:calendar-linear'} color='white' />
              </BoxApp>
              <TextApp texto={'Cobranças recentes'} fontSize='14px' fontWeight={600} />
            </BoxApp>
            <BoxApp marginTop='1rem'>
              <TextApp texto={`Hoje: ${formatMoney(props.cobranca.totalHoje)}`} />
              <TextApp texto={`Últimos 7 dias: ${formatMoney(props.cobranca.totalSemana)}`} />
            </BoxApp>
          </BoxApp>
        </GridItemApp>
        <GridItemApp item xs={12} sm={3}>
          <BoxApp
            sx={{
              background: palette.background.paper,
              borderRadius
            }}
            border={`1px solid ${palette.divider}`}
            height='220px'
            padding='1rem'
          >
            <BoxApp display='flex' gap='1rem'>
              <BoxApp
                border={`0.7px solid ${palette.info.main}`}
                borderRadius='50%'
                width='35px'
                height='35px'
                display='flex'
                alignItems='center'
                justifyContent='center'
                backgroundColor={palette.info.main}
              >
                <IconApp icon={'mdi:payment-clock'} color='white' />
              </BoxApp>
              <BoxApp>
                <TextApp texto={'A cobrar'} fontSize='14px' fontWeight={600} />
                <TextApp texto={'Valor total pendente'} color={palette.text.secondary} fontSize='12px' />
              </BoxApp>
            </BoxApp>
            <BoxApp marginTop='1rem'>
              <TextApp
                color={palette.success.main}
                texto={`Total: ${formatMoney(props.cobranca.totalCobranca)}`}
                fontWeight={600}
                fontSize='20px'
              />
              <TextApp
                color={palette.text.secondary}
                texto={`${props.cobranca.quantidadeACobrar} pedidos aguardando cobrança`}
              />
            </BoxApp>
          </BoxApp>
        </GridItemApp>
        <GridItemApp item xs={12} sm={3}>
          <BoxApp
            sx={{
              background: palette.background.paper,
              borderRadius,
              padding: '0.5rem'
            }}
            border={`1px solid ${palette.divider}`}
            height='100%'
            display='flex'
            gap='1rem'
            justifyContent='space-between'
            flexDirection='column'
          >
            <BoxApp display='flex' gap='1rem' padding='0.5rem'>
              <BoxApp
                border={`0.7px solid ${palette.warning.main}`}
                borderRadius='50%'
                width='35px'
                height='35px'
                display='flex'
                alignItems='center'
                justifyContent='center'
                backgroundColor={palette.warning.main}
              >
                <IconApp icon={'weui:time-outlined'} color='white' />
              </BoxApp>
              <BoxApp>
                <TextApp texto={'Cobranças mais antigas'} fontSize='14px' fontWeight={600} />
                <TextApp texto={'Priorize contato'} color={palette.text.secondary} fontSize='12px' />
              </BoxApp>
            </BoxApp>
            <BoxApp padding='0.5rem'>
              {props.cobranca.cobrancasMaisAntigas.map(cobranca => (
                <BoxApp
                  key={cobranca.pedidoId}
                  display='flex'
                  gap='0.5rem'
                  flexDirection='column'
                  cursor='pointer'
                  borderRadius={borderRadius}
                  padding='0.5rem'
                  hover={{ backgroundColor: palette.action.hover }}
                  onClick={() => negociarCobranca(cobranca.pedidoId)}
                  role='button'
                  tabIndex={0}
                  onKeyDown={event => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      negociarCobranca(cobranca.pedidoId)
                    }
                  }}
                >
                  <BoxApp display='flex' alignItems='center' justifyContent='start' gap='0.5rem'>
                    <BoxApp
                      border={`0.7px solid ${palette.warning.main}`}
                      borderRadius='50%'
                      width='40px'
                      height='35px'
                      display='flex'
                      alignItems='center'
                      justifyContent='center'
                      backgroundColor={palette.warning.main}
                    >
                      <IconApp icon={'fluent-mdl2:product-variant'} color='white' />
                    </BoxApp>
                    <BoxApp display='flex' justifyContent='space-between' flex={1} minWidth='0' flexDirection='column'>
                      <BoxApp display='flex' justifyContent='space-between'>
                        <TextApp texto={`Pedido: #${cobranca.numeroPedido}`} fontWeight={600} fontSize='14px' />
                        <TextApp
                          texto={`${formatMoney(cobranca.valor)}`}
                          fontWeight={600}
                          color={palette.success.main}
                          fontSize='16px'
                        />
                      </BoxApp>
                      <BoxApp display='flex' justifyContent='space-between'>
                        <TextApp noWrap texto={`${cobranca.cliente}`} fontSize='12px' />
                        <TextApp texto={`há: ${cobranca.aDias} dias`} fontSize='12px' />
                      </BoxApp>
                    </BoxApp>
                    <IconApp icon='tabler:chevron-right' color={palette.primary.main} width='1.25rem' />
                  </BoxApp>
                  <DividerApp marginBotton='0.5rem' />
                </BoxApp>
              ))}
            </BoxApp>
          </BoxApp>
        </GridItemApp>
      </GridApp>
    </>
  )
}

export default CobrancaPeriodoHome
