import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter"
import { Form } from "src/@open-adm/components/form"
import { IItemPedidoCreate, IPedidoCreate } from "src/@open-adm/types/pedido"
import { config, initialValues, schema } from "./config"
import { FormRow } from "src/@open-adm/components/form/row"
import { FormItemRow } from "src/@open-adm/components/form/item-row"
import { DropDownScroll } from "src/@open-adm/components/drop-down-scroll"
import { BoxApp } from "src/@open-adm/components/box"
import { DividerApp } from "src/@open-adm/components/divider"
import { useApiTabelaDePreco } from "src/@open-adm/api/UseApiTabelaDePreco"
import { useEffect, useMemo, useState } from "react"
import { InputCustom, MaskType } from "src/@open-adm/components/input"
import { Button } from "@mui/material"
import { TablePaginacao } from "src/@open-adm/components/table-paginacao/table"
import { useSnackbar } from "src/@open-adm/components/snack"
import { cleanFormatMoney, formatMoney } from "src/@open-adm/utils/format-money"
import { removerItemDeArrayPorIndex } from "src/@open-adm/utils/RemoverItemArrayPorIndex"
import { useApiPedido } from "src/@open-adm/api/UseApiPedido"
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app"
import { TextApp } from "src/@open-adm/components/text"

export function PedidoCreate() {
    const urlVoltar = '/pedidos'
    const [item, setItem] = useState<IItemPedidoCreate>()
    const [loading, setLoading] = useState(false)
    const { tabelaDePrecoEcommerce } = useApiTabelaDePreco()
    const { criarPedido } = useApiPedido()
    const { navigate } = useNavigateApp()
    const { show } = useSnackbar()
    const form = useFormikAdapter<IPedidoCreate>({
        onSubmit: submit,
        initialValues,
        validationSchema: schema
    })

    const total = useMemo(() => form
        .values
        .itens
        .reduce((valor, item) => valor + (item.valorUnitario * (item.quantidade ?? 0)), 0)
        , [form.values.itens])

    const { coluns } = config({
        remove: (i) => {
            console.log(i)
            form.setValue({
                itens: removerItemDeArrayPorIndex(i, form.values.itens)
            })
        }
    })

    async function init() {
        const response = await tabelaDePrecoEcommerce()
        if (response) {
            form.setValue({
                tabelaDePreco: response,
                tabelaDePrecoId: response.id
            })
        }
    }

    function addItem() {
        if (!item) {
            return;
        }

        if (!item?.quantidade) {
            show('Informe a quantidade', 'error')
            return;
        }
        const valor = cleanFormatMoney(item?.valorUnitario)
        if (!valor) {
            show('Informe o valor', 'error')
            return;
        }

        form.setValue({
            itens: [...form.values.itens, item]
        })

        setItem(undefined)
    }

    function obterValorUnitario(produtoId?: string, pesoId?: string, tamanhoId?: string) {
        const itemTabelaDePreco = form
            .values
            .tabelaDePreco?.
            itensTabelaDePreco?.
            find((x) =>
                x.tamanhoId === tamanhoId &&
                x.pesoId === pesoId &&
                x.produtoId === produtoId);

        return form.values.usuario?.isAtacado ? itemTabelaDePreco?.valorUnitarioAtacado : itemTabelaDePreco?.valorUnitarioVarejo;
    }

    async function submit() {
        if (!form.values.itens || form.values.itens.length === 0) {
            show('Adicione os itens ao pedido', 'error')
            return;
        }
        setLoading(true)
        const response = await criarPedido(form.values)
        if (response?.result) {
            navigate(urlVoltar);
            return;
        }
        setLoading(false)
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <Form
            action="create"
            title="Novo pedido"
            submit={form.onSubmit}
            urlVoltar={urlVoltar}
            loading={loading}
        >
            {total > 0 ?
                <BoxApp>
                    <TextApp fontWeight={600} fontSize="16px" texto={`Total: ${formatMoney(total)}`} />
                </BoxApp>
                :
                <BoxApp>
                    <TextApp texto="Adicione os itens no pedido" color="red" />
                </BoxApp>
            }
            <FormRow spacing={3}>
                <FormItemRow sm={6} xs={12}>
                    <DropDownScroll
                        width="100%"
                        id="usuarioId"
                        keyLabel="nome"
                        label="Cliente"
                        url="/usuarios/paginacao"
                        error={form.error('usuarioId')}
                        helperText={form.helperText('usuarioId')}
                        onChange={form.onChange}
                    />
                </FormItemRow>
                <FormItemRow sm={6} xs={12}>
                    <DropDownScroll
                        width="100%"
                        id="tabelaDePrecoId"
                        keyLabel="descricao"
                        label="Tabela de preço"
                        url="/tabelas-de-precos/paginacao"
                        error={form.error('tabelaDePrecoId')}
                        value={form.values.tabelaDePreco}
                        helperText={form.helperText('tabelaDePrecoId')}
                        onChange={(_, value) => {
                            form.setValue({
                                tabelaDePreco: value,
                                tabelaDePrecoId: value?.id
                            })
                        }}
                        retornarObjetoCompleto
                    />
                </FormItemRow>
            </FormRow>
            <BoxApp marginTop="1rem">
                <DividerApp color="primary" chip="Adicionar item" />
                <FormRow spacing={3}>
                    <FormItemRow sm={4} xs={12}>
                        <DropDownScroll
                            width="100%"
                            id="produtoId"
                            keyLabel="descricao"
                            label="Produto"
                            url="/produtos/paginacao"
                            retornarObjetoCompleto
                            onChange={(_, value) => {
                                setItem({
                                    ...item,
                                    produto: value,
                                    produtoId: value?.id,
                                    valorUnitario: obterValorUnitario(value?.id, item?.pesoId, item?.tamanhoId)
                                } as any)
                            }}
                            value={item?.produto}
                        />
                    </FormItemRow>
                    <FormItemRow sm={4} xs={12}>
                        <DropDownScroll
                            width="100%"
                            id="pesoId"
                            keyLabel="descricao"
                            label="Peso"
                            url="/pesos/paginacao"
                            retornarObjetoCompleto
                            onChange={(_, value) => {
                                setItem({
                                    ...item,
                                    peso: value,
                                    pesoId: value?.id,
                                    valorUnitario: obterValorUnitario(item?.produtoId, value?.id, item?.tamanhoId)
                                } as any)
                            }}
                            value={item?.peso}
                        />
                    </FormItemRow>
                    <FormItemRow sm={4} xs={12}>
                        <DropDownScroll
                            width="100%"
                            id="tamanhoId"
                            keyLabel="descricao"
                            label="Tamanho"
                            url="/tamanhos/paginacao"
                            retornarObjetoCompleto
                            onChange={(_, value) => {
                                setItem({
                                    ...item,
                                    tamanho: value,
                                    tamanhoId: value?.id,
                                    valorUnitario: obterValorUnitario(item?.produtoId, item?.pesoId, value?.id)
                                } as any)
                            }}
                            value={item?.tamanho}
                        />
                    </FormItemRow>
                </FormRow>
                <FormRow spacing={3}>
                    <FormItemRow sm={4} xs={12}>
                        <InputCustom
                            fullWidth
                            id="quantidade"
                            label="Quantidade"
                            name="quantidade"
                            onChange={(_, value) => {
                                setItem({
                                    ...item,
                                    quantidade: typeof value === 'string' ? parseFloat(value) : value,
                                } as any)
                            }}
                            value={item?.quantidade ?? ''}
                            type='number'
                        />
                    </FormItemRow>
                    <FormItemRow sm={4} xs={12}>
                        <InputCustom
                            fullWidth
                            id="preco"
                            label="Preço"
                            name="preco"
                            onChange={(_, value) => {
                                setItem({
                                    ...item,
                                    valorUnitario: value,
                                } as any)
                            }}
                            value={item?.valorUnitario}
                            mask={MaskType.MONEY}
                        />
                    </FormItemRow>
                    <FormItemRow sm={4} xs={12}>
                        <BoxApp
                            display="flex"
                            alignItems="center"
                            height="100%"
                            justifyContent="center"
                        >
                            <Button variant="contained" onClick={addItem} sx={{ marginTop: '1rem' }}>
                                Adicionar item
                            </Button>
                        </BoxApp>
                    </FormItemRow>
                </FormRow>
            </BoxApp>
            <BoxApp marginTop="1rem">
                <DividerApp color="primary" chip="Itens" />
            </BoxApp>
            <TablePaginacao
                marginTop="1rem"
                columns={coluns}
                rows={form.values.itens}
            />
        </Form>
    )
}