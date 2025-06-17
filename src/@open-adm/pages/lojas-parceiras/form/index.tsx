"use client";

import { useEffect } from "react";
import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { useApiLojasParceiras } from "src/@open-adm/api/use-api-lojas-parceiras";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { InputApp, MaskType } from "src/@open-adm/components/input/input-app";
import { InputFile } from "src/@open-adm/components/input/input-file";
import { useArquivo } from "src/@open-adm/hooks/use-arquivo";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { IFormTypes } from "src/@open-adm/types/form";
import { ILojasParceiras } from "src/@open-adm/types/lojas-parceiras";
import { clearMaskPhone } from "src/@open-adm/utils/mask";
import { rotasApp } from "src/configs/rotasApp";

export function LojasParceirasForm(props: IFormTypes) {
    const { create, obter, update } = useApiLojasParceiras();
    const { navigate, id } = useNavigateApp();
    const { recortarBase64, resolveUploadImagem } = useArquivo();
    const readonly = props.action === "view";
    const form = useFormikAdapter<ILojasParceiras>({
        initialValues: {
            nome: "",
        },
        validationSchema: new YupAdapter().string("nome").build(),
        onSubmit: submit,
    });

    async function init() {
        if (props.action === "create") {
            return;
        }

        const response = await obter.fetch(id as string);
        if (response) {
            form.setValue(response);
        }
    }

    async function submit() {
        const body = {
            ...form.values,
            novaFoto: form.values.novaFoto
                ? recortarBase64(form.values.novaFoto).base64
                : undefined,
            contato: clearMaskPhone(form.values.contato),
        };

        const response =
            props.action === "create"
                ? await create.fetch(body)
                : await update.fetch(body);

        if (response) {
            navigate(rotasApp.lojasParceiras.pagincao);
        }
    }

    const loading =
        create.status === "loading" ||
        update.status === "loading" ||
        obter.status === "loading";

    useEffect(() => {
        init();
    }, []);

    return (
        <FormRoot.Form
            submit={form.onSubmit}
            readonly={readonly}
            titulo="Lojas parceiras"
            loading={loading}
            urlVoltar={rotasApp.lojasParceiras.pagincao}
        >
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow sm={6} xs={12}>
                    <InputApp
                        label="Nome"
                        id="nome"
                        value={form.values.nome}
                        maxLength={255}
                        onChange={form.onChange}
                        onBlur={form.onBlur}
                        autoFocus
                        error={form.error("nome")}
                        helperText={form.helperText("nome")}
                        required
                        readonly={readonly}
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow sm={6} xs={12}>
                    <InputApp
                        label="Contato"
                        id="contato"
                        value={form.values.contato}
                        onChange={form.onChange}
                        onBlur={form.onBlur}
                        mask={MaskType.TELEFONE}
                        readonly={readonly}
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow sm={6} xs={12}>
                    <InputApp
                        label="Link do facebook"
                        id="facebook"
                        value={form.values.facebook}
                        maxLength={255}
                        onChange={form.onChange}
                        onBlur={form.onBlur}
                        readonly={readonly}
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow sm={6} xs={12}>
                    <InputApp
                        label="Link do instagram"
                        id="instagram"
                        value={form.values.instagram}
                        maxLength={255}
                        onChange={form.onChange}
                        onBlur={form.onBlur}
                        readonly={readonly}
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow sm={6} xs={12}>
                    <InputApp
                        label="Endereço"
                        id="endereco"
                        value={form.values.endereco}
                        maxLength={255}
                        onChange={form.onChange}
                        onBlur={form.onBlur}
                        readonly={readonly}
                    />
                </FormRoot.FormItemRow>
                {!readonly && (
                    <FormRoot.FormItemRow sm={6} xs={12} marginTop="18px">
                        <InputFile
                            accept={["image/*"]}
                            handleFileChange={async (arquivos) => {
                                if (arquivos && arquivos.length > 0) {
                                    const novaFoto = await resolveUploadImagem(arquivos[0]);
                                    form.setValue({
                                        novaFoto,
                                    });
                                }
                            }}
                            label="Selecione uma logo"
                        />
                    </FormRoot.FormItemRow>
                )}
            </FormRoot.FormRow>
            {form.values.novaFoto ? (
                <>
                    <img
                        src={form.values.novaFoto}
                        alt="logo"
                        style={{ maxWidth: "300px" }}
                    />
                </>
            ) : (
                <>
                    {form.values.foto && (
                        <img
                            src={form.values.foto}
                            alt="logo"
                            style={{ maxWidth: "300px" }}
                        />
                    )}
                </>
            )}
        </FormRoot.Form>
    );
}
