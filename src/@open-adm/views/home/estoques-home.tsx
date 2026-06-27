import { useTheme } from '@mui/material'
import { BoxApp } from 'src/@open-adm/components/box'
import { CardCustom } from 'src/@open-adm/components/cards'
import { DividerApp } from 'src/@open-adm/components/divider'
import { IconApp } from 'src/@open-adm/components/icon'
import { TableApp } from 'src/@open-adm/components/table/table-app'
import { TextApp } from 'src/@open-adm/components/text'
import { IVendaProduto } from 'src/@open-adm/types/home'
import { formatMoney } from 'src/@open-adm/utils/format-money'

interface propsTopClientesMaisPedidos {
  estoques: IVendaProduto[]
  titulo: string
  icone: string
  corIcone: string
}

const EstoquesHome = (props: propsTopClientesMaisPedidos) => {
  const { palette, shape } = useTheme()
  const borderRadius = `${shape.borderRadius}px`

  return (
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
          border={`0.7px solid ${props.corIcone}`}
          borderRadius='50%'
          width='35px'
          height='35px'
          display='flex'
          alignItems='center'
          justifyContent='center'
          backgroundColor={props.corIcone}
        >
          <IconApp icon={props.icone} color='white' />
        </BoxApp>
        <BoxApp>
          <TextApp texto={props.titulo} fontSize='14px' fontWeight={600} />
        </BoxApp>
      </BoxApp>
      <BoxApp padding='0.5rem'>
        {props.estoques.map((produto, index) => {
          const ultimo = index === props.estoques.length - 1
          return (
            <BoxApp key={produto.id} display='flex' gap='0.5rem' flexDirection='column'>
              <BoxApp display='flex' justifyContent='start' gap='0.5rem'>
                <img style={{ width: '35px', borderRadius: borderRadius }} src={produto.foto} alt={produto.descricao} />

                <BoxApp display='flex' minWidth='0' justifyContent='space-between' width='100%' flexDirection='column'>
                  <BoxApp display='flex' justifyContent='space-between'>
                    <TextApp texto={`#${produto.descricao}`} fontWeight={600} fontSize='14px' />
                    <TextApp
                      texto={`${formatMoney(produto.valorTotal)}`}
                      fontWeight={600}
                      color={palette.success.main}
                      fontSize='16px'
                    />
                  </BoxApp>
                  <BoxApp display='flex' justifyContent='space-between'>
                    <TextApp noWrap texto={`${produto.tamanho || produto.peso}`} fontSize='12px' />
                    <TextApp noWrap texto={`${produto.quantidade} vendidos`} fontSize='12px' />
                  </BoxApp>
                </BoxApp>
              </BoxApp>
              {!ultimo && <DividerApp marginBotton='0.5rem' />}
            </BoxApp>
          )
        })}
      </BoxApp>
    </BoxApp>
  )
}

export default EstoquesHome
