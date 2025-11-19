"use client";

import { useEffect } from "react";
import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { useApiConfiguracaoPedido } from "src/@open-adm/api/use-api-configuracao-pedido";
import { CheckBoxApp } from "src/@open-adm/components/check-box";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { InputApp, MaskType } from "src/@open-adm/components/input/input-app";
import { IConfiguracaoDePedido } from "src/@open-adm/types/configuracao-pedido";
import { cleanFormatMoney } from "src/@open-adm/utils/format-money";
import { clearMaskPhone } from "src/@open-adm/utils/mask";

export function ConfiguracaoPedidoForm() {
    const { obter, update } = useApiConfiguracaoPedido();

    const form = useFormikAdapter<IConfiguracaoDePedido>({
        initialValues: { emailDeEnvio: "" },
        validationSchema: new YupAdapter().string("emailDeEnvio").build(),
        onSubmit: submit,
    });

    async function submit() {
        await update.fetch({
            ...form.values,
            whatsApp: clearMaskPhone(form.values.whatsApp),
            pedidoMinimoAtacado: cleanFormatMoney(form.values.pedidoMinimoAtacado),
            pedidoMinimoVarejo: cleanFormatMoney(form.values.pedidoMinimoVarejo)
        });
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

    const loading = obter.status === "loading" || update.status === "loading";

    return (
        <FormRoot.Form
            titulo="Configuração de pedido"
            submit={form.onSubmit}
            loading={loading}
        >
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <InputApp
                        label="E-mail de envio"
                        name="emailDeEnvio"
                        id="emailDeEnvio"
                        value={form.values.emailDeEnvio}
                        onBlur={form.onBlur}
                        onChange={form.onChange}
                        helperText={form.helperText("emailDeEnvio")}
                        error={form.error("emailDeEnvio")}
                        maxLength={255}
                        type="email"
                        required
                        autoFocus
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <InputApp
                        label="WhatsApp de envio"
                        name="whatsApp"
                        id="whatsApp"
                        value={form.values.whatsApp}
                        onBlur={form.onBlur}
                        onChange={form.onChange}
                        maxLength={255}
                        mask={MaskType.TELEFONE}
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <InputApp
                        label="Pedido minimo no atacado"
                        name="pedidoMinimoAtacado"
                        id="pedidoMinimoAtacado"
                        value={form.values.pedidoMinimoAtacado}
                        onBlur={form.onBlur}
                        onChange={form.onChange}
                        mask={MaskType.MONEY}
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <InputApp
                        label="Pedido minimo no varejo"
                        name="pedidoMinimoVarejo"
                        id="pedidoMinimoVarejo"
                        value={form.values.pedidoMinimoVarejo}
                        onBlur={form.onBlur}
                        onChange={form.onChange}
                        mask={MaskType.MONEY}
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
            <FormRoot.FormRow>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <CheckBoxApp
                        label="Venda de produto somente com estoque"
                        id="vendaDeProdutoComEstoque"
                        value={form.values.vendaDeProdutoComEstoque}
                        onChange={form.onChange}
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
        </FormRoot.Form>
    );
}
