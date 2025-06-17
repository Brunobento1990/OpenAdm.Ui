"use client";

import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { useApiCliente } from "src/@open-adm/api/use-api-cliente";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { InputApp, MaskType } from "src/@open-adm/components/input/input-app";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { ICliente } from "src/@open-adm/types/cliente";
import { IFormTypes } from "src/@open-adm/types/form";
import { rotasApp } from "src/configs/rotasApp";

export function ClienteForm(props: IFormTypes) {
    const { navigate, id } = useNavigateApp();
    const { create, get } = useApiCliente();
    const form = useFormikAdapter<ICliente>({
        initialValues: {
            email: "",
            nome: "",
            senha: "",
            reSenha: "",
            telefone: "",
        },
        validationSchema: new YupAdapter()
            .email("email")
            .string("nome")
            .string("senha")
            .string("reSenha")
            .string("telefone")
            .build(),
        onSubmit: submit,
    });

    const readonly = props.action === "view";
    const loading = get.status === "loading" || create.status === "loading";

    async function submit() {
        const response = await create.fecth(form.values);
        if (response) {
            navigate(rotasApp.cliente.paginacao);
        }
    }

    return (
        <FormRoot.Form
            submit={form.onSubmit}
            readonly={readonly}
            titulo="Cliente"
            loading={loading}
            urlVoltar={rotasApp.cliente.paginacao}
        >
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <InputApp
                        id="cpf"
                        value={form.values.cpf}
                        label="CPF"
                        mask={MaskType.CPF}
                        onChange={form.onChange}
                        autoFocus
                        readonly={readonly}
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <InputApp
                        id="cnpj"
                        value={form.values.cnpj}
                        label="CNPJ"
                        mask={MaskType.CNPJ}
                        onChange={form.onChange}
                        readonly={readonly}
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <InputApp
                        id="nome"
                        value={form.values.nome}
                        label="Nome"
                        onChange={form.onChange}
                        readonly={readonly}
                        onBlur={form.onBlur}
                        required
                        maxLength={255}
                        error={form.error("nome")}
                        helperText={form.helperText("nome")}
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <InputApp
                        id="email"
                        value={form.values.email}
                        label="Email"
                        onChange={form.onChange}
                        readonly={readonly}
                        onBlur={form.onBlur}
                        required
                        type="email"
                        maxLength={255}
                        error={form.error("email")}
                        helperText={form.helperText("email")}
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <InputApp
                        id="senha"
                        value={form.values.senha}
                        label="Senha"
                        onChange={form.onChange}
                        readonly={readonly}
                        onBlur={form.onBlur}
                        required
                        maxLength={255}
                        isPassword
                        error={form.error("senha")}
                        helperText={form.helperText("senha")}
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <InputApp
                        id="reSenha"
                        value={form.values.reSenha}
                        label="Confirme a senha"
                        onChange={form.onChange}
                        readonly={readonly}
                        onBlur={form.onBlur}
                        required
                        isPassword
                        maxLength={255}
                        error={form.error("reSenha")}
                        helperText={form.helperText("reSenha")}
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <InputApp
                        id="telefone"
                        value={form.values.telefone}
                        label="Telefone"
                        onChange={form.onChange}
                        readonly={readonly}
                        onBlur={form.onBlur}
                        required
                        mask={MaskType.TELEFONE}
                        maxLength={255}
                        error={form.error("telefone")}
                        helperText={form.helperText("telefone")}
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
        </FormRoot.Form>
    );
}
