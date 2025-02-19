import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { Form } from "src/@open-adm/components/form";
import { initialValues, schema } from "./config";
import { GridCustom } from "src/@open-adm/components/grid";
import { InputCustom, MaskType } from "src/@open-adm/components/input";
import { useSnackbar } from "src/@open-adm/components/snack";
import { useApiCliente } from "./use-api-cliente";
import { clearMaskCnpj, clearMaskCpf, clearMaskPhone } from "src/@open-adm/utils/mask";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { useState } from "react";

export function FormCliente() {
    const urlVoltar = "/vendas/cliente";
    const { navigate } = useNavigateApp();
    const { show } = useSnackbar();
    const { create } = useApiCliente();
    const [loading, setLoading] = useState(false);
    const form = useFormikAdapter({
        initialValues,
        onSubmit: submit,
        validationSchema: schema
    })

    async function submit(values: any) {
        try {
            if ((!values.cpf && !values.cnpj) ||
                values.cpf && values.cnpj) {
                show('Informe o CNPJ ou o CPF!');
                return;
            }

            if (values.senha !== values.reSenha) {
                show('As senha não conferem!');
                return;
            }

            setLoading(true);

            const response = await create({
                ...values,
                cpf: clearMaskCpf(values.cpf),
                cnpj: clearMaskCnpj(values.cnpj),
                telefone: clearMaskPhone(values.telefone),
                tipoPessoa: values.cnpj ? 1 : 2
            });
            if (response) {
                navigate(urlVoltar);
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    return (
        <Form urlVoltar={urlVoltar} loading={loading} action="create" title="Cadastrar novo cliente" submit={form.onSubmit} width="100%">
            <GridCustom withItem spacing={3} xs={12} sm={6}>
                {[
                    <InputCustom
                        fullWidth
                        label="CPF"
                        name="cpf"
                        id="cpf"
                        value={form.values.cpf}
                        onChange={form.onChange}
                        mask={MaskType.CPF}
                        onBlur={form.onBlur}
                    />,
                    <InputCustom
                        fullWidth
                        label="CNPJ"
                        name="cnpj"
                        id="cnpj"
                        value={form.values.cnpj}
                        onChange={form.onChange}
                        onBlur={form.onBlur}
                        mask={MaskType.CNPJ}
                    />
                ]}
            </GridCustom>
            <GridCustom withItem spacing={3} xs={12} sm={6}>
                {[
                    <InputCustom
                        fullWidth
                        label="Nome"
                        name="nome"
                        id="nome"
                        value={form.values.nome}
                        onChange={form.onChange}
                        onBlur={form.onBlur}
                        required
                        helperText={form.helperText("nome")}
                        error={form.error("nome")}
                    />,
                    <InputCustom
                        fullWidth
                        label="E-mail"
                        name="email"
                        id="email"
                        value={form.values.email}
                        onChange={form.onChange}
                        onBlur={form.onBlur}
                        required
                        type="email"
                        helperText={form.helperText("email")}
                        error={form.error("email")}
                    />
                ]}
            </GridCustom>
            <GridCustom withItem spacing={3} xs={12} sm={6}>
                {[
                    <InputCustom
                        fullWidth
                        label="Senha"
                        name="senha"
                        id="senha"
                        value={form.values.senha}
                        onChange={form.onChange}
                        onBlur={form.onBlur}
                        required
                        type="password"
                        isPassword
                        helperText={form.helperText("senha")}
                        error={form.error("senha")}
                    />,
                    <InputCustom
                        fullWidth
                        label="Confirme a senha"
                        name="reSenha"
                        id="reSenha"
                        value={form.values.reSenha}
                        onChange={form.onChange}
                        onBlur={form.onBlur}
                        required
                        type="password"
                        isPassword
                        helperText={form.helperText("reSenha")}
                        error={form.error("reSenha")}
                    />
                ]}
            </GridCustom>
            <GridCustom withItem spacing={3} xs={12} sm={6}>
                <InputCustom
                    fullWidth
                    label="Telefone"
                    name="telefone"
                    id="telefone"
                    value={form.values.telefone}
                    onChange={form.onChange}
                    onBlur={form.onBlur}
                    required
                    mask={MaskType.TELEFONE}
                    maxLength={15}
                    helperText={form.helperText("telefone")}
                    error={form.error("telefone")}
                />
            </GridCustom>
        </Form>
    )
}