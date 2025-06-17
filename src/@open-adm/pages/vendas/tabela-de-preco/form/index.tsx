"use client";

import { useEffect } from "react";
import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { useApiTabelaDePreco } from "src/@open-adm/api/UseApiTabelaDePreco";
import { CheckBoxApp } from "src/@open-adm/components/check-box";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { InputApp } from "src/@open-adm/components/input/input-app";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { IFormTypes } from "src/@open-adm/types/form";
import { ITabelaDePreco } from "src/@open-adm/types/tabela-de-preco";
import { rotasApp } from "src/configs/rotasApp";

export function TabelaDePrecoForm(props: IFormTypes) {
    const { criar, editar, obter } = useApiTabelaDePreco();
    const { navigate, id } = useNavigateApp();

    const form = useFormikAdapter<ITabelaDePreco>({
        initialValues: {
            descricao: "",
            ativaEcommerce: false,
        },
        validationSchema: new YupAdapter().string("descricao").build(),
        onSubmit: submit,
    });

    async function submit() {
        const response =
            props.action === "create"
                ? await criar.fetch(form.values)
                : await editar.fetch(form.values);
        if (response) {
            navigate(rotasApp.tabelaDePreco.paginacao);
        }
    }

    async function init() {
        if (props.action === "create") {
            return;
        }
        const response = await obter.fetch(id as string);
        if (response) {
            form.setValue(response);
        }
    }

    useEffect(() => {
        init();
    }, []);

    const readonly = props.action === "view";
    const loading =
        criar.status === "loading" ||
        editar.status === "loading" ||
        obter.status === "loading";

    return (
        <FormRoot.Form
            loading={loading}
            urlVoltar={rotasApp.tabelaDePreco.paginacao}
            readonly={readonly}
            submit={form.onSubmit}
            titulo="Tabela de preço"
        >
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <InputApp
                        label="Descrição"
                        maxLength={255}
                        id="descricao"
                        onChange={form.onChange}
                        onBlur={form.onBlur}
                        autoFocus
                        readonly={readonly}
                        required
                        error={form.error("descricao")}
                        helperText={form.helperText("descricao")}
                        value={form.values.descricao}
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={6} marginTop="17px">
                    <CheckBoxApp
                        label="Ativa ecommerce"
                        id="ativaEcommerce"
                        onChange={form.onChange}
                        readonly={readonly}
                        value={form.values.ativaEcommerce}
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
        </FormRoot.Form>
    );
}
