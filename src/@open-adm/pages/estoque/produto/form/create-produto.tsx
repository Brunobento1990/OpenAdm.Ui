import { useFormik } from "formik";
import { useEffect, useState } from "react";
import CustomTextField from "src/@core/components/mui/text-field";
import { Form } from "src/@open-adm/components/form";
import SelectCustom from "src/@open-adm/components/select";
import { useApi } from "src/@open-adm/hooks/use-api";
import { ICategoria } from "src/@open-adm/types/categoria";
import { defaultValues, schema } from "../config";
import { ICreateProdutoDto } from "src/@open-adm/types/produto";
import { useRouter } from "next/router";
import { Box, Grid, Tab, Tabs, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ITamanho } from "src/@open-adm/types/tamanho";
import { IPeso } from "src/@open-adm/types/peso";
import { UploadImage } from "src/@open-adm/components/upload-image";
import { ITabelaDePreco } from "src/@open-adm/types/tabela-de-preco";
import { useSnackbar } from "src/@open-adm/components/snack";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export function CreateProduto() {

    const title = 'Adicionar novo produto';
    const [categorias, setCategorias] = useState<ICategoria[]>([]);
    const [pesos, setPesos] = useState<IPeso[]>([]);
    const [tabelaDePreco, setTabelaDePreco] = useState<ITabelaDePreco[]>([]);
    const [pesosSelect, setPesosSelect] = useState<string[]>([]);
    const [tamanhosSelect, setTamanhosSelect] = useState<string[]>([]);
    const [tamanhos, setTamanhos] = useState<ITamanho[]>([]);
    const { get, post } = useApi();
    const router = useRouter();
    const snack = useSnackbar();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [value, setValue] = useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema: schema,
        onSubmit: (values) => onSubmit(values),
    });

    function handleVinculoPrecoProdutoPorPesoVarejo(pesoId: string, valorUnitarioVarejo?: number) {

        let newValorUnitarioVarejo: number | undefined = 0;

        if (valorUnitarioVarejo && isNaN(valorUnitarioVarejo)) {
            newValorUnitarioVarejo = undefined;
        } else {
            newValorUnitarioVarejo = valorUnitarioVarejo;
        }

        let newItens = formik.values.vinculoProdutoTabelaDePreco.itens;

        if (!Array.isArray(newItens)) {
            newItens = [];
        }

        const index = newItens.findIndex((x) => x.pesoId === pesoId);

        if (index === -1) {
            newItens.push({
                pesoId,
                valorUnitarioVarejo: newValorUnitarioVarejo
            })
        } else {
            if (newItens[index].valorUnitarioVarejo !== undefined) {
                newItens[index].valorUnitarioVarejo = newValorUnitarioVarejo
            } else {
                newItens[index].valorUnitarioVarejo = newValorUnitarioVarejo
            }
        }

        formik.setValues({
            ...formik.values,
            vinculoProdutoTabelaDePreco: {
                ...formik.values.vinculoProdutoTabelaDePreco,
                itens: [...newItens]
            }
        })
    }

    function handleVinculoPrecoProdutoPorTamanhoVarejo(tamanhoId: string, valorUnitarioVarejo?: number) {

        let newValorUnitarioVarejo: number | undefined = 0;

        if (valorUnitarioVarejo && isNaN(valorUnitarioVarejo)) {
            newValorUnitarioVarejo = undefined;
        } else {
            newValorUnitarioVarejo = valorUnitarioVarejo;
        }

        let newItens = formik.values.vinculoProdutoTabelaDePreco.itens;

        if (!Array.isArray(newItens)) {
            newItens = [];
        }

        const index = newItens.findIndex((x) => x.tamanhoId === tamanhoId);

        if (index === -1) {
            newItens.push({
                tamanhoId,
                valorUnitarioVarejo: newValorUnitarioVarejo
            })
        } else {
            if (newItens[index].valorUnitarioVarejo !== undefined) {
                newItens[index].valorUnitarioVarejo = newValorUnitarioVarejo
            } else {
                newItens[index].valorUnitarioVarejo = newValorUnitarioVarejo
            }
        }

        formik.setValues({
            ...formik.values,
            vinculoProdutoTabelaDePreco: {
                ...formik.values.vinculoProdutoTabelaDePreco,
                itens: [...newItens]
            }
        })
    }

    function handleVinculoPrecoProdutoPorPesoAtacado(pesoId: string, valorUnitarioAtacado?: number) {

        let newValorUnitarioAtacado: number | undefined = 0;

        if (valorUnitarioAtacado && isNaN(valorUnitarioAtacado)) {
            newValorUnitarioAtacado = undefined;
        } else {
            newValorUnitarioAtacado = valorUnitarioAtacado;
        }

        let newItens = formik.values.vinculoProdutoTabelaDePreco.itens;

        if (!Array.isArray(newItens)) {
            newItens = [];
        }

        const index = newItens.findIndex((x) => x.pesoId === pesoId);

        if (index === -1) {
            newItens.push({
                pesoId,
                valorUnitarioAtacado: newValorUnitarioAtacado
            })
        } else {
            if (newItens[index].valorUnitarioAtacado !== undefined) {
                newItens[index].valorUnitarioAtacado = newValorUnitarioAtacado
            } else {
                newItens[index].valorUnitarioAtacado = newValorUnitarioAtacado
            }
        }

        formik.setValues({
            ...formik.values,
            vinculoProdutoTabelaDePreco: {
                ...formik.values.vinculoProdutoTabelaDePreco,
                itens: [...newItens]
            }
        })
    }

    function handleVinculoPrecoProdutoPorTamanhoAtacado(tamanhoId: string, valorUnitarioAtacado?: number) {

        let newValorUnitarioAtacado: number | undefined = 0;

        if (valorUnitarioAtacado && isNaN(valorUnitarioAtacado)) {
            newValorUnitarioAtacado = undefined;
        } else {
            newValorUnitarioAtacado = valorUnitarioAtacado;
        }

        let newItens = formik.values.vinculoProdutoTabelaDePreco.itens;

        if (!Array.isArray(newItens)) {
            newItens = [];
        }

        const index = newItens.findIndex((x) => x.tamanhoId === tamanhoId);

        if (index === -1) {
            newItens.push({
                tamanhoId,
                valorUnitarioAtacado: newValorUnitarioAtacado
            })
        } else {
            if (newItens[index].valorUnitarioAtacado !== undefined) {
                newItens[index].valorUnitarioAtacado = newValorUnitarioAtacado
            } else {
                newItens[index].valorUnitarioAtacado = newValorUnitarioAtacado
            }
        }

        formik.setValues({
            ...formik.values,
            vinculoProdutoTabelaDePreco: {
                ...formik.values.vinculoProdutoTabelaDePreco,
                itens: [...newItens]
            }
        })
    }

    async function onSubmit(values: ICreateProdutoDto) {
        try {

            if (!values.vinculoProdutoTabelaDePreco.tabelaDePrecoId) {
                snack.show('Na aba "Venda", informe os preços dos produtos!');
                return;
            }

            const index = values.foto.indexOf(',') + 1;
            const newFoto = values.foto.slice(index);

            const body = {
                descricao: values.descricao,
                referencia: values.referencia,
                especificacaoTecnica: values.especificacaoTecnica,
                foto: newFoto,
                categoriaId: categorias.find((x) => x.descricao === values.categoriaId)?.id,
                tamanhosIds: tamanhosSelect,
                pesosIds: pesosSelect,
                vinculoProdutoTabelaDePreco: values.vinculoProdutoTabelaDePreco
            }
            await post('produtos/create', body)

            router.replace('/estoque/produto')
        } catch (error) {

        }
    }

    async function init() {
        try {
            const [categoriasResponse, pesosResponse, tamanhosResponse, tabelasDePrecosResponse] =
                await Promise.all([get<ICategoria[]>('categorias/list'), get<IPeso[]>('pesos/list'), get<ITamanho[]>('tamanhos/list'), get<ITabelaDePreco[]>('tabelas-de-precos/list')]);

            if (tamanhosResponse) {
                setTamanhos(tamanhosResponse);
            }
            if (pesosResponse) {
                setPesos(pesosResponse);
            }
            if (categoriasResponse) {
                setCategorias(categoriasResponse);
            }
            if (tabelasDePrecosResponse) {
                setTabelaDePreco(tabelasDePrecosResponse);
            }
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
            action={'create'}
            submit={formik.handleSubmit}
            title={title}
            urlVoltar="/estoque/produto"
            gap={2}
        >
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Cadastro" {...a11yProps(0)} />
                        <Tab label="Venda" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
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
                    />
                    <CustomTextField
                        fullWidth
                        label='Especificação técnica'
                        name='especificacaoTecnica'
                        id='especificacaoTecnica'
                        value={formik.values.especificacaoTecnica}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                            <SelectCustom
                                multiple
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
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column' gap='10px'>
                        <SelectCustom
                            fullWidth
                            id='tabelasDePrecos'
                            getOptionLabel={option => option.descricao || ''}
                            onInputChange={(event, newInputValue) => formik.setValues({
                                ...formik.values,
                                vinculoProdutoTabelaDePreco: {
                                    tabelaDePrecoId: tabelaDePreco.find((x) => x.descricao === newInputValue)?.id ?? '',
                                    itens: formik.values?.vinculoProdutoTabelaDePreco?.itens ?? []
                                }
                            })}
                            options={tabelaDePreco}
                            renderInput={params =>
                                <CustomTextField
                                    {...params}
                                    label='Selecione uma tabela de preço'
                                />
                            }
                        />
                        {tamanhos && tamanhos?.length > 0 &&
                            <Typography variant="h3">
                                Tamanhos
                            </Typography>
                        }
                        {tamanhos && tamanhos?.map((tamanho, index) => (
                            <Box display='flex' alignItems='center' justifyContent='center' gap='10px'>
                                <Typography>
                                    {tamanho.descricao}
                                </Typography>
                                <CustomTextField
                                    label='Vlr un atacado'
                                    name={tamanho.descricao}
                                    id={tamanho.descricao}
                                    value={formik.values.vinculoProdutoTabelaDePreco.itens.find((x) => x.tamanhoId === tamanho.id)?.valorUnitarioAtacado}
                                    onChange={(e) =>
                                        handleVinculoPrecoProdutoPorTamanhoAtacado(
                                            tamanho.id,
                                            parseFloat(e.target.value))
                                    }
                                    type="number"
                                    inputProps={{
                                        step: "2"
                                    }}
                                />
                                <CustomTextField
                                    label='Vlr un varejo'
                                    name={tamanho.descricao + index}
                                    id={tamanho.descricao + index}
                                    value={formik.values.vinculoProdutoTabelaDePreco.itens.find((x) => x.tamanhoId === tamanho.id)?.valorUnitarioVarejo}
                                    onChange={(e) =>
                                        handleVinculoPrecoProdutoPorTamanhoVarejo(
                                            tamanho.id,
                                            parseFloat(e.target.value)
                                        )
                                    }
                                    type="number"
                                    inputProps={{
                                        step: "2"
                                    }}
                                />
                            </Box>
                        ))}
                        {pesos && pesos?.length > 0 &&
                            <Typography variant="h3">
                                Pesos
                            </Typography>
                        }
                        {pesos?.map((peso, index) => (
                            <Box display='flex' alignItems='center' justifyContent='center' gap='10px'>
                                <Typography>
                                    {peso.descricao}
                                </Typography>
                                <CustomTextField
                                    label='Vlr un atacado'
                                    name={peso.descricao}
                                    id={peso.descricao}
                                    value={formik.values.vinculoProdutoTabelaDePreco.itens.find((x) => x.pesoId === peso.id)?.valorUnitarioAtacado}
                                    onChange={(e) =>
                                        handleVinculoPrecoProdutoPorPesoAtacado(
                                            peso.id,
                                            parseFloat(e.target.value))}
                                    inputProps={{
                                        step: "2"
                                    }}
                                    type="number"
                                />
                                <CustomTextField
                                    label='Vlr un varejo'
                                    name={peso.descricao + index}
                                    id={peso.descricao + index}
                                    value={formik.values.vinculoProdutoTabelaDePreco.itens.find((x) => x.pesoId === peso.id)?.valorUnitarioVarejo}
                                    onChange={(e) =>
                                        handleVinculoPrecoProdutoPorPesoVarejo(
                                            peso.id,
                                            parseFloat(e.target.value))}
                                    type="number"
                                    inputProps={{
                                        step: "2"
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                </CustomTabPanel>
            </Box>
        </Form >
    )
}