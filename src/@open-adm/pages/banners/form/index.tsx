import { Box, Button, Card, CardHeader, Checkbox, FormGroup, Typography, FormControlLabel } from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { useSnackbar } from "src/@open-adm/components/snack";
import { UploadImage } from "src/@open-adm/components/upload-image";
import { useApi } from "src/@open-adm/hooks/use-api";
import { IForm } from "src/@open-adm/types/form";
import { useRouter as useRouterQuery } from 'next/router'
import { IBanner } from "src/@open-adm/types/banner";

export function FormBanner(props: IForm) {

    const [foto, setFoto] = useState<string>('')
    const [banner, setBanner] = useState<IBanner>()
    const router = useRouter();
    const snack = useSnackbar();
    const { query } = useRouterQuery();
    const { post, get, put } = useApi<IBanner>();
    const title = props.action === 'create' ? 'Adicionar novo banner' : props.action === 'update' ? 'Editar banner' : 'Visualizar banner'

    async function submit() {
        try {
            const index = foto.indexOf(',') + 1;
            const base64 = foto.slice(index);

            if (!base64) {
                snack.show('Selecione uma foto para o banner!', "info");
                return;
            }

            if (props.action === 'create') {
                await post('banners/create', {
                    foto: base64
                } as IBanner)
            }

            if (props.action === 'update') {
                await put('banners/update', {
                    id: banner?.id ?? '',
                    ativo: banner?.ativo ?? false,
                    foto: base64
                } as IBanner)
            }
            router.replace('/banners')
        } catch (error) {

        }
    }

    async function init() {
        try {
            if (props.action !== 'create') {
                const response = await get(`banners/get-banner?id=${query.id}`);
                if (response && !banner) {
                    setBanner(response);
                    setFoto(`data:image/jpeg;base64,${response?.foto ?? ''}`);
                }
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <Card sx={{ padding: 5 }} >
            <CardHeader
                title={title}
            />

            <Box width='100%' display='flex' alignItems='center' justifyContent='center' flexDirection='column' gap={10}>
                {props.action !== 'view' &&
                    <Box display='flex' alignItems='center'>
                        <UploadImage
                            upload={(ft) => setFoto(ft)}
                        />
                        <Typography>
                            Selecione uma imagem!
                        </Typography>
                    </Box>
                }
                <Box
                    component="img"
                    src={foto}
                    sx={{ width: '200px', height: '200px', borderRadius: '5px' }}
                />
                {props.action !== 'create' &&
                    <FormGroup>
                        <FormControlLabel
                            required
                            disabled={props.action === 'view'}
                            control={
                                <Checkbox
                                    checked={banner?.ativo ?? false}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setBanner({
                                        ...banner,
                                        ativo: e.target.checked
                                    } as IBanner)}
                                />}
                            label="Ativo"
                        />
                    </FormGroup>
                }
            </Box>


            <Box display='flex' justifyContent='space-between' sx={{ marginTop: 10 }}>
                <Button
                    onClick={() => router.replace("/banners")}
                >
                    Voltar
                </Button>
                {props.action !== 'view' &&
                    <Button
                        variant="contained"
                        onClick={submit}
                    >
                        Salvar
                    </Button>
                }
            </Box>
        </Card>
    )
}