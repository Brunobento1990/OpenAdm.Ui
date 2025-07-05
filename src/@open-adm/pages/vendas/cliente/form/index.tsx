"use client";

import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { useApiCliente } from "src/@open-adm/api/use-api-cliente";
import { BoxApp } from "src/@open-adm/components/box";
import { DividerApp } from "src/@open-adm/components/divider";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { IconConsultaCep } from "src/@open-adm/components/icon/icon-consulta-cep";
import { IconConsultaCnpj } from "src/@open-adm/components/icon/icon-consulta-cnpj";
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
        const response = await create.fecth({ ...form.values });
        if (response) {
            navigate(rotasApp.cliente.paginacao);
        }
    }

    function setEndereco(key: string, value: any) {
        form.setValue({
            enderecoUsuario: {
                ...(form.values.enderecoUsuario ?? {}),
                [key]: value,
            } as any,
        });
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
                    <BoxApp display="flex" alignItems="center">
                        <InputApp
                            id="cnpj"
                            value={form.values.cnpj}
                            label="CNPJ"
                            mask={MaskType.CNPJ}
                            onChange={form.onChange}
                            readonly={readonly}
                        />
                        <BoxApp marginTop="1rem">
                            <IconConsultaCnpj setCnpj={(consulta) => {
                                if (!consulta) {
                                    form.limpar();
                                    return;
                                }
                                form.setValue({
                                    enderecoUsuario: {
                                        bairro: consulta.bairro,
                                        cep: consulta.cep,
                                        complemento: consulta.complemento,
                                        id: '',
                                        localidade: consulta.municipio,
                                        logradouro: consulta.logradouro,
                                        numero: consulta.numero,
                                        uf: consulta.uf
                                    },
                                    nome: consulta.nome_fantasia,
                                    telefone: consulta.ddd_telefone_1
                                })
                            }} cnpj={form.values.cnpj} />
                        </BoxApp>
                    </BoxApp>
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
            <DividerApp chip="Endereço" marginTop="1rem" width="100%" color="primary" />
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow sm={3} xs={12}>
                    <BoxApp display="flex" alignItems="center">
                        <InputApp
                            label="CEP"
                            id="cep"
                            onChange={setEndereco}
                            value={form.values.enderecoUsuario?.cep}
                            maxLength={8}
                        />
                    </BoxApp>
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow sm={6} xs={12}>
                    <InputApp
                        label="Rua"
                        id="logradouro"
                        onChange={setEndereco}
                        value={form.values.enderecoUsuario?.logradouro}
                        maxLength={255}
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow sm={3} xs={12}>
                    <InputApp
                        label="N°"
                        id="numero"
                        onChange={setEndereco}
                        value={form.values.enderecoUsuario?.numero}
                        maxLength={10}
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow sm={6} xs={12}>
                    <InputApp
                        label="Cidade"
                        id="localidade"
                        onChange={setEndereco}
                        value={form.values.enderecoUsuario?.localidade}
                        maxLength={255}
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow sm={3} xs={12}>
                    <InputApp
                        label="Bairro"
                        id="bairro"
                        onChange={setEndereco}
                        value={form.values.enderecoUsuario?.bairro}
                        maxLength={255}
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow sm={3} xs={12}>
                    <InputApp
                        label="UF"
                        id="uf"
                        onChange={setEndereco}
                        value={form.values.enderecoUsuario?.uf}
                        maxLength={2}
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow sm={12} xs={12}>
                    <InputApp
                        label="Complemento"
                        id="complemento"
                        onChange={setEndereco}
                        value={form.values.enderecoUsuario?.complemento}
                        maxLength={255}
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
        </FormRoot.Form>
    );
}
