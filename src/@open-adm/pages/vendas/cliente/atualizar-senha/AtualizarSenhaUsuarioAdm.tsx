"use client";

import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { useApiCliente } from "src/@open-adm/api/use-api-cliente";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { InputApp } from "src/@open-adm/components/input/input-app";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { IAtualizarSenhaUsuarioAdm } from "src/@open-adm/types/atualizar-senha-usuario-adm";
import { rotasApp } from "src/configs/rotasApp";

export function AtualizarSenhaClienteForm() {
    const { navigate, id } = useNavigateApp();
    const { atualizarSenha } = useApiCliente();
    const form = useFormikAdapter<IAtualizarSenhaUsuarioAdm>({
        initialValues: {
            usuarioId: id,
            senha: "",
            confirmarSenha: "",
        },
        validationSchema: new YupAdapter()
            .string("senha")
            .string("confirmarSenha")
            .build(),
        onSubmit: submit,
    });

    async function submit() {
        const response = await atualizarSenha.fetch(form.values);
        if (response) {
            navigate(rotasApp.cliente.paginacao);
        }
    }

    return (
        <FormRoot.Form
            submit={form.onSubmit}
            titulo="Atualizar senha cliente"
            loading={atualizarSenha.status === "loading"}
            urlVoltar={rotasApp.cliente.paginacao}
        >
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <InputApp
                        id="senha"
                        label="Senha"
                        autoFocus
                        value={form.values.senha}
                        onChange={form.onChange}
                        onBlur={form.onBlur}
                        error={form.error("senha")}
                        helperText={form.helperText("senha")}
                        maxLength={20}
                        isPassword
                        required
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <InputApp
                        id="confirmarSenha"
                        label="Confirmar senha"
                        value={form.values.confirmarSenha}
                        onChange={form.onChange}
                        onBlur={form.onBlur}
                        error={form.error("confirmarSenha")}
                        helperText={form.helperText("confirmarSenha")}
                        maxLength={20}
                        isPassword
                        required
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
        </FormRoot.Form>
    );
}
