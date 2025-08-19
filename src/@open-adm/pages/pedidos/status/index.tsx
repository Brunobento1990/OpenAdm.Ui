"use client";

import { useEffect } from "react";
import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { useApiPedido } from "src/@open-adm/api/UseApiPedido";
import { BoxApp } from "src/@open-adm/components/box";
import { DividerApp } from "src/@open-adm/components/divider";
import { DropDownApp } from "src/@open-adm/components/drop-down/drop-down-app";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { TextApp } from "src/@open-adm/components/text";
import { opcoesStatusPedido } from "src/@open-adm/enuns/status-pedido";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { IPedido } from "src/@open-adm/types/pedido";
import { formatDateComHoras } from "src/@open-adm/utils/convert-date";
import { formatMoney } from "src/@open-adm/utils/format-money";
import { rotasApp } from "src/configs/rotasApp";

export function ModificarStatusPedidoForm() {
    const { obter, atualizarStatus } = useApiPedido();
    const { navigate, id } = useNavigateApp();
    const form = useFormikAdapter<IPedido>({
        onSubmit: submit,
    });

    async function init() {
        const response = await obter.fetch(id as string);
        if (response) {
            form.setValue(response);
        }
    }

    async function submit() {
        const response = await atualizarStatus.fetch({
            pedidoId: form.values.id,
            statusPedido: form.values.statusPedido,
        });
        if (response) {
            navigate(rotasApp.pedido.paginacao);
        }
    }

    useEffect(() => {
        init();
    }, []);

    const loading =
        obter.status === "loading" || atualizarStatus.status === "loading";

    return (
        <FormRoot.Form
            submit={form.onSubmit}
            loading={loading}
            titulo="Status do pedido"
            urlVoltar={rotasApp.pedido.paginacao}
        >
            <BoxApp>
                <TextApp texto={`N°: #${form.values.numero}`} />
                <TextApp
                    texto={`Data de cadastro: ${formatDateComHoras(
                        form.values.dataDeCriacao
                    )}`}
                />
                <TextApp
                    texto={`Ultima atualização: ${formatDateComHoras(
                        form.values.dataDeAtualizacao
                    )}`}
                />
                <TextApp texto={`Cliente: ${form.values.usuario}`} />
                <TextApp texto={`Total: ${formatMoney(form.values.valorTotal)}`} />
            </BoxApp>
            <DividerApp
                color="primary"
                chip="Selecione o status"
                marginTop="1rem"
                marginBotton="1rem"
            />
            <DropDownApp
                id="statusPedido"
                keyLabel="label"
                label="Status"
                required
                onChange={form.onChange}
                values={opcoesStatusPedido}
                value={opcoesStatusPedido.find(
                    (x) => x.id === form.values.statusPedido
                )}
            />
        </FormRoot.Form>
    );
}
