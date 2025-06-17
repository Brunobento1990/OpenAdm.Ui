"use client";

import { useEffect } from "react";
import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { useApiCategoria } from "src/@open-adm/api/use-api-categoria";
import { CheckBoxApp } from "src/@open-adm/components/check-box";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { InputApp } from "src/@open-adm/components/input/input-app";
import { InputFile } from "src/@open-adm/components/input/input-file";
import { useArquivo } from "src/@open-adm/hooks/use-arquivo";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { ICategoria } from "src/@open-adm/types/categoria";
import { IFormTypes } from "src/@open-adm/types/form";
import { rotasApp } from "src/configs/rotasApp";

export function CategoriaForm(props: IFormTypes) {
    const { create, obter, update } = useApiCategoria();
    const { navigate, id } = useNavigateApp();
    const { recortarBase64, resolveUploadImagem } = useArquivo();
    const form = useFormikAdapter<ICategoria>({
        initialValues: {
            descricao: "",
        },
        validationSchema: new YupAdapter().string("descricao").build(),
        onSubmit: submit,
    });

    async function submit() {
        const body = {
            ...form.values,
            novaFoto: form.values.novaFoto
                ? recortarBase64(form.values.novaFoto).base64
                : undefined,
        };
        const response =
            props.action === "create"
                ? await create.fetch(body)
                : await update.fetch(body);
        if (response) {
            navigate(rotasApp.categoria.pagincao);
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
            titulo="Categoria"
            loading={loading}
            readonly={readonly}
            submit={form.onSubmit}
            urlVoltar={rotasApp.categoria.pagincao}
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
                <FormRoot.FormItemRow marginTop="17px" sm={6} xs={12}>
                    <CheckBoxApp
                        label="Inativo Ecommerce"
                        value={form.values.inativoEcommerce}
                        onChange={form.onChange}
                        id="inativoEcommerce"
                        readonly={readonly}
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow sm={6} xs={12}>
                    <InputFile
                        accept={["image/*"]}
                        handleFileChange={async (arquivos) => {
                            if (arquivos && arquivos.length > 0) {
                                const novaFoto = await resolveUploadImagem(arquivos[0]);
                                form.setValue({ novaFoto });
                            }
                        }}
                        label="Selecione uma foto"
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow sm={6} xs={12}>
                    {form.values.novaFoto ? (
                        <>
                            <img
                                src={form.values.novaFoto}
                                style={{ maxWidth: "300px" }}
                                alt="categoria"
                            />
                        </>
                    ) : (
                        <>
                            {form.values.foto && (
                                <img
                                    src={form.values.foto}
                                    style={{ maxWidth: "300px" }}
                                    alt="categoria"
                                />
                            )}
                        </>
                    )}
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
        </FormRoot.Form>
    );
}
