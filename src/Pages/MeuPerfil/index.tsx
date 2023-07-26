import { ChangeEvent, useEffect, useState } from "react";
import { useApi } from "../../Service/useApi"
import { LayoutForm } from "../../Components/LayoutForm";
import { Avatar, Box, Grid, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import Item from "@mui/material/Grid"
import { InputCuston } from "../../Components/Inputs/InputCustom";
import * as S from "./styles";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useThemeApp } from "../../hooks/use-theme-app";
import { ButtonCustom } from "../../Components/Buttons/ButtonCustom";

export function MeuPerfil() {

    const [imagemModel, setImagemModel] = useState<string | undefined>(undefined);
    const themeApp = useThemeApp();

    const [email, setEmail] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const [avatar, setAvatar] = useState<string | undefined>(undefined);
    const [ddd, setDdd] = useState<string | undefined>("");
    const [telefone, setTelefone] = useState<string | undefined>("");
    const [observacao, setObservacao] = useState<string | undefined>("");

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));


    const openFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        if (event.target.files) {
            const input = event.target.files[0];

            if (input) {

                const reader = new FileReader();

                reader.onload = () => {
                    if (typeof reader.result == 'string') {
                        var index = reader.result.indexOf(',') + 1;

                        var base64 = reader.result.slice(index);
                        setAvatar(base64)
                        setImagemModel(reader.result);

                        const image = new Image();
                        image.src = reader.result;
                    }
                };
                reader.readAsDataURL(input);
            }
        }
    };

    const api = useApi();

    useEffect(() => { init() }, [])

    async function init() {
        const usuario = await api.getUsuario();
        setEmail(usuario.email)
        setNome(usuario.nome)
        setAvatar(usuario.avatar)
        setDdd(usuario.ddd)
        setTelefone(usuario.telefone)
        setObservacao(usuario.observacao)

        if (usuario.avatar) {
            setImagemModel("data:image/jpeg;base64," + usuario.avatar)
        }
    }

    async function submit() {
        const data = {
            telefone,
            ddd,
            observacao,
            avatar,
            email
        }

        await api.put("edit-usuario", data);
    }


    return (
        <LayoutForm
            height="80%"
            onSubmit={submit}
        >

            <Grid
                item
                direction={smDown ? 'column' : 'row'}
                display='flex'
                alignItems='start'
                spacing={2}
                padding={2}
            >
                <Item>
                    <Paper
                        sx={{
                            height: 200,
                            width: smDown ? 320 : 200,
                            padding: 2,
                            margin: 2
                        }}
                    >
                        <Avatar
                            sx={{ margin: '10px', height: '100px', width: '100px' }}
                            onClick={(e: any) => openFile(e)}
                            src={imagemModel}
                        />
                        <S.labelCustom htmlFor="arquivo">
                            <PhotoCameraIcon
                                sx={{ color: themeApp.color.secundary }}
                            />
                        </S.labelCustom>
                        <input
                            style={{ display: 'none' }}
                            type="file"
                            className="imgInput"
                            accept="image/*"
                            id="arquivo"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => openFile(e)}
                        />
                        <Typography
                            variant='subtitle2'
                            sx={themeApp.configFontEscuro}
                        >
                            {nome}
                        </Typography>
                    </Paper>
                </Item>

                <Item
                    xs={12}
                    md={6}
                    sx={{
                        marginTop: 1
                    }}
                >
                    <InputCuston
                        label={"E-mail"}
                        margin={.5}
                        onChange={(value) =>
                            setEmail(value)
                        }
                        fullWidth
                        type="email"
                        value={email}
                    />
                    <Item
                        sx={{
                            marginTop: 2
                        }}
                    >
                        <InputCuston
                            label={"DDD"}
                            margin={.5}
                            onChange={(value) =>
                                setDdd(value)
                            }
                            type="text"
                            value={ddd}
                        />
                        <InputCuston
                            label={"Telefone"}
                            margin={.5}
                            onChange={(value) =>
                                setTelefone(value)
                            }
                            type="text"
                            value={telefone}
                        />
                    </Item>
                </Item>

            </Grid>
            <Grid
                item
                direction='row'
                display='flex'
                alignItems="flex-end"
                width='100%'
                spacing={2}
                padding={2}
            >
                <Item
                    xs={12}
                    md={12}
                >
                    <InputCuston
                        label={"Observação"}
                        margin={.5}
                        onChange={(value) =>
                            setObservacao(value)
                        }
                        fullWidth
                        type="text"
                        value={observacao}
                    />


                </Item>
            </Grid>
        </LayoutForm>
    );
}