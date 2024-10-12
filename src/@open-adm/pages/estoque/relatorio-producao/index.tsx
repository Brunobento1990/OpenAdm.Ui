import { Box, Divider, Grid, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { DividerApp } from "src/@open-adm/components/divider";
import { DropDownMultiple } from "src/@open-adm/components/drop-down-scroll/dorp-down-multiple";
import { Form } from "src/@open-adm/components/form";
import { InputDate } from "src/@open-adm/components/input/input-date";
import { useNewApi } from "src/@open-adm/hooks/use-new-api";
import { generatePdfFromBase64 } from "src/@open-adm/utils/download-pdf";
import { formatMoney } from "src/@open-adm/utils/format-money";

export function RelatorioProducao() {
    const [loading, setLoading] = useState(false);
    const [pedidos, setPedidos] = useState<any[]>([]);
    const api = useNewApi({
        method: 'POST',
        url: 'itens-pedidos/producao/pdf',
        notAlert: true
    });

    async function submit() {
        setLoading(true);
        const response = await api.fecth<any>({
            body: {
                pedidosIds: pedidos?.map((x) => x?.id)
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
        <Form
            action="create"
            submit={submit}
            title="Relatório de produção"
            titleButton="Download"
            loading={loading}
        >
            <Grid container spacing={5}>
                <Grid item xs={12} sm={4}>
                    <DropDownMultiple
                        id="pedidoId"
                        label="Pedidos"
                        primeiraKey="numero"
                        segundaKey="usuario"
                        onChange={setPedidos}
                        url="pedidos/list-em-aberto"
                        retornarObjetoCompleto
                    />
                </Grid>
            </Grid>
            <DividerApp chip="Pedidos selecionados" />
            {pedidos.length > 0 &&
                <Box>
                    {pedidos.map((pedido) => (
                        <Box key={pedido.id}>
                            <Typography>Pedido: #{pedido.numero}</Typography>
                            <Typography>Quantidade de itens: {pedido.totalItens}</Typography>
                            <Typography>Valor total: {formatMoney(pedido.valorTotal)}</Typography>
                            <DividerApp />
                        </Box>
                    ))}
                    <DividerApp chip="Totalização" />
                    <Typography>Total de itens: {pedidos.reduce((a, b) => a + b.totalItens, 0)}</Typography>
                    <Typography>Valor total: {formatMoney(pedidos.reduce((a, b) => a + b.valorTotal, 0))}</Typography>
                </Box>
            }
        </Form>
    )
}