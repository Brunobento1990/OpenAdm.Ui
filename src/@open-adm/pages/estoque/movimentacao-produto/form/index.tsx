import { useFormik } from "formik";
import { defaultValues, schema } from "../config";
import { IMovimentacaoDeProduto } from "src/@open-adm/types/estoque";
import { Form } from "src/@open-adm/components/form";
import { useEffect, useState } from "react";
import { IProduto } from "src/@open-adm/types/produto";
import { useApi } from "src/@open-adm/hooks/use-api";
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from "@mui/material";
import SelectCustom from "src/@open-adm/components/select";
import CustomTextField from "src/@core/components/mui/text-field";
import { useRouter } from "next/router";
import { IPeso } from "src/@open-adm/types/peso";
import { ITamanho } from "src/@open-adm/types/tamanho";

export function MovimentacaoDeProdutoForm() {

    const [produtos, setProdutos] = useState<IProduto[]>([]);
    const [pesos, setPesos] = useState<IPeso[]>([]);
    const [tamanhos, setTamanhos] = useState<ITamanho[]>([]);
    const { get, put } = useApi<any>();
    const router = useRouter();

    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema: schema,
        onSubmit: (values) => onSubmit(values),
    });

    async function onSubmit(values: IMovimentacaoDeProduto) {
        await put('estoques/movimentar-estoque', values);
        router.replace('/estoque/movimentacao-produto')
    }

    async function init() {
        const [responseProdutos, responsePesos, responseTamanhos] = await
            Promise.all([get('produtos/all-list'), get('pesos/list'), get('tamanhos/list')]);
        if (responseProdutos) {
            setProdutos(responseProdutos)
        }

        if (responsePesos) {
            setPesos(responsePesos)
        }

        if (responseTamanhos) {
            setTamanhos(responseTamanhos)
        }
    }

    useEffect(() => {
        init();
    }, [])

    if (produtos.length === 0)
        return (<></>)

    return (
        <Form
            action="create"
            submit={formik.submitForm}
            title="Movimentar produto"
            urlVoltar="/estoque/movimentacao-produto"
        >
            <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                    <SelectCustom
                        id='produtos'
                        getOptionLabel={option => option.descricao || ''}
                        onInputChange={(event, newInputValue) => formik.setValues({
                            ...formik.values,
                            produtoId: produtos.find((x) => x.descricao === newInputValue)?.id ?? ''
                        })}
                        options={produtos}
                        renderInput={params =>
                            <CustomTextField
                                {...params}
                                label='Selecione um produto'
                                required
                                helperText={formik.touched.produtoId && formik.errors.produtoId}
                                error={!!(formik.touched.produtoId && formik.errors.produtoId)}
                            />
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        fullWidth
                        label='Quantidade'
                        name='quantidade'
                        id='quantidade'
                        value={formik.values.quantidade}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="number"
                        helperText={formik.touched.quantidade && formik.errors.quantidade}
                        error={!!(formik.touched.quantidade && formik.errors.quantidade)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SelectCustom
                        id='pesos'
                        getOptionLabel={option => option.descricao || ''}
                        onInputChange={(event, newInputValue) => formik.setValues({
                            ...formik.values,
                            pesoId: pesos.find((x) => x.descricao === newInputValue)?.id ?? ''
                        })}
                        options={pesos}
                        renderInput={params =>
                            <CustomTextField
                                {...params}
                                label='Selecione um peso'
                            />
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <SelectCustom
                        id='tamanhos'
                        getOptionLabel={option => option.descricao || ''}
                        onInputChange={(event, newInputValue) => formik.setValues({
                            ...formik.values,
                            tamanhoId: tamanhos.find((x) => x.descricao === newInputValue)?.id ?? ''
                        })}
                        options={tamanhos}
                        renderInput={params =>
                            <CustomTextField
                                {...params}
                                label='Selecione um tamanho'
                            />
                        }
                    />
                </Grid>
                <Grid item xs={12} sx={{ padding: 5 }}>
                    <FormControl>
                        <FormLabel component='legend'>Tipo de movimentação</FormLabel>
                        <RadioGroup aria-label='status' name='status' row value={formik.values.tipoMovimentacaoDeProduto} onChange={(e) => formik.setValues({ ...formik.values, tipoMovimentacaoDeProduto: parseInt(e.target.value) })}>
                            <FormControlLabel value='0' control={<Radio />} label='Entrada' />
                            <FormControlLabel value='1' control={<Radio />} label='Saída' />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </Form>
    )
}