"use client";


import { Card } from "@mui/material";
import { useEffect } from "react";
import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { useApiParceiro } from "src/@open-adm/api/use-api-parceiro";
import { BoxApp } from "src/@open-adm/components/box";
import { DividerApp } from "src/@open-adm/components/divider";
import { DropDownApp } from "src/@open-adm/components/drop-down/drop-down-app";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { IconButtonAppComTooltip } from "src/@open-adm/components/icon/icon-button-app-tool-tip";
import { IconConsultaCep } from "src/@open-adm/components/icon/icon-consulta-cep";
import { MaskType } from "src/@open-adm/components/input";
import { InputApp } from "src/@open-adm/components/input/input-app";
import { InputFile } from "src/@open-adm/components/input/input-file";
import { LoadingAppTexto } from "src/@open-adm/components/loading/loading-app-texto";
import { TextApp } from "src/@open-adm/components/text";
import { RedeSocialEnum, redesSociaisOpcoes } from "src/@open-adm/enuns/rede-social-enum";
import { useArquivo } from "src/@open-adm/hooks/use-arquivo";
import { IParceiro } from "src/@open-adm/types/parceiro";
import { clearMaskCnpj, clearMaskPhone } from "src/@open-adm/utils/mask";
import { removerItemDeArrayPorIndex } from "src/@open-adm/utils/RemoverItemArrayPorIndex";
import { listaIcones } from "src/configs/listaIcones";

export function MinhaEmpresaForm() {
    const { editar, excluirRedeSocial, excluirTelefone, obter } =
        useApiParceiro();
    const { resolveUploadImagem, recortarBase64, formatarBase64 } = useArquivo();
    const form = useFormikAdapter<IParceiro>({
        initialValues: {
            razaoSocial: "",
            nomeFantasia: "",
            cnpj: "",
            telefones: [],
            redesSociais: [],
        },
        validationSchema: new YupAdapter()
            .string("cnpj")
            .string("razaoSocial")
            .string("nomeFantasia")
            .build(),
        onSubmit: submit,
    });

    async function excluirRedeSocialLocal(redeSocialId: string, index: number) {
        if (!redeSocialId) {
            form.setValue({
                redesSociais: removerItemDeArrayPorIndex(
                    index,
                    form.values.redesSociais
                ),
            });
            return;
        }

        const response = await excluirRedeSocial.fetch(redeSocialId);
        if (response) {
            form.setValue({
                redesSociais: removerItemDeArrayPorIndex(
                    index,
                    form.values.redesSociais
                ),
            });
        }
    }

    async function excluirTelefoneLocal(telefoneId: string, index: number) {
        if (!telefoneId) {
            form.setValue({
                telefones: removerItemDeArrayPorIndex(index, form.values.telefones),
            });
            return;
        }

        const response = await excluirTelefone.fetch(telefoneId);
        if (response) {
            form.setValue({
                telefones: removerItemDeArrayPorIndex(index, form.values.telefones),
            });
        }
    }

    function onChangeRedeSocial(
        index: number,
        link?: string,
        tipo?: RedeSocialEnum
    ) {
        let novasRedesSociais = [...form.values.redesSociais];
        let redeSocial = novasRedesSociais[index];
        if (redeSocial) {
            redeSocial.link = link ?? "";
            redeSocial.redeSocialEnum = tipo as any;
        }

        form.setValue({
            redesSociais: novasRedesSociais,
        });
    }

    function onChangeTelefone(index: number, value?: string) {
        let novosTelefones = [...form.values.telefones];
        let telefone = novosTelefones[index];
        if (telefone) {
            telefone.telefone = value ?? "";
        }

        form.setValue({
            telefones: novosTelefones,
        });
    }

    async function submit() {
        await editar.fetch({
            ...form.values,
            cnpj: clearMaskCnpj(form.values.cnpj),
            telefones: form.values.telefones
                .filter((x) => x.telefone)
                .map((x) => {
                    return {
                        ...x,
                        telefone: clearMaskPhone(x.telefone) ?? "",
                    };
                }),
            redesSociais: form.values.redesSociais.filter(
                (x) => x.link && x.redeSocialEnum
            ),
        });
    }

    async function init() {
        const response = await obter.fetch();
        if (response) {
            form.setValue(response);
        }
    }

    async function onChangeLogo(arquivos?: FileList) {
        if (!arquivos || !arquivos.length) {
            return;
        }
        const logo = await resolveUploadImagem(arquivos[0]);
        form.setValue({
            logo: recortarBase64(logo).base64,
        });
    }

    function setEndereco(key: string, value: any) {
        form.setValue({
            enderecoParceiro: {
                ...(form.values.enderecoParceiro ?? {}),
                [key]: value,
            } as any,
        });
    }

    useEffect(() => {
        init();
    }, []);

    const loading = obter.status === "loading" || editar.status === "loading";

    return (
        <FormRoot.Form
            submit={form.onSubmit}
            titulo="Minha empresa"
            loading={loading}
        >
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow xs={12} sm={3}>
                    <InputApp
                        id="cnpj"
                        label="CNPJ"
                        value={form.values.cnpj}
                        onChange={form.onChange}
                        onBlur={form.onBlur}
                        required
                        mask={MaskType.CNPJ}
                        autoFocus
                        error={form.error("cnpj")}
                        helperText={form.helperText("cnpj")}
                        name="cnpj"
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={9}>
                    <InputApp
                        id="razaoSocial"
                        label="Razão social"
                        value={form.values.razaoSocial}
                        onChange={form.onChange}
                        onBlur={form.onBlur}
                        required
                        maxLength={255}
                        error={form.error("razaoSocial")}
                        helperText={form.helperText("razaoSocial")}
                        name="razaoSocial"
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow xs={12} sm={9}>
                    <InputApp
                        id="nomeFantasia"
                        label="Nome fantasia"
                        value={form.values.nomeFantasia}
                        onChange={form.onChange}
                        onBlur={form.onBlur}
                        required
                        maxLength={255}
                        error={form.error("nomeFantasia")}
                        helperText={form.helperText("nomeFantasia")}
                        name="nomeFantasia"
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={3} marginTop="18px">
                    <InputFile
                        accept={["image/*"]}
                        label="Selecione sua logo"
                        handleFileChange={onChangeLogo}
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow sm={6} xs={12}>
                    <Card>
                        {excluirRedeSocial.status === "loading" && (
                            <LoadingAppTexto comBox texto="Excluindo rede social" />
                        )}
                        <BoxApp display="flex" alignItems="center" justifyContent="center">
                            <TextApp texto="Redes sociais" />
                            <IconButtonAppComTooltip
                                icon={listaIcones.adicionar}
                                titulo="Adicione redes sociais"
                                cor="green"
                                onClick={() => {
                                    form.setValue({
                                        redesSociais: [
                                            ...(form.values.redesSociais ?? []),
                                            { link: "" } as any,
                                        ],
                                    });
                                }}
                            />
                        </BoxApp>
                        {form.values.redesSociais.map((redeSocial, index) => (
                            <BoxApp
                                key={index}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                gap="10px"
                                padding="1rem"
                            >
                                <DropDownApp
                                    id={`RedeSocial${index}`}
                                    keyLabel="descricao"
                                    label="Tipo"
                                    values={redesSociaisOpcoes}
                                    value={redesSociaisOpcoes.find(
                                        (x) => x.id === redeSocial.redeSocialEnum
                                    )}
                                    onChange={(_, value) =>
                                        onChangeRedeSocial(index, redeSocial.link, value)
                                    }
                                />
                                <InputApp
                                    id={`link${index}`}
                                    label="Link"
                                    value={redeSocial.link}
                                    maxLength={500}
                                    onChange={(_, value) =>
                                        onChangeRedeSocial(index, value, redeSocial.redeSocialEnum)
                                    }
                                />
                                <IconButtonAppComTooltip
                                    icon={listaIcones.lixeira}
                                    cor="red"
                                    titulo=""
                                    onClick={async () =>
                                        await excluirRedeSocialLocal(redeSocial.id, index)
                                    }
                                />
                            </BoxApp>
                        ))}
                    </Card>
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow sm={6} xs={12}>
                    <Card>
                        {excluirTelefone.status === "loading" && (
                            <LoadingAppTexto comBox texto="Excluindo telefone" />
                        )}
                        <BoxApp display="flex" alignItems="center" justifyContent="center">
                            <TextApp texto="Telefones" />
                            <IconButtonAppComTooltip
                                icon={listaIcones.adicionar}
                                titulo="Adicione telefones"
                                cor="green"
                                onClick={() => {
                                    form.setValue({
                                        telefones: [
                                            ...(form.values.telefones ?? []),
                                            { telefone: "" } as any,
                                        ],
                                    });
                                }}
                            />
                        </BoxApp>
                        {form.values.telefones.map((telefone, index) => (
                            <BoxApp
                                key={index}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                gap="10px"
                                padding="1rem"
                            >
                                <InputApp
                                    id={`telefone${index}`}
                                    label="Telefone"
                                    value={telefone.telefone}
                                    mask={MaskType.TELEFONE}
                                    onChange={(_, value) => onChangeTelefone(index, value)}
                                />
                                <IconButtonAppComTooltip
                                    icon={listaIcones.lixeira}
                                    cor="red"
                                    titulo=""
                                    onClick={async () => excluirTelefoneLocal(telefone.id, index)}
                                />
                            </BoxApp>
                        ))}
                    </Card>
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
                            value={form.values.enderecoParceiro?.cep}
                            maxLength={8}
                        />
                        <IconConsultaCep
                            setEndereco={(endereco) =>
                                form.setValue({
                                    enderecoParceiro: endereco,
                                })
                            }
                            cep={form.values.enderecoParceiro?.cep}
                        />
                    </BoxApp>
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow sm={6} xs={12}>
                    <InputApp
                        label="Rua"
                        id="logradouro"
                        onChange={setEndereco}
                        value={form.values.enderecoParceiro?.logradouro}
                        maxLength={255}
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow sm={3} xs={12}>
                    <InputApp
                        label="N°"
                        id="numero"
                        onChange={setEndereco}
                        value={form.values.enderecoParceiro?.numero}
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
                        value={form.values.enderecoParceiro?.localidade}
                        maxLength={255}
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow sm={3} xs={12}>
                    <InputApp
                        label="Bairro"
                        id="bairro"
                        onChange={setEndereco}
                        value={form.values.enderecoParceiro?.bairro}
                        maxLength={255}
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow sm={3} xs={12}>
                    <InputApp
                        label="UF"
                        id="uf"
                        onChange={setEndereco}
                        value={form.values.enderecoParceiro?.uf}
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
                        value={form.values.enderecoParceiro?.complemento}
                        maxLength={255}
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
            {form.values.logo && (
                <img
                    src={formatarBase64(form.values.logo)}
                    alt="logo"
                    style={{ maxWidth: "300px" }}
                />
            )}
        </FormRoot.Form>
    );
}
