import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter"
import { IPedido } from "src/@open-adm/types/pedido"
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { useEffect, useState } from "react";
import { Form } from "src/@open-adm/components/form";
import { BoxApp } from "src/@open-adm/components/box";
import { TextApp } from "src/@open-adm/components/text";
import { formatDateComHoras } from "src/@open-adm/utils/convert-date";
import { statusPedido } from "../config";
import { StatusApp } from "src/@open-adm/components/chip";
import { formatMoney } from "src/@open-adm/utils/format-money";
import { DividerApp } from "src/@open-adm/components/divider";
import { RadioApp } from "src/@open-adm/components/radio";
import { IFaturaContasAReceber } from "src/@open-adm/types/contas-a-receber";
import { useApiFatura } from "src/@open-adm/api/use-api-fatura";
import { statusFatura } from "../../financeiro/fatura";
import { useApiPedido } from "src/@open-adm/api/UseApiPedido";

export function ModificarStatusPedido() {
    const urlVoltar = "/pedidos";
    const { navigate } = useNavigateApp();
    const { get, atualizarStatus } = useApiPedido();
    const { id } = useNavigateApp();
    const { parcelasDoPedido, pagar } = useApiFatura();
    const [loadingDados, setLoadingDados] = useState(false)
    const [loading, setLoading] = useState(false)
    const [faturas, setFaturas] = useState<IFaturaContasAReceber[]>([])
    const [fatura, setFatura] = useState<IFaturaContasAReceber>()
    const [statusPedidoSelecionado, setStatusPedidoSelecionado] = useState(0)
    const form = useFormikAdapter<IPedido>({
        onSubmit: submit,
        initialValues: {}
    })

    async function init() {
        setLoadingDados(true)
        const responsePedido = await get(id)
        if (responsePedido) {
            form.setValue(responsePedido)
            setStatusPedidoSelecionado(responsePedido.statusPedido)
            // const responseFaturas = await parcelasDoPedido(responsePedido.id);
            // if (responseFaturas) {
            //     setFaturas(responseFaturas)
            // }
        }
        setLoadingDados(false)
    }

    async function submit() {
        setLoading(true);
        const response = await atualizarStatus({
            pedidoId: form.values.id,
            statusPedido: statusPedidoSelecionado
        })
        // if (response && fatura) {
        //     const responsePagar = await pagar({
        //         ...fatura
        //     });
        //     if (responsePagar) {
        //         navigate(urlVoltar)
        //         return;
        //     }
        // }

        if (response) {
            navigate(urlVoltar)
            return;
        }
        setLoading(false);
    }

    const status = statusPedido[form.values.statusPedido]
    const statusFaturaLocal = statusFatura[fatura?.status ?? 0]
    useEffect(() => {
        init();
    }, [])

    return (
        <Form action="" urlVoltar={urlVoltar} loading={loading} carregandoDados={loadingDados} submit={form.onSubmit} title="Status do pedido">
            <BoxApp>
                <TextApp texto={`N°: #${form.values.numero}`} />
                <TextApp texto={`Data de cadastro: ${formatDateComHoras(form.values.dataDeCriacao)}`} />
                <TextApp texto={`Ultima atualização: ${formatDateComHoras(form.values.dataDeAtualizacao)}`} />
                <TextApp texto={`Cliente: ${form.values.usuario}`} />
                <TextApp texto={`Total: ${formatMoney(form.values.valorTotal)}`} />
                {status?.color &&
                    <BoxApp display="flex" gap='1rem'>
                        <TextApp texto='Status: ' />
                        <StatusApp cor={status.color} titulo={status.title} />
                    </BoxApp>
                }
            </BoxApp>
            <DividerApp chip="Selecione o status" />
            <RadioApp
                label={"Atualizar status"}
                id={"status"}
                value={statusPedidoSelecionado}
                row
                onChange={(_, value) => setStatusPedidoSelecionado(value)}
                options={[
                    {
                        label: 'Em aberto',
                        value: 0
                    },
                    {
                        label: 'Faturado',
                        value: 1
                    },
                    {
                        label: 'Em entrega',
                        value: 2
                    },
                    {
                        label: 'Entregue',
                        value: 3
                    },
                ]} />

            {/* {faturas.length > 0 &&
                <BoxApp>
                    <DividerApp chip="Baixar parcela" marginBotton="1rem" />
                    <DropDown
                        id="faturas"
                        keyLabel="numeroDaFatura"
                        label="Parcela"
                        values={faturas}
                        key={"id"}
                        value={fatura}
                        segundaKeyLabel="observacao"
                        onChange={(_, value) => setFatura(value)}
                        retornarObjetoCompleto
                    />
                    {fatura &&
                        <BoxApp marginTop="1rem">
                            <TextApp texto={`N° da parcela: #${fatura.numeroDaFatura}`} />
                            <TextApp texto={`Valor: ${formatMoney(fatura.valor)}`} />
                            <TextApp texto={`Data de cadastro: ${formatDate(fatura.dataDeCriacao)}`} />
                            <TextApp texto={`Data de vencimento: ${formatDate(fatura.dataDeVencimento)}`} />
                            <TextApp texto={`Vencida: ${fatura.vencida ? 'Sim' : 'Não'}`} />
                            {statusFaturaLocal &&
                                <BoxApp display="flex" gap='1rem'>
                                    <TextApp texto='Status: ' />
                                    <StatusApp cor={statusFaturaLocal.color} titulo={statusFaturaLocal.title} />
                                </BoxApp>
                            }
                            <FormRow spacing={3}>
                                <FormItemRow xs={12} sm={4}>
                                    <InputCustom
                                        fullWidth
                                        label="Desconto"
                                        name="desconto"
                                        id="desconto"
                                        value={fatura.desconto}
                                        onChange={(_, value) => setFatura({ ...fatura, desconto: value })}
                                        type="number"
                                    />
                                </FormItemRow>
                                <FormItemRow xs={12} sm={4}>
                                    <InputCustom
                                        fullWidth
                                        label="Observação da fatura"
                                        name="observacao"
                                        id="observacao"
                                        value={fatura.observacao}
                                        onChange={(_, value) => setFatura({ ...fatura, observacao: value })}
                                        maxLength={255}
                                    />
                                </FormItemRow>
                                <FormItemRow xs={12} sm={4}>
                                    <DropDown
                                        id="id"
                                        keyLabel="descricao"
                                        label="Meio de pagamento"
                                        values={meiosDePagamentos}
                                        key={"id"}
                                        value={meiosDePagamentos.find((x) => x.id === fatura.meioDePagamento)}
                                        onChange={(_, value) => setFatura({
                                            ...fatura,
                                            meioDePagamento: value
                                        })}
                                    />
                                </FormItemRow>
                            </FormRow>
                        </BoxApp>
                    }
                </BoxApp>
            } */}
        </Form>
    )
}