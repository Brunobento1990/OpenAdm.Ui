"use client";

import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { useApiEstoque } from "src/@open-adm/api/use-api-estoque";
import { DropDownApp } from "src/@open-adm/components/drop-down/drop-down-app";
import { DropDownAutoFetchApp } from "src/@open-adm/components/drop-down/drop-down-auto-fetch-app";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { InputApp } from "src/@open-adm/components/input/input-app";
import { tiposMovimentacaoOpcoes } from "src/@open-adm/enuns/tipo-movimentacao-estoque-opcoes";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { IMovimentoProduto } from "src/@open-adm/types/movimento-produto";
import { rotasApp } from "src/configs/rotasApp";

export function MovimentoProdutoForm() {
    const { movimentar } = useApiEstoque();
    const { navigate } = useNavigateApp();
    const form = useFormikAdapter<IMovimentoProduto>({
        initialValues: {
            quantidade: 0,
            produtoId: "",
            tipoMovimentacaoDeProduto: 0,
        },
        validationSchema: new YupAdapter()
            .string("produtoId")
            .number("quantidade")
            .number("tipoMovimentacaoDeProduto")
            .build(),
        onSubmit: submit,
    });

    async function submit() {
        const response = await movimentar.fetch({
            ...form.values,
            tipoMovimentacaoDeProduto: form.values.tipoMovimentacaoDeProduto - 1,
        });
        if (response) {
            navigate(rotasApp.movimentoProduto.paginacao);
        }
    }

    return (
        <FormRoot.Form
            titulo="Movimentar estoque"
            submit={form.onSubmit}
            urlVoltar={rotasApp.movimentoProduto.paginacao}
            loading={movimentar.status === "loading"}
        >
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <DropDownAutoFetchApp
                        keyLabel="descricao"
                        method="GET"
                        id="produtoId"
                        label="Produto"
                        url="produtos/all-list"
                        value={form.values.produto}
                        autoFocus
                        error={form.error("produtoId")}
                        helperText={form.helperText("produtoId")}
                        required
                        onChange={(_, produto) =>
                            form.setValue({ produto, produtoId: produto?.id })
                        }
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={3}>
                    <DropDownAutoFetchApp
                        onChange={(_, value) => {
                            form.setValue({
                                tamanho: value,
                                tamanhoId: value?.id
                            })
                        }}
                        value={form.values.tamanho}
                        method="GET"
                        label="Tamanho"
                        id="tamanhoId"
                        keyLabel="descricao"
                        url="tamanhos/list"
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={3}>
                    <DropDownAutoFetchApp
                        onChange={(_, value) => {
                            form.setValue({
                                peso: value,
                                pesoId: value?.id
                            })
                        }}
                        value={form.values.peso}
                        method="GET"
                        label="Peso"
                        id="pesoId"
                        keyLabel="descricao"
                        url="pesos/list"
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={3}>
                    <DropDownApp
                        id="tipoMovimentacaoDeProduto"
                        keyLabel="descricao"
                        label="Tipo de movimentação"
                        values={tiposMovimentacaoOpcoes}
                        error={form.error("tipoMovimentacaoDeProduto")}
                        helperText={form.helperText("tipoMovimentacaoDeProduto")}
                        onChange={form.onChange}
                        required
                        onBlur={form.onBlur}
                        value={tiposMovimentacaoOpcoes.find(
                            (x) => x.id === form.values.tipoMovimentacaoDeProduto
                        )}
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={3}>
                    <InputApp
                        label="Quantidade"
                        type="number"
                        id="quantidade"
                        error={form.error("quantidade")}
                        helperText={form.helperText("quantidade")}
                        value={form.values.quantidade}
                        onChange={form.onChange}
                        onBlur={form.onBlur}
                        required
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow xs={12} sm={12}>
                    <InputApp
                        id="observacao"
                        label="Observação"
                        onChange={form.onChange}
                        value={form.values.observacao}
                        maxLength={255}
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
        </FormRoot.Form>
    );
}
