"use client";

import { useState } from "react";
import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { useApiPedido } from "src/@open-adm/api/UseApiPedido";
import { useApiTabelaDePreco } from "src/@open-adm/api/UseApiTabelaDePreco";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { IItemPedido, IPedido } from "src/@open-adm/types/pedido";
import { ITabelaDePreco } from "src/@open-adm/types/tabela-de-preco";
import { BoxApp } from "src/@open-adm/components/box";
import { ButtonApp } from "src/@open-adm/components/buttons";
import { DividerApp } from "src/@open-adm/components/divider";
import { DropDownAutoFetchApp } from "src/@open-adm/components/drop-down/drop-down-auto-fetch-app";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { InputApp } from "src/@open-adm/components/input/input-app";
import { IPeso } from "src/@open-adm/types/peso";
import { ITamanho } from "src/@open-adm/types/tamanho";
import { removerItemDeArrayPorIndex } from "src/@open-adm/utils/RemoverItemArrayPorIndex";
import { listaIcones } from "src/configs/listaIcones";
import { rotasApi } from "src/configs/rotasApi";
import { rotasApp } from "src/configs/rotasApp";
import { formatMoney } from "src/@open-adm/utils/format-money";
import { ICliente } from "src/@open-adm/types/cliente";
import { LoadingAppTexto } from "src/@open-adm/components/loading/loading-app-texto";
import { TableApp } from "src/@open-adm/components/table/table-app";
import { IconButtonAppComTooltip } from "src/@open-adm/components/icon/icon-button-app-tool-tip";
import { IconConsultaCep } from "src/@open-adm/components/icon/icon-consulta-cep";
import { useApiCliente } from "src/@open-adm/api/use-api-cliente";

const initialValues: Partial<IPedido> = {
    itensPedido: [],
    usuarioId: "",
};

const validationSchema = new YupAdapter().string("usuarioId").build();

export function PedidoCreateForm() {
    const [itemPedido, setItemPedido] = useState<IItemPedido>();
    const { listarItens } = useApiTabelaDePreco();
    const { criar } = useApiPedido();
    const { get } = useApiCliente();
    const { navigate } = useNavigateApp();
    const form = useFormikAdapter<IPedido>({
        initialValues,
        validationSchema,
        onSubmit: submit,
    });

    async function selecionarTabelaDePreco(tabelaDePreco?: ITabelaDePreco) {
        if (!tabelaDePreco) {
            form.setValue({
                tabelaDePreco: undefined,
            });
            return;
        }
        const itens = await listarItens.fetch(tabelaDePreco.id);
        if (itens) {
            form.setValue({
                tabelaDePreco: {
                    ...tabelaDePreco,
                    itensTabelaDePreco: itens,
                },
            });
        }
    }

    async function selecionarCliente(cliente?: ICliente) {
        if (!cliente) {
            form.setValue({
                usuario: undefined,
                usuarioId: undefined,
            });
            return;
        }
        const response = await get.fetch(cliente.id);
        if (response) {
            form.setValue({
                usuario: response,
                usuarioId: response.id,
                enderecoEntrega: response.enderecoUsuario,
            });
        }
    }

    async function selecionarPeso(peso?: IPeso) {
        const preco = form.values.tabelaDePreco?.itensTabelaDePreco?.find(
            (x) =>
                x.produtoId === itemPedido?.produtoId &&
                x.pesoId === peso?.id &&
                x.tamanhoId === itemPedido?.tamanhoId
        );
        const valorUnitario = itemPedido?.valorUnitario
            ? itemPedido.valorUnitario
            : form.values.usuario?.isAtacado
                ? preco?.valorUnitarioAtacado
                : preco?.valorUnitarioVarejo;

        setItemPedido({
            ...(itemPedido ?? {}),
            peso,
            pesoId: peso?.id,
            valorUnitario,
        } as any);
    }

    async function selecionarTamanho(tamanho?: ITamanho) {
        const preco = form.values.tabelaDePreco?.itensTabelaDePreco?.find(
            (x) =>
                x.produtoId === itemPedido?.produtoId &&
                x.pesoId === itemPedido?.id &&
                x.tamanhoId === tamanho?.id
        );
        const valorUnitario = itemPedido?.valorUnitario
            ? itemPedido.valorUnitario
            : form.values.usuario?.isAtacado
                ? preco?.valorUnitarioAtacado
                : preco?.valorUnitarioVarejo;

        setItemPedido({
            ...(itemPedido ?? {}),
            tamanho,
            tamanhoId: tamanho?.id,
            valorUnitario,
        } as any);
    }

    function setEnderecoEntrega(key: string, value: any) {
        form.setValue({
            enderecoEntrega: {
                ...(form.values.enderecoEntrega ?? {}),
                [key]: value,
            } as any,
        });
    }

    function adicionarItem() {
        if (!itemPedido) {
            return;
        }

        form.setValue({
            itensPedido: [...form.values.itensPedido, itemPedido],
        });
        setItemPedido(undefined);
    }

    async function submit() {
        const response = await criar.fetch(form.values);
        if (response) {
            navigate(rotasApp.pedido.paginacao);
        }
    }

    return (
        <FormRoot.Form
            urlVoltar={rotasApp.pedido.paginacao}
            submit={form.onSubmit}
            titulo="Pedido"
        >
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <DropDownAutoFetchApp
                        id="usuarioId"
                        method="POST"
                        keyLabel="nome"
                        label="Cliente"
                        url={rotasApi.cliente.paginacaoDropdown}
                        error={form.error("usuarioId")}
                        helperText={form.helperText("usuarioId")}
                        onChange={async (_, value) => await selecionarCliente(value)}
                        value={form.values.usuario}
                        autoFocus
                        required
                    />
                    {get.status === "loading" && (
                        <LoadingAppTexto comBox texto="Carregando dados do cliente..." />
                    )}
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <DropDownAutoFetchApp
                        id="tabelaDePreco"
                        keyLabel="descricao"
                        method="GET"
                        label="Tabela de preço"
                        url={rotasApi.tabelaDePreco.listar}
                        value={form.values.tabelaDePreco}
                        required
                        onChange={async (_, value) => await selecionarTabelaDePreco(value)}
                    />
                    {listarItens.status === "loading" && (
                        <LoadingAppTexto comBox texto="Carregando preços..." />
                    )}
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
            <DividerApp width="100%" color="primary" chip="Adicione os itens" />
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow xs={12} sm={4}>
                    <DropDownAutoFetchApp
                        id="produtoId"
                        keyLabel="descricao"
                        label="Produto"
                        url={rotasApi.produto.paginacaoDropDown}
                        value={itemPedido?.produto}
                        onChange={(_, value) => {
                            setItemPedido({
                                ...itemPedido,
                                produto: value,
                                produtoId: value?.id,
                            } as any);
                        }}
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={4}>
                    <DropDownAutoFetchApp
                        id="pesoId"
                        keyLabel="descricao"
                        label="Peso"
                        method="GET"
                        url={rotasApi.peso.listar}
                        value={itemPedido?.peso}
                        onChange={(_, value) => {
                            selecionarPeso(value);
                        }}
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={4}>
                    <DropDownAutoFetchApp
                        id="tamanhoId"
                        method="GET"
                        keyLabel="descricao"
                        label="Tamanho"
                        url={rotasApi.tamanho.listar}
                        value={itemPedido?.tamanho}
                        onChange={(_, value) => {
                            selecionarTamanho(value);
                        }}
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow xs={12} sm={4}>
                    <InputApp
                        label="Quantidade"
                        type="number"
                        value={itemPedido?.quantidade}
                        id="quantidade"
                        onChange={(_, value) =>
                            setItemPedido({
                                ...itemPedido,
                                quantidade:
                                    typeof value === "string" ? parseFloat(value) : value,
                            } as any)
                        }
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={4}>
                    <InputApp
                        label="Vlr unitário"
                        type="number"
                        value={itemPedido?.valorUnitario}
                        id="valorUnitario"
                        onChange={(_, value) =>
                            setItemPedido({
                                ...itemPedido,
                                valorUnitario:
                                    typeof value === "string" ? parseFloat(value) : value,
                            } as any)
                        }
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={4}>
                    <BoxApp
                        display="flex"
                        alignItems="center"
                        height="100%"
                        justifyContent="start"
                        marginTop="10px"
                    >
                        <ButtonApp
                            onClick={adicionarItem}
                            variant="contained"
                            title="Adicionar item"
                        />
                    </BoxApp>
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
            <TableApp
                columns={[
                    {
                        field: "foto",
                        headerName: "Foto",
                        renderCell: (item: IItemPedido) => {
                            return (
                                <img
                                    src={item.produto?.foto}
                                    alt={item.produto?.descricao}
                                    style={{ maxWidth: "50px" }}
                                />
                            );
                        },
                    },
                    {
                        field: "produto",
                        headerName: "Produto",
                        renderCell: (item: IItemPedido) => item.produto?.descricao,
                    },
                    {
                        field: "pesoTamanho",
                        headerName: "Peso/Tamanho",
                        renderCell: (item: IItemPedido) =>
                            item.tamanho ? item.tamanho.descricao : item.peso?.descricao,
                    },
                    {
                        field: "valorUnitario",
                        headerName: "Vlr un",
                        renderCell: (item: IItemPedido) =>
                            formatMoney(item?.valorUnitario),
                    },
                    {
                        field: "qtd",
                        headerName: "Qtd",
                        renderCell: (item: IItemPedido) => item.quantidade,
                    },
                    {
                        field: "total",
                        headerName: "Total",
                        renderCell: (item: IItemPedido) =>
                            formatMoney((item?.valorUnitario ?? 0) * (item.quantidade ?? 0)),
                    },
                    {
                        field: "excluir",
                        headerName: "Excluir",
                        renderCell: (_: IItemPedido, i: number) => (
                            <IconButtonAppComTooltip
                                icon={listaIcones.lixeira}
                                titulo=""
                                onClick={() =>
                                    form.setValue({
                                        itensPedido: removerItemDeArrayPorIndex(
                                            i,
                                            form.values.itensPedido
                                        ),
                                    })
                                }
                                cor="red"
                            />
                        ),
                    },
                ]}
                rows={form.values.itensPedido}
            />
            <DividerApp
                chip="Endereço de entraga"
                marginTop="1rem"
                width="100%"
                color="primary"
            />
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow sm={3} xs={12}>
                    <BoxApp display="flex" alignItems="center">
                        <InputApp
                            label="CEP"
                            id="cep"
                            onChange={setEnderecoEntrega}
                            value={form.values.enderecoEntrega?.cep}
                            maxLength={8}
                        />
                        <BoxApp marginTop="17px">
                            <IconConsultaCep
                                setEndereco={(endereco) =>
                                    form.setValue({
                                        enderecoEntrega: endereco,
                                    })
                                }
                                cep={form.values.enderecoEntrega?.cep}
                            />
                        </BoxApp>
                    </BoxApp>
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow sm={6} xs={12}>
                    <InputApp
                        label="Rua"
                        id="logradouro"
                        onChange={setEnderecoEntrega}
                        value={form.values.enderecoEntrega?.logradouro}
                        maxLength={255}
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow sm={3} xs={12}>
                    <InputApp
                        label="N°"
                        id="numero"
                        onChange={setEnderecoEntrega}
                        value={form.values.enderecoEntrega?.numero}
                        maxLength={10}
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow sm={6} xs={12}>
                    <InputApp
                        label="Cidade"
                        id="localidade"
                        onChange={setEnderecoEntrega}
                        value={form.values.enderecoEntrega?.localidade}
                        maxLength={255}
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow sm={3} xs={12}>
                    <InputApp
                        label="Bairro"
                        id="bairro"
                        onChange={setEnderecoEntrega}
                        value={form.values.enderecoEntrega?.bairro}
                        maxLength={255}
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow sm={3} xs={12}>
                    <InputApp
                        label="UF"
                        id="uf"
                        onChange={setEnderecoEntrega}
                        value={form.values.enderecoEntrega?.uf}
                        maxLength={2}
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow sm={12} xs={12}>
                    <InputApp
                        label="Complemento"
                        id="complemento"
                        onChange={setEnderecoEntrega}
                        value={form.values.enderecoEntrega?.complemento}
                        maxLength={255}
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
        </FormRoot.Form>
    );
}
