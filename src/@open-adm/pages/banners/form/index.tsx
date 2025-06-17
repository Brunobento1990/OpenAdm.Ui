"use client";

import { useEffect } from "react";
import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { useApiBanner } from "src/@open-adm/api/use-api-banner";
import { CheckBoxApp } from "src/@open-adm/components/check-box";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { InputFile } from "src/@open-adm/components/input/input-file";
import { useArquivo } from "src/@open-adm/hooks/use-arquivo";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { IBanner } from "src/@open-adm/types/banner";
import { IFormTypes } from "src/@open-adm/types/form";
import { rotasApp } from "src/configs/rotasApp";

export function BannerForm(props: IFormTypes) {
    const { create, obter, update } = useApiBanner();
    const { recortarBase64, resolveUploadImagem } = useArquivo();
    const { navigate, id } = useNavigateApp();
    const form = useFormikAdapter<IBanner>({
        initialValues: {
            foto: "",
            ativo: true,
        },
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
            navigate(rotasApp.banner.pagincao);
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

    useEffect(() => {
        init();
    }, []);

    return (
        <FormRoot.Form
            titulo="Banners"
            loading={loading}
            readonly={props.action === "view"}
            submit={form.onSubmit}
            urlVoltar={rotasApp.banner.pagincao}
        >
            <FormRoot.FormRow>
                <FormRoot.FormItemRow>
                    <CheckBoxApp
                        label="Ativo"
                        value={form.values.ativo}
                        onChange={form.onChange}
                        id="ativo"
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow>
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
                        label="Selecione o banner"
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
            {form.values.novaFoto ? (
                <img
                    src={form.values.novaFoto}
                    alt="banner"
                    style={{
                        maxWidth: "300px",
                    }}
                />
            ) : (
                <>
                    {form.values.foto && (
                        <img
                            src={form.values.foto}
                            alt="banner"
                            style={{
                                maxWidth: "300px",
                            }}
                        />
                    )}
                </>
            )}
        </FormRoot.Form>
    );
}
