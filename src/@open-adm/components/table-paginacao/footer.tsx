import { Pagination } from '@mui/material'
import { BoxApp } from '../box'
import { DropDownApp } from '../drop-down/drop-down-app'
import { TextApp } from '../text'

const qtdPorPaginas = [
  {
    id: 5,
    descricao: '5'
  },
  {
    id: 10,
    descricao: '10'
  },
  {
    id: 20,
    descricao: '20'
  },
  {
    id: 50,
    descricao: '50'
  }
]

interface propsFooterTable {
  quantidadePagina: number
  pagina: number
  setPagina: (newPage: number) => void
  quantidadePorPagina?: number
  setQuantidadePorPagina?: (newQuantidade: number) => void
  totalDeRegistros: number
}

export function FooterTable(props: propsFooterTable) {
  return (
    <BoxApp
      display='flex'
      alignItems='center'
      width='100%'
      justifyContent='space-between'
      gap='16px'
      height='48px'
      minHeight='48px'
      boxSizing='border-box'
    >
      <BoxApp width='100%' display='flex' alignItems='center' justifyContent='start'>
        <Pagination
          count={props.quantidadePagina}
          page={props.pagina}
          variant='outlined'
          shape='rounded'
          size='small'
          color='primary'
          onChange={(_, newPage) => props.setPagina(newPage)}
        />
      </BoxApp>
      <BoxApp width='100%' display='flex' alignItems='center' justifyContent='end' gap='8px'>
        {props.totalDeRegistros > 0 && (
          <TextApp texto={`Total: ${props.totalDeRegistros}`} color='text.primary' fontWeight={500} noWrap />
        )}
        <TextApp texto='Itens por página:' noWrap />
        <BoxApp width='80px' minWidth='80px'>
          <DropDownApp
            id='quantidadePorPagina'
            keyLabel='descricao'
            label=''
            size='small'
            value={qtdPorPaginas.find(x => x.id === props.quantidadePorPagina) || qtdPorPaginas[0]}
            values={qtdPorPaginas}
            onChange={(_, value) => props.setQuantidadePorPagina && props.setQuantidadePorPagina(value || 5)}
          />
        </BoxApp>
      </BoxApp>
    </BoxApp>
  )
}
