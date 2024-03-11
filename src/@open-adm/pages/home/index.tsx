import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useApi } from "src/@open-adm/hooks/use-api";
import { IHome } from "src/@open-adm/types/home";

export function HomePage() {

    const { get } = useApi();
    const [home, setHome] = useState<IHome>();

    async function init() {
        try {
            var response = await get<IHome>("home/adm");
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
                <Card>
                    <CardHeader
                        title='Top 3 clientes com mais gastos $'
                    />
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
                </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Card>
                    <CardHeader
                        title='Top 3 clientes com mais pedidos'
                    />
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
                </Card>
            </Grid>
        </Grid>
    )
}
