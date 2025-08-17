"use client";

import { useEffect } from "react";
import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { useApiEstoque } from "src/@open-adm/api/use-api-estoque";
import { BoxApp } from "src/@open-adm/components/box";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { InputApp } from "src/@open-adm/components/input/input-app";
import { TextApp } from "src/@open-adm/components/text";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { IPosicaoEstoqueUpdate } from "src/@open-adm/types/movimento-produto";
import { rotasApp } from "src/configs/rotasApp";

export function PosicaoEstoqueForm() {
    const { update, obter } = useApiEstoque();
    const { navigate, id } = useNavigateApp();

    const form = useFormikAdapter<IPosicaoEstoqueUpdate>({
        initialValues: {
            quantidade: 0,
            produtoId: "",
        },
        validationSchema: new YupAdapter()
            .string("produtoId")
            .number("quantidade")
            .build(),
        onSubmit: submit,
    });

    async function submit() {
        const response = await update.fetch(form.values);
        if (response) {
            navigate(rotasApp.posicaoEstoque.paginacao);
        }
    }

    async function init() {
        const response = await obter.fetch(id as string);
        if (response) {
            form.setValue(response);
        }
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <FormRoot.Form
            titulo="Atualizar estoque"
            submit={form.onSubmit}
            urlVoltar={rotasApp.posicaoEstoque.paginacao}
            loading={update.status === "loading" || obter.status === "loading"}
        >
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <InputApp
                        label="Produto"
                        id="produto"
                        value={form.values.produto}
                        required
                        readonly
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={3}>
                    <InputApp
                        label="Peso"
                        id="peso"
                        value={form.values.peso}
                        required
                        readonly
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={3}>
                    <InputApp
                        label="Tamanho"
                        id="tamanho"
                        value={form.values.tamanho}
                        required
                        readonly
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
        </FormRoot.Form>
    );
}
