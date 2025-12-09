import { Grid } from "@mui/material";
import { useState } from "react";
import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { DividerApp } from "src/@open-adm/components/divider";
import { DropDownMultiple } from "src/@open-adm/components/drop-down-scroll/dorp-down-multiple";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { TabelaComDrag } from "src/@open-adm/components/table/tabela-com-drag";
import { useNewApi } from "src/@open-adm/hooks/use-new-api";
import { IRelatorioPosicaoEstoqueRequest, IRelatorioPosicaoEstoqueResponse } from "src/@open-adm/types/relatorio-posicao-estoque";
import { formatDateComHoras } from "src/@open-adm/utils/convert-date";
import { quantidade } from "../posicao-estoque/config";
import CustomChip from 'src/@open-adm/components/chip'
import { BoxApp } from "src/@open-adm/components/box";
import { ButtonApp } from "src/@open-adm/components/buttons";
import { useArquivo } from "src/@open-adm/hooks/use-arquivo";
import { gerarHtmlRelatorioPosicaoEstoque } from "./template-html";

export function RelatorioPosicaoEstoque() {
    const [resultado, setResultado] = useState<IRelatorioPosicaoEstoqueResponse>()
    const { gerarPdfHtml } = useArquivo()
    const api = useNewApi({
        method: 'POST',
        url: 'estoques/posicao-estoque-relatorio',
        naoRenderizarResposta: true
    });

    const form = useFormikAdapter<IRelatorioPosicaoEstoqueRequest>({
        initialValues: {
            produtos: [],
            pesos: [],
            tamanhos: [],
            categorias: []
        },
        onSubmit: submit,
    })

    async function submit() {
        const response = await api.fecth<IRelatorioPosicaoEstoqueResponse>({
            body: form.values,
            message: 'Download efetuado com sucesso!'
        });
        setResultado(response);
    }

    async function imprimir() {
        const html = gerarHtmlRelatorioPosicaoEstoque(resultado?.itens || []);
        await gerarPdfHtml(html, 'Relatório de Posição de Estoque');
    }

    return (
        <FormRoot.Form
            submit={form.onSubmit}
            tituloBotaoSalvar="Download"
            loading={api.statusRequisicao === "loading"}
            titulo="Relatório de estoque"
            footer={{
                children: (
                    <BoxApp>
                        <ButtonApp onClick={imprimir} title="Imprimir" variant="outlined" disabled={!resultado || !resultado.itens || resultado.itens.length === 0} />
                    </BoxApp>
                )
            }}
        >
            <DividerApp chip="Filtros" />
            <Grid container spacing={5}>
                <Grid item xs={12} sm={4}>
                    <DropDownMultiple
                        id="produtoId"
                        label="Produtos"
                        primeiraKey="numero"
                        segundaKey="descricao"
                        onChange={(produtos) => form.setValue({ produtos })}
                        url="produtos/all-list"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <DropDownMultiple
                        id="categoriasId"
                        label="Categorias"
                        primeiraKey="numero"
                        segundaKey="descricao"
                        onChange={(categorias) => form.setValue({ categorias })}
                        url="categorias/list-drop-down"
                        method="GET"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <DropDownMultiple
                        id="pesoId"
                        label="Pesos"
                        primeiraKey="numero"
                        segundaKey="descricao"
                        onChange={(pesos) => form.setValue({ pesos })}
                        url="pesos/list"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <DropDownMultiple
                        id="tamanhoId"
                        label="Tamanhos"
                        primeiraKey="numero"
                        segundaKey="descricao"
                        onChange={(tamanhos) => form.setValue({ tamanhos })}
                        url="tamanhos/list"
                    />
                </Grid>
            </Grid>
            <DividerApp chip="Produtos" marginBotton="1rem" />
            <TabelaComDrag columns={[{
                field: 'produto',
                headerName: 'Produto',
                width: 200
            },
            {
                field: 'peso',
                headerName: 'Peso',
                width: 100
            },
            {
                width: 100,
                field: 'tamanho',
                headerName: 'Tamanho',
            },
            {
                width: 200,
                field: 'quantidade',
                headerName: 'Posição do estoque',
                cellRenderer: (params: { data: any }) => {
                    const status = quantidade[params.data.quantidade > 0 ? 1 : 0]

                    return (
                        <CustomChip
                            rounded
                            size='small'
                            skin='light'
                            color={status.color}
                            label={params.data.quantidade}
                            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                        />
                    )
                }
            },
            {
                width: 200,
                field: 'quantidadeDisponivel',
                headerName: 'Qtd. disponível',
                cellRenderer: (params: { data: any }) => {
                    const status = quantidade[params.data.quantidadeDisponivel > 0 ? 1 : 0]

                    return (
                        <CustomChip
                            rounded
                            size='small'
                            skin='light'
                            color={status.color}
                            label={params.data.quantidadeDisponivel}
                            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                        />
                    )
                }
            },
            {
                field: 'quantidadeReservada',
                headerName: 'Qtd. reservada',
                cellRenderer: (params: { data: any }) => {
                    const status = quantidade[params.data.quantidadeReservada > 0 ? 1 : 0]

                    return (
                        <CustomChip
                            rounded
                            size='small'
                            skin='light'
                            color={status.color}
                            label={params.data.quantidadeReservada}
                            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                        />
                    )
                }
            },
            {
                field: 'dataDeAtualizacao',
                headerName: 'Ultima movimentação',
                cellRenderer: (params: { data: any }) => {
                    return formatDateComHoras(params.data.dataDeAtualizacao);
                }
            }]} height={'500px'} rows={resultado?.itens || []} />
        </FormRoot.Form>
    )
}