import { useFormik } from "formik";
import { useEffect, useState } from "react";
import CustomTextField from "src/@core/components/mui/text-field";
import { Form } from "src/@open-adm/components/form";
import SelectCustom from "src/@open-adm/components/select";
import { useApi } from "src/@open-adm/hooks/use-api";
import { ICategoria } from "src/@open-adm/types/categoria";
import { IForm } from "src/@open-adm/types/form";
import { defaultValuesEdit, schema } from "../config";
import { IProduto } from "src/@open-adm/types/produto";
import { useRouter } from "next/router";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ITamanho } from "src/@open-adm/types/tamanho";
import { IPeso } from "src/@open-adm/types/peso";
import { useRouter as useRouterQuery } from 'next/router'
import { UploadImage } from "src/@open-adm/components/upload-image";

export function FormProduto(props: IForm) {

    const title = props.action === 'create' ? 'Adicionar novo produto' : props.action === 'update' ? 'Editar produto' : 'Visualizar produto'
    const [categorias, setCategorias] = useState<ICategoria[]>([]);
    const [pesos, setPesos] = useState<IPeso[]>([]);
    const [pesosSelect, setPesosSelect] = useState<string[]>([]);
    const [tamanhosSelect, setTamanhosSelect] = useState<string[]>([]);
    const [tamanhos, setTamanhos] = useState<ITamanho[]>([]);
    const { get, put } = useApi<any>();
    const router = useRouter();
    const { query } = useRouterQuery();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const formik = useFormik({
        initialValues: defaultValuesEdit,
        validationSchema: schema,
        onSubmit: (values) => onSubmit(values),
    });

    async function onSubmit(values: IProduto) {
        try {

            const index = values.foto.indexOf(',') + 1;
            const newFoto = values.foto.slice(index);

            if (props.action === 'update') {
                const body = {
                    id: query.id,
                    descricao: values.descricao,
                    referencia: values.referencia,
                    especificacaoTecnica: values.especificacaoTecnica,
                    foto: values.foto.startsWith('https://') ? values.foto : newFoto,
                    categoriaId: categorias.find((x) => x.descricao === values.categoriaId)?.id,
                    tamanhosIds: tamanhosSelect,
                    pesosIds: pesosSelect
                }
                await put('produtos/update', body)
            }

            router.replace('/estoque/produto')
        } catch (error) {

        }
    }

    async function init() {
        try {
            if (props.action !== 'create' && query.id) {
                const responseProduto = await get(`produtos/get-produto?id=${query.id}`);
                formik.setValues(responseProduto);
            }

            const [categoriasResponse, pesosResponse, tamanhosResponse] =
                await Promise.all([get('categorias/list'), get('pesos/list'), get('tamanhos/list')]);

            setTamanhos(tamanhosResponse);
            setPesos(pesosResponse);
            setCategorias(categoriasResponse);
        } catch (error) {

        }
    }

    useEffect(() => {
        init();
    }, [])

    if (categorias && categorias?.length === 0) {
        return <></>
    }

    return (
        <Form
            action={props.action}
            submit={formik.handleSubmit}
            title={title}
            urlVoltar="/estoque/produto"
            gap={2}
        >
            <Box sx={{ width: '100%' }}>
                <CustomTextField
                    fullWidth
                    label='Descrição'
                    name='descricao'
                    id='descricao'
                    value={formik.values.descricao}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    helperText={formik.touched.descricao && formik.errors.descricao}
                    error={!!(formik.touched.descricao && formik.errors.descricao)}
                    required
                    InputProps={{
                        readOnly: props.action === 'view'
                    }}
                />
                <SelectCustom
                    id='categorias'
                    getOptionLabel={option => option.descricao || ''}
                    onInputChange={(event, newInputValue) => formik.setValues({
                        ...formik.values,
                        categoriaId: newInputValue
                    })}
                    options={categorias}
                    renderInput={params =>
                        <CustomTextField
                            {...params}
                            label='Selecione uma categoria'
                            required
                            helperText={formik.touched.categoriaId && formik.errors.categoriaId}
                            error={!!(formik.touched.categoriaId && formik.errors.categoriaId)}
                        />
                    }
                    readOnly={props.action === 'view'}
                    defaultValue={formik.values.categoria}
                />
                <CustomTextField
                    fullWidth
                    label='Referência'
                    name='referencia'
                    id='referencia'
                    value={formik.values.referencia}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    InputProps={{
                        readOnly: props.action === 'view'
                    }}
                />
                <CustomTextField
                    fullWidth
                    label='Especificação técnica'
                    name='especificacaoTecnica'
                    id='especificacaoTecnica'
                    value={formik.values.especificacaoTecnica}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    InputProps={{
                        readOnly: props.action === 'view'
                    }}
                />
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                        <SelectCustom
                            multiple
                            readOnly={props.action === 'view'}
                            id='tamanhos'
                            onChange={(e, newValue) => {
                                setTamanhosSelect(newValue.map((x) => x.id));
                            }}
                            getOptionLabel={option => option.descricao || ''}
                            options={tamanhos}
                            renderInput={params =>
                                <CustomTextField
                                    {...params}
                                    label='Selecione um tamanho'
                                />
                            }
                            defaultValue={formik.values.tamanhos}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <SelectCustom
                            multiple
                            readOnly={props.action === 'view'}
                            id='pesos'
                            getOptionLabel={option => option.descricao || ''}
                            onChange={(e, newValue) => {
                                setPesosSelect(newValue.map((x) => x.id));
                            }}
                            options={pesos}
                            renderInput={params =>
                                <CustomTextField
                                    {...params}
                                    label='Selecione um peso'
                                />
                            }
                            defaultValue={formik.values.pesos}
                        />
                    </Grid>
                </Grid>
                <Box width='100%' display='flex' alignItems='center' justifyContent='center' gap={10} flexDirection={!matches ? 'column' : undefined} sx={{ marginTop: 5 }}>
                    <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
                        <UploadImage
                            upload={(ft) => formik.setValues({
                                ...formik.values,
                                foto: ft
                            })}
                        />
                        <Typography>
                            Selecione uma imagem!
                        </Typography>
                    </Box>
                    <Box
                        component="img"
                        src={formik.values.foto}
                        sx={{ width: '200px', height: '200px', borderRadius: '5px' }}
                    />
                </Box>
            </Box>
        </Form >
    )
}