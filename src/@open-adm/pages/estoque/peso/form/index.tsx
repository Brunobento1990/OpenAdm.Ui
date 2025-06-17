"use client";

import { useEffect } from "react";
import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { useApiPeso } from "src/@open-adm/api/use-api-peso";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { InputApp } from "src/@open-adm/components/input/input-app";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { IFormTypes } from "src/@open-adm/types/form";
import { IPeso } from "src/@open-adm/types/peso";
import { rotasApp } from "src/configs/rotasApp";

export function PesoForm(props: IFormTypes) {
    const { create, obter, update } = useApiPeso();
    const { navigate, id } = useNavigateApp();
    const form = useFormikAdapter<IPeso>({
        initialValues: {
            descricao: "",
        },
        validationSchema: new YupAdapter().string("descricao").build(),
        onSubmit: submit,
    });

    async function submit() {
        const response =
            props.action === "create"
                ? await create.fetch(form.values)
                : await update.fetch(form.values);
        if (response) {
            navigate(rotasApp.peso.pagincao);
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

    const loading =
        create.status === "loading" ||
        update.status === "loading" ||
        obter.status === "loading";

    const readonly = props.action === "view";

    useEffect(() => {
        init();
    }, []);

    return (
        <FormRoot.Form
            titulo="Peso"
            loading={loading}
            readonly={readonly}
            submit={form.onSubmit}
            urlVoltar={rotasApp.peso.pagincao}
        >
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow sm={6} xs={12}>
                    <InputApp
                        label="Descrição"
                        maxLength={255}
                        id="descricao"
                        value={form.values.descricao}
                        autoFocus
                        onChange={form.onChange}
                        onBlur={form.onBlur}
                        required
                        error={form.error("descricao")}
                        helperText={form.helperText("descricao")}
                        readonly={readonly}
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow sm={6} xs={12}>
                    <InputApp
                        label="Peso real"
                        value={form.values.pesoReal}
                        onChange={form.onChange}
                        id="pesoReal"
                        type="number"
                        readonly={readonly}
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
        </FormRoot.Form>
    );
}
