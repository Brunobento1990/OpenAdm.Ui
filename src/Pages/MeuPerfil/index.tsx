import { ChangeEvent, useEffect, useState } from "react";
import { useApi } from "../../Service/useApi"
import { IUsuarioView } from "./types";
import { LayoutForm } from "../../Components/LayoutForm";
import { Avatar, Box, Grid } from "@mui/material";
import { InputCuston } from "../../Components/Inputs/InputCustom";
import * as S from "./styles";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useThemeApp } from "../../hooks/use-theme-app";

export function MeuPerfil() {

    const [usuario, setUsuario] = useState<IUsuarioView | undefined>();
    const [imagemModel, setImagemModel] = useState<string | undefined>(usuario?.avatar);
    const themeApp = useThemeApp();

    const openFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        if (event.target.files) {
            const input = event.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                if (typeof reader.result == 'string') {
                    var index = reader.result.indexOf(',') + 1;

                    var base64 = reader.result.slice(index);
                    setImagemModel(reader.result);

                    const image = new Image();
                    image.src = reader.result;
                }
            };
            reader.readAsDataURL(input);
        }
    };

    const api = useApi();

    async function init() {
        const usuario = await api.getUsuario();
        setUsuario(usuario)
    }

    useEffect(() => { init() }, [])

    return (
        <LayoutForm>

            <Box
                sx={{
                    display: 'inline-flex',
                    height: 100,
                    width: 100
                }}
            >
                <Avatar
                    sx={{ margin: '10px', height:'80px', width:'80px' }}
                    onClick={(e: any) => openFile(e)}
                    src={imagemModel}
                />
                <S.labelCustom htmlFor="arquivo">
                    <PhotoCameraIcon 
                        sx={{color: themeApp.color.secundary, marginTop: '10px'}}
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
            </Box>



            <Grid
                container
                item
                direction='row'
                spacing={2}
                padding={2}
            >
                <Grid
                    item
                    spacing={2}
                    padding={2}
                >
                    <InputCuston
                        label={"E-mail"}
                        type={"text"}
                        value={usuario?.email}
                        readOnly
                    />
                    <InputCuston
                        label={"Nome"}
                        type={"text"}
                        value={usuario?.nome}
                        readOnly
                    />
                </Grid>

            </Grid>

        </LayoutForm>
    );
}