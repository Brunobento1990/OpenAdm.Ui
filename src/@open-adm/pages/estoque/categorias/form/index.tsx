import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomTextField from "src/@core/components/mui/text-field";
import { Form } from "src/@open-adm/components/form";
import { useSnackbar } from "src/@open-adm/components/snack";
import { UploadImage } from "src/@open-adm/components/upload-image";
import { useApi } from "src/@open-adm/hooks/use-api";
import { IForm } from "src/@open-adm/types/form";
import * as yup from 'yup';
import { useRouter } from "next/router";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const defaultValues = {
    descricao: ''
}

const schema = yup.object().shape({
    descricao: yup.string().length(255).required("Informe a pesquisa")
})

export function FormCategoria(props: IForm) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    console.log('matches : ', matches)

    const [foto, setFoto] = useState<string>('');
    const { post } = useApi();
    const snack = useSnackbar();
    const router = useRouter();

    const {
        control,
        getValues
    } = useForm({
        defaultValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    async function onSubmit() {

        const descricao = getValues('descricao');
        if (!descricao) {
            snack.show('Informe a descrição!', 'info');
            return;
        }

        try {

            let newFoto = '';
            if (foto) {
                const index = foto.indexOf(',') + 1;
                newFoto = foto.slice(index);
            }

            await post('categorias/create', {
                foto: newFoto,
                descricao
            })

            router.replace('/estoque/categoria')
        } catch (error) {

        }
    }

    return (
        <Form
            title="Categorias"
            action={props.action}
            submit={onSubmit}
            urlVoltar="/estoque/categoria"
        >
            <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column' gap={10}>
                <Box sx={{ width: !matches ? '100%' : '80%' }}>
                    <Controller
                        name='descricao'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                            <CustomTextField
                                fullWidth
                                label='Descrição *'
                                value={value}
                                onBlur={onBlur}
                                onChange={onChange}
                            />
                        )}
                    />
                </Box>
                <Box width='100%' display='flex' alignItems='center' justifyContent='center' gap={10} flexDirection={!matches ? 'column' : undefined}>
                    <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
                        <UploadImage
                            upload={(ft) => setFoto(ft)}
                        />
                        <Typography>
                            Selecione uma imagem!
                        </Typography>
                    </Box>
                    <Box
                        component="img"
                        src={foto}
                        sx={{ width: '200px', height: '200px', borderRadius: '5px' }}
                    />
                </Box>
            </Box>
        </Form>
    )
}