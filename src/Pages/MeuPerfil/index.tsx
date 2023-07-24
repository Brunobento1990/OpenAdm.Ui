import { ChangeEvent, useEffect, useState } from "react";
import { useApi } from "../../Service/useApi"
import { IUsuarioView } from "./types";
import { LayoutForm } from "../../Components/LayoutForm";
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import Item from "@mui/material/Grid"
import { InputCuston } from "../../Components/Inputs/InputCustom";
import * as S from "./styles";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useThemeApp } from "../../hooks/use-theme-app";
import EditIcon from '@mui/icons-material/Edit';
import { ButtonCustom } from "../../Components/Buttons/ButtonCustom";

export function MeuPerfil() {

    const [imagemModel, setImagemModel] = useState<string | undefined>(undefined);
    const [readOnly, setReadOnly] = useState<boolean>(true);
    const themeApp = useThemeApp();

    const [email, setEmail] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const [avatar, setAvatar] = useState<string | undefined>(undefined);
    const [ddd, setDdd] = useState<string | undefined>(undefined);
    const [telefone, setTelefone] = useState<string | undefined>(undefined);
    const [observacao, setObservacao] = useState<string | undefined>(undefined);


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
        <LayoutForm>
            <Paper
                sx={{
                    height: 200,
                    width: 200,
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

            <EditIcon
                sx={{ cursor: 'pointer', color: themeApp.color.secundary, marginLeft: '30px' }}
                onClick={() => setReadOnly(!readOnly)}
            />
            <Grid
                item
                direction='row'
                display='flex'
                alignItems='start'
                width='60%'
                spacing={2}
                padding={2}
            >
                <Item
                    xs={6}
                    md={12}
                >
                    <InputCuston
                        label={"E-mail"}
                        readOnly={readOnly}
                        margin={.5}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setEmail(event.target.value)
                        }
                        fullWidth
                        type="email"
                        value={email}
                    />
                </Item>
            </Grid>

            <Grid
                item
                direction='row'
                display='flex'
                width='60%'
                spacing={2}
                padding={2}
            >
                <Item
                    xs={6}
                    md={12}
                >
                    <InputCuston
                        label={"DDD"}
                        readOnly={readOnly}
                        margin={.5}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setDdd(event.target.value)
                        }
                        type="text"
                        value={ddd}
                    />
                    <InputCuston
                        label={"Telefone"}
                        readOnly={readOnly}
                        margin={.5}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setTelefone(event.target.value)
                        }
                        fullWidth
                        type="text"
                        value={telefone}
                    />
                </Item>
            </Grid>
            <Grid
                item
                direction='row'
                display='flex'
                alignItems="flex-end"
                width='60%'
                spacing={2}
                padding={2}
            >
                <Item
                    xs={6}
                    md={12}
                >
                    <InputCuston
                        label={"Observação"}
                        readOnly={readOnly}
                        margin={.5}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setObservacao(event.target.value)
                        }
                        type="text"
                        value={observacao}
                    />
                    {!readOnly &&
                        <Box
                            sx={{ marginLeft: '10px' , marginTop: '5px'}}
                        >
                            <ButtonCustom
                                text="Editar"
                                onClick={submit}
                            />
                        </Box>
                    }
                </Item>
            </Grid>

        </LayoutForm>
    );
}