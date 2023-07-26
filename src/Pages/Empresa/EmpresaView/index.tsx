import { useEffect, useState } from "react";
import { useApi } from "../../../Service/useApi";
import { LayoutForm } from "../../../Components/LayoutForm";
import { Box, Divider, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useThemeApp } from "../../../hooks/use-theme-app";
import { IEmpresaEdit, IEmpresaView } from "../types";
import Item from "@mui/material/Grid"
import { InputCuston } from "../../../Components/Inputs/InputCustom";

export function EmpresaView() {

    const api = useApi();
    const themeApp = useThemeApp(20);
    const [empresa, setEmpresa] = useState<IEmpresaView | undefined>();
    const [email, setEmail] = useState<string>("");
    const [nomeFantasia, setNomeFantasia] = useState<string>("");
    const [webSite, setWebSite] = useState<string>("");
    const [contato, setContato] = useState<string>("");
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    async function init() {
        const response = await api.getEmpresa();
        setEmpresa(response)
        setEmail(response.email)
        setNomeFantasia(response.nomeFantasia)
        setWebSite(response.webSite)
        setContato(response.contato)
    }

    async function submit(){

        const data: IEmpresaEdit={
            contato,
            webSite,
            nomeFantasia,
            email
        }

        await api.put("editar-empresa", data);
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <LayoutForm
            height="80%"
            onSubmit={submit}
        >
            <Box
                width='100%'
                padding={2}
            >
                <Typography
                    variant='subtitle2'
                    sx={themeApp.configFontEscuro}
                >
                    {`Código : ${empresa?.numero}`}
                </Typography>
                <Typography
                    variant='subtitle2'
                    sx={themeApp.configFontEscuro}
                >
                    {`Data de cadastro : ${empresa?.dataDeCadastro.slice(0, 10)}`}
                </Typography>
                <Typography
                    variant='subtitle2'
                    sx={themeApp.configFontEscuro}
                >
                    {`Razão social : ${empresa?.razaoSocial}`}
                </Typography>
                <Typography
                    variant='subtitle2'
                    sx={themeApp.configFontEscuro}
                >
                    {`CNPJ : ${empresa?.cnpj}`}
                </Typography>
            </Box>
            <Divider
                color='rgb(153, 29, 29)'
                sx={{ width: '100%', marginLeft: '8px' }}
            />
            <Grid
                item
                width='100%'
                display='flex'
                flexDirection={smDown ? 'column' : 'row'}
                spacing={2}
            >
                <Item
                    width='100%'
                    sm={6}
                    xs={12}
                >
                    <InputCuston
                        label={"Nome fantasia"}
                        margin={1}
                        onChange={(value) =>
                            setNomeFantasia(value)
                        }
                        fullWidth
                        type="text"
                        value={nomeFantasia}
                    />
                </Item>
                <Item
                    width='100%'
                    sm={4}
                    xs={12}
                    marginLeft={smDown ? 0 : 2}
                >
                    <InputCuston
                        label={"E-mail"}
                        margin={1}
                        onChange={(value) =>
                            setEmail(value)
                        }
                        fullWidth
                        type="email"
                        value={email}
                    />
                </Item>
            </Grid>

            <Grid
                item
                width='100%'
                display='flex'
                flexDirection={smDown ? 'column' : 'row'}
                spacing={2}
            >
                <Item
                    width='100%'
                    sm={6}
                    xs={12}
                >
                    <InputCuston
                        label={"WEB site"}
                        margin={1}
                        onChange={(value) =>
                            setWebSite(value)
                        }
                        fullWidth
                        type="text"
                        value={webSite}
                    />
                </Item>
                <Item
                    width='100%'
                    sm={4}
                    xs={12}
                    marginLeft={smDown ? 0 : 2}
                >
                    <InputCuston
                        label={"Contato"}
                        margin={1}
                        onChange={(value) =>
                            setContato(value)
                        }
                        fullWidth
                        type="text"
                        value={contato}
                    />
                </Item>
            </Grid>

        </LayoutForm>
    )
}