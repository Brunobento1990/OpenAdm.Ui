import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { DividerApp } from "src/@open-adm/components/divider";
import { DropDownMultiple } from "src/@open-adm/components/drop-down-scroll/dorp-down-multiple";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { useNewApi } from "src/@open-adm/hooks/use-new-api";
import { IRelatorioProducao } from "src/@open-adm/types/relatorio-producao";
import { generatePdfFromBase64 } from "src/@open-adm/utils/download-pdf";
import { formatMoney } from "src/@open-adm/utils/format-money";

export function RelatorioProducao() {
    const [loading, setLoading] = useState(false);
    const api = useNewApi({
        method: 'POST',
        url: 'itens-pedidos/producao/pdf',
        naoRenderizarResposta: true
    });
    const form = useFormikAdapter<IRelatorioProducao>({
        onSubmit: submit,
        initialValues: {},
    })

    async function submit() {
        setLoading(true);
        const response = await api.fecth<any>({
            body: {
                pedidosIds: form.values.pedidosIds?.map((x) => x.id) ?? [],
                produtosIds: form.values.produtosIds ?? [],
                pesosIds: form.values.pesosIds ?? [],
                tamanhosIds: form.values.tamanhosIds ?? []
            },
            message: 'Download efetuado com sucesso!'
        });
        if (response?.pdf) {
            const pdf = await generatePdfFromBase64(response.pdf);
            const link = document.createElement('a');
            link.href = pdf;
            link.download = `pedidos.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        setLoading(false);
    }

    return (
        <FormRoot.Form
            submit={submit}
            titulo="Relatório de produção"
            tituloBotaoSalvar="Download"
            loading={loading}
        >
            <Grid container spacing={5}>
                <Grid item xs={12} sm={4}>
                    <DropDownMultiple
                        id="pedidosIds"
                        label="Pedidos"
                        primeiraKey="numero"
                        segundaKey="usuario"
                        onChange={(values) => {
                            form.setValue({
                                pedidosIds: values
                            })
                        }}
                        url="pedidos/list-em-aberto"
                        retornarObjetoCompleto
                    />
                </Grid>
            </Grid>
            <Grid container spacing={5}>
                <Grid item xs={12} sm={4}>
                    <DropDownMultiple
                        id="produtoId"
                        label="Produtos"
                        primeiraKey="numero"
                        segundaKey="descricao"
                        onChange={(values) => {
                            form.setValue({
                                produtosIds: values
                            })
                        }}
                        url="produtos/all-list"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <DropDownMultiple
                        id="pesoId"
                        label="Pesos"
                        primeiraKey="numero"
                        segundaKey="descricao"
                        onChange={(values) => {
                            form.setValue({
                                pesosIds: values
                            })
                        }}
                        url="pesos/list"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <DropDownMultiple
                        id="tamanhoId"
                        label="Tamanhos"
                        primeiraKey="numero"
                        segundaKey="descricao"
                        onChange={(values) => {
                            form.setValue({
                                tamanhosIds: values
                            })
                        }}
                        url="tamanhos/list"
                    />
                </Grid>
            </Grid>
            <DividerApp chip="Pedidos selecionados" />
            {form.values.pedidosIds?.length > 0 &&
                <Box>
                    {form.values.pedidosIds.map((pedido) => (
                        <Box key={pedido.id}>
                            <Typography>Pedido: #{pedido.numero}</Typography>
                            <Typography>Quantidade de itens: {pedido.totalItens}</Typography>
                            <Typography>Valor total: {formatMoney(pedido.valorTotal)}</Typography>
                            <DividerApp />
                        </Box>
                    ))}
                    <DividerApp chip="Totalização" />
                    <Typography>Total de itens: {form.values.pedidosIds.reduce((a, b) => a + b.totalItens, 0)}</Typography>
                    <Typography>Valor total: {formatMoney(form.values.pedidosIds.reduce((a, b) => a + b.valorTotal, 0))}</Typography>
                </Box>
            }
        </FormRoot.Form>
    )
}
