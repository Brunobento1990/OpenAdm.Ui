"use client";

import { useEffect } from "react";
import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { useApiConfiguracaoEmail } from "src/@open-adm/api/use-api-configuracao-email";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { InputApp } from "src/@open-adm/components/input/input-app";
import { IConfiguracaoDeEmail } from "src/@open-adm/types/configuracao-email";

export function EmailConfiguracaoForm() {
    const { create, obter } = useApiConfiguracaoEmail();
    const form = useFormikAdapter<IConfiguracaoDeEmail>({
        initialValues: {
            email: "",
            servidor: "",
            senha: "",
            porta: 0,
        },
        validationSchema: new YupAdapter()
            .string("email")
            .string("servidor")
            .string("senha")
            .number("porta")
            .build(),
        onSubmit: submit,
    });

    async function submit() {
        await create.fetch(form.values);
    }

    async function init() {
        const response = await obter.fetch();
        if (response) {
            form.setValue(response);
        }
    }

    useEffect(() => {
        init();
    }, []);

    const loading = create.status === "loading" || obter.status === "loading";

    return (
        <FormRoot.Form
            loading={loading}
            submit={form.onSubmit}
            titulo="Configuração de e-mail"
        >
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <InputApp
                        label="E-mail"
                        name="email"
                        id="email"
                        value={form.values.email}
                        onBlur={form.onBlur}
                        onChange={form.onChange}
                        helperText={form.helperText("email")}
                        error={form.error("email")}
                        maxLength={255}
                        type="email"
                        required
                        autoFocus
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <InputApp
                        label="Senha"
                        name="senha"
                        id="senha"
                        value={form.values.senha}
                        onBlur={form.onBlur}
                        onChange={form.onChange}
                        helperText={form.helperText("senha")}
                        error={form.error("senha")}
                        maxLength={255}
                        required
                        isPassword
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <InputApp
                        label="Servidor"
                        name="servidor"
                        id="servidor"
                        value={form.values.servidor}
                        onBlur={form.onBlur}
                        onChange={form.onChange}
                        helperText={form.helperText("servidor")}
                        error={form.error("servidor")}
                        maxLength={255}
                        required
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <InputApp
                        label="Porta"
                        name="porta"
                        id="porta"
                        value={form.values.porta}
                        onBlur={form.onBlur}
                        onChange={form.onChange}
                        helperText={form.helperText("porta")}
                        error={form.error("porta")}
                        maxLength={255}
                        required
                        type="number"
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
        </FormRoot.Form>
    );
}
