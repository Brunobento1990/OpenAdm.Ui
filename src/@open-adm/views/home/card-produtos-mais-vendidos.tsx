import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material"
import { IProdutosMaisVendidos } from "src/@open-adm/types/produtos-mais-vendidos"

interface cardProdutosMaisVendidosProps {
    produtos: IProdutosMaisVendidos[]
}

const CardProdutosMaisVendidos = (props: cardProdutosMaisVendidosProps) => {

    return (
        <Card sx={{ marginTop: 5 }}>
            <CardHeader
                title='Produtos mais vendidos'
            />
            <CardContent>
                {props.produtos.map((item, index: number) => {
                    return (
                        <Box
                            key={item.descricao}
                            sx={{
                                display: 'flex',
                                '& img': { mr: 4 },
                                alignItems: 'center',
                                mb: index !== props.produtos.length - 1 ? 4.75 : undefined
                            }}
                        >
                            <img width={46} src={`data:image/jpeg;base64,${item.foto}`} alt={item.descricao} />

                            <Box
                                sx={{
                                    rowGap: 1,
                                    columnGap: 4,
                                    width: '100%',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Typography variant='h6'>{item.descricao}</Typography>
                                    <Typography variant='body2' sx={{ fontWeight: 500, color: 'text.disabled' }}>
                                        REF : {item.referencia}
                                    </Typography>
                                </Box>
                                <Typography sx={{ color: 'text.secondary' }}>N : {item.numero}</Typography>
                            </Box>
                        </Box>
                    )
                })}
            </CardContent>
        </Card>
    )
}

export default CardProdutosMaisVendidos