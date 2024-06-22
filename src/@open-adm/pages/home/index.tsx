import { Box, CardContent, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNewApi } from "src/@open-adm/hooks/use-new-api";
import { IHome } from "src/@open-adm/types/home";

export function HomePage() {

    const { fecth } = useNewApi({
        method: 'GET',
        url: 'home/adm',
        notAlert: true
    });
    const [home, setHome] = useState<IHome>();

    async function init() {
        try {
            var response = await fecth<IHome>();
            if (response)
                setHome(response);
        } catch (error) {

        }
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <Grid container spacing={5} padding={9}>
            <Grid item xs={12} sm={6}>
                <Box>
                    <Typography variant='h5' color='text.primary'>
                        Top 3 clientes com mais gastos $
                    </Typography>
                    <CardContent>
                        {home?.topUsuariosTotalCompra.map((topUsuario) => (
                            <>
                                <Typography variant='h5' color='text.primary'>
                                    {topUsuario.usuario}
                                </Typography>
                                <Typography variant='subtitle1' color='text.primary'>
                                    Total gastos: R$ {topUsuario.totalCompra.toString().replace('.', ',')}
                                </Typography>
                            </>
                        ))}
                    </CardContent>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Box>
                    <Typography variant='h5' color='text.primary'>
                        Top 3 clientes com mais pedidos
                    </Typography>
                    <CardContent>
                        {home?.topUsuariosTotalPedido.map((topUsuario) => (
                            <>
                                <Typography variant='h5' color='text.primary'>
                                    {topUsuario.usuario}
                                </Typography>
                                <Typography variant='subtitle1' color='text.primary'>
                                    Total de pedidos: {topUsuario.totalPedidos}
                                </Typography>
                            </>
                        ))}
                    </CardContent>
                </Box>
            </Grid>
        </Grid>
    )
}
