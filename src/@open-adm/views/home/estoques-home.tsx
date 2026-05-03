import { BoxApp } from 'src/@open-adm/components/box'
import { CardCustom } from 'src/@open-adm/components/cards'
import { TableApp } from 'src/@open-adm/components/table/table-app'
import { TextApp } from 'src/@open-adm/components/text'
import { IVendaProduto } from 'src/@open-adm/types/home'

interface propsTopClientesMaisPedidos {
  estoques: IVendaProduto[]
  titulo: string
}

const EstoquesHome = (props: propsTopClientesMaisPedidos) => {
  return (
    <CardCustom>
      <TextApp texto={props.titulo} fontSize='1.2rem' fontWeight={600} padding='1rem' />
      <TableApp
        columns={[
          {
            field: 'foto',
            headerName: 'Produto',
            renderCell: (row: IVendaProduto) => {
              return (
                <BoxApp display='flex' alignItems='center' gap='10px'>
                  <img src={row.foto} style={{ maxWidth: '30px', borderRadius: '5px' }} />
                  <TextApp texto={row.descricao} />
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
            renderCell: (row: IVendaProduto) => (row.peso ? row.peso : row.tamanho)
          }
        ]}
        rows={props.estoques ?? []}
        stickyHeader
      />
    </CardCustom>
  )
}

export default EstoquesHome
