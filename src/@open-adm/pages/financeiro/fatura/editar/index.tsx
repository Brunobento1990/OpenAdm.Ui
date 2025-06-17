import { Button, IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import IconifyIcon from "src/@core/components/icon";
import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { useApiFatura } from "src/@open-adm/api/use-api-fatura";
import { BoxApp } from "src/@open-adm/components/box";
import { DividerApp } from "src/@open-adm/components/divider";
import { DropDown } from "src/@open-adm/components/drop-down";
import { FormApp } from "src/@open-adm/components/form";
import { GridApp, GridItemApp } from "src/@open-adm/components/grid";
import { InputCustom, MaskType } from "src/@open-adm/components/input";
import { LoadingAppTexto } from "src/@open-adm/components/loading/loading-app-texto";
import { TextApp } from "src/@open-adm/components/text";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app"
import { useNewApi } from "src/@open-adm/hooks/use-new-api";
import { StatusObj } from "src/@open-adm/pages/pedidos/config";
import { meiosDePagamentos } from "src/@open-adm/types/contas-a-receber";
import { IFatura, IParcela } from "src/@open-adm/types/fatura";
import { formatDate } from "src/@open-adm/utils/convert-date";
import { cleanFormatMoney, formatMoney } from "src/@open-adm/utils/format-money";

export const statusFatura: StatusObj = {
    0: { title: 'Aberta', color: 'warning' },
    1: { title: 'Paga parcialmente', color: 'info' },
    2: { title: 'Paga', color: 'success' }
}

export function EditarFatura() {
    const { editarParcela, getFatura, adicionarParcela, excluirFatura } = useApiFatura();
    const { id } = useNavigateApp();
    const form = useFormikAdapter<IFatura>({
        onSubmit: () => console.log(''),
        initialValues: {
            parcelas: []
        }
    })
    const [parcelaEditando, setParcelaEditando] = useState<IParcela>();
    const [parcelaAdicionando, setParcelaAdicionando] = useState<IParcela>();
    const [loading, setLoading] = useState(false)
    const [loadingEditParcela, setLoadingEditParcela] = useState(false)
    const [excluindoParcela, setExcluindoParcela] = useState(false)

    async function init() {
        setLoading(true)
        const response = await getFatura(id ?? '');
        if (response) {
            form.setValue(response)
        }
        setLoading(false)
    }

    async function editarParcelaLocal() {
        setLoadingEditParcela(true);
        const response = await editarParcela(parcelaEditando as any);
        if (response) {
            setParcelaEditando(undefined);
            form.setValue({
                parcelas: [...form.values.parcelas.map((x) => x.id === response.id ? response : x)]
            })
        }
        setLoadingEditParcela(false);
    }

    function adicionarParcelaLocal() {
        const novaParcela = {
            faturaId: form.values.id,
            dataDeVencimento: undefined,
            numeroDaParcela: form.values.parcelas.length + 1,
            valor: 0
        }
        setParcelaAdicionando(novaParcela as any)
    }

    async function adiconarNovaParcela() {
        if (parcelaAdicionando) {
            setLoadingEditParcela(true);
            const response = await adicionarParcela({
                ...parcelaAdicionando,
                valor: cleanFormatMoney(parcelaAdicionando.valor) ?? 0,
                desconto: cleanFormatMoney(parcelaAdicionando.desconto) ?? 0
            });
            if (response) {
                form.setValue({
                    parcelas: [...form.values.parcelas, response]
                })
                setParcelaAdicionando(undefined)
            }
            setLoadingEditParcela(false);
        }
    }

    async function excluir(id: string) {
        setExcluindoParcela(true);
        const response = await excluirFatura(id);
        if (response?.result) {
            form.setValue({
                parcelas: [form.values.parcelas.filter((x) => x.id !== id)] as any
            })
        }
        setExcluindoParcela(false);

    }

    useEffect(() => {
        init()
    }, [])

    return (
        <FormApp
            titulo="Editar fatura"
            loading={loading}
            submit={form.onSubmit}
        >
            <BoxApp>
                <TextApp texto={`Fatura: #${form.values.numero}`} />
                <TextApp texto={`Cliente: ${form.values.usuario?.nome ?? ''}`} />
                <TextApp texto={`Status: ${statusFatura[form.values.status]?.title ?? ''}`} />
                {form.values.pedido &&
                    <TextApp texto={`Pedido: #${form.values.pedido.numero ?? ''}`} />
                }
                <TextApp texto={`Total: ${formatMoney(form.values.total) ?? ''}`} />
                <Button onClick={adicionarParcelaLocal} variant="contained" sx={{ marginTop: '1rem' }} >Nova parcela</Button>
                <DividerApp chip="Parcelas" />
                {form.values.parcelas?.map((parcela) => (
                    <>
                        {parcela.id === parcelaEditando?.id && parcelaEditando ? (
                            <EditarParcela
                                loading={loadingEditParcela}
                                editar={editarParcelaLocal}
                                setParcela={setParcelaEditando}
                                parcela={parcelaEditando}
                                cancelar={() => setParcelaEditando(undefined)}
                            />
                        ) :
                            <GridApp spacing={3} key={parcela.numeroDaParcela} marginTop="1rem">
                                <GridItemApp xs={12} sm={1}>
                                    <TextApp texto={`Parcela: ${parcela.numeroDaParcela}`} />
                                </GridItemApp>
                                <GridItemApp xs={12} sm={2}>
                                    <TextApp texto={`Vencimento: ${formatDate(parcela.dataDeVencimento) ?? ''}`} />
                                </GridItemApp>
                                <GridItemApp xs={12} sm={3}>
                                    <TextApp texto={`Meio de pagamento: ${meiosDePagamentos.find((x) => x.id === parcela.meioDePagamento)?.descricao ?? ''}`} />
                                </GridItemApp>
                                <GridItemApp xs={12} sm={3}>
                                    <TextApp texto={`Valor: ${formatMoney(parcela.valor)}`} />
                                </GridItemApp>
                                {excluindoParcela ? (
                                    <LoadingAppTexto />
                                ) : (
                                    <GridItemApp xs={12} sm={3}>
                                        <Tooltip title="Editar fatura" placement="top">
                                            <IconButton onClick={() => setParcelaEditando(parcela)}>
                                                <IconifyIcon
                                                    icon='ep:edit'
                                                />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Excluir fatura" placement="top">
                                            <IconButton onClick={async () => await excluir(parcela.id ?? '')}>
                                                <IconifyIcon
                                                    icon='ph:trash'
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </GridItemApp>
                                )}
                            </GridApp>
                        }
                    </>
                ))}
                {parcelaAdicionando &&
                    <EditarParcela
                        loading={loadingEditParcela}
                        editar={adiconarNovaParcela}
                        setParcela={setParcelaAdicionando}
                        parcela={parcelaAdicionando}
                        cancelar={() => setParcelaAdicionando(undefined)}
                    />
                }
            </BoxApp>
        </FormApp>
    )
}

interface propsEditarParcela {
    parcela: IParcela;
    cancelar: () => void;
    editar: () => void;
    setParcela: (parcela: IParcela) => void;
    loading: boolean;
}

function EditarParcela(props: propsEditarParcela) {
    return (
        <GridApp spacing={3} marginTop="1rem">
            <GridItemApp xs={12} sm={1}>
                <BoxApp display="flex" alignItems="center" justifyContent="center" height="100%">
                    <TextApp texto={`Parcela: ${props.parcela.numeroDaParcela}`} />
                </BoxApp>
            </GridItemApp>
            <GridItemApp xs={12} sm={2}>
                <InputCustom
                    fullWidth
                    id={`vencimento`}
                    label={"Vencimento"}
                    onChange={(_, value) => props.setParcela({
                        ...props.parcela,
                        dataDeVencimento: value,
                    })}
                    name={`vencimento`}
                    value={props.parcela.dataDeVencimento}
                    type="date"
                />
            </GridItemApp>
            <GridItemApp xs={12} sm={2}>
                <DropDown
                    id="id"
                    keyLabel="descricao"
                    label="Meio de pagamento"
                    values={meiosDePagamentos}
                    key={"id"}
                    value={meiosDePagamentos.find((x) => x.id === props.parcela.meioDePagamento)}
                    onChange={(_, value) => props.setParcela({
                        ...props.parcela,
                        meioDePagamento: value
                    })}
                />
            </GridItemApp>
            <GridItemApp xs={12} sm={2}>
                <InputCustom
                    fullWidth
                    id={`valor`}
                    label={"Valor"}
                    name={`valor`}
                    value={props.parcela.valor}
                    mask={MaskType.MONEY}
                    onChange={(_, value) => props.setParcela({
                        ...props.parcela,
                        valor: value
                    })}
                />
            </GridItemApp>
            <GridItemApp xs={12} sm={2}>
                <InputCustom
                    fullWidth
                    id={`desconto-`}
                    label={"Desconto"}
                    name={`desconto`}
                    value={props.parcela.desconto}
                    mask={MaskType.MONEY}
                    onChange={(_, value) => props.setParcela({
                        ...props.parcela,
                        desconto: value
                    })}
                />
            </GridItemApp>
            <GridItemApp xs={12} sm={2}>
                {props.loading ? (
                    <LoadingAppTexto />
                ) : (
                    <BoxApp display="flex" alignItems="center" height="100%">
                        <Tooltip title="Salvar" placement="top">
                            <IconButton onClick={props.editar}>
                                <IconifyIcon
                                    icon='el:ok'
                                    color="green"
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancelar" placement="top">
                            <IconButton onClick={props.cancelar}>
                                <IconifyIcon
                                    icon='mdi:cancel-bold'
                                    color='red'
                                />
                            </IconButton>
                        </Tooltip>
                    </BoxApp>
                )}
            </GridItemApp>
        </GridApp>
    )
}