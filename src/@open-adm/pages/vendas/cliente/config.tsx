import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";
import { useApiCliente } from "src/@open-adm/api/use-api-cliente";
import { IconButtonAppComTooltip } from "src/@open-adm/components/icon/icon-button-app-tool-tip";
import { useModal } from "src/@open-adm/components/modal/modal";
import { TypeColumns } from "src/@open-adm/components/table/tabela-com-drag";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { ICliente } from "src/@open-adm/types/cliente";
import { maskCNPJ, maskCPF, maskPhone } from "src/@open-adm/utils/mask";

export function useColumns() {
    const { navigate } = useNavigateApp();
    const { ativarInativar } = useApiCliente()
    const { show, close } = useModal()

    function ativarCadastro(cliente: ICliente) {
        const mensagem = cliente.ativo ? `Deseja bloquear o acesso do cliente: ' ${cliente.nome}' ?` : `Deseja ativar o acesso do cliente: ' ${cliente.nome}' ?`
        show({
            confirmed: async () => {
                const response = await ativarInativar.fetch(cliente.id || "");
                if (response) {
                    close();
                }
            },
            message: mensagem
        })
    }

    const columns: TypeColumns[] = [
        {
            width: 200,
            field: 'nome',
            headerName: 'Nome',
            sortable: true,
        },
        {
            width: 200,
            field: 'senha',
            headerName: 'Atualizar senha',
            cellRenderer: (params: { data: any }) => {
                return (
                    <IconButton onClick={() => navigate(`/vendas/cliente/atualizar-senha-adm/${params.data.id}`)}>
                        <Icon icon="material-symbols-light:refresh-rounded" />
                    </IconButton>
                )
            }
        },
        {
            width: 200,
            field: 'ativarAcesso',
            headerName: 'Ativar/Bloquear Acesso',
            cellRenderer: (params: { data: any }) => {
                return (
                    <IconButtonAppComTooltip
                        titulo={params.data?.ativo ? "Bloquear Acesso" : "Ativar Acesso"}
                        icon={!params.data?.ativo ? "fontisto:checkbox-active" : "material-symbols:block-outline"}
                        onClick={() => ativarCadastro(params.data)}
                    />
                )
            }
        },
        {
            width: 200,
            field: 'telefone',
            headerName: 'Telefone',
            cellRenderer: (params: { data: any }) => maskPhone(params.data?.telefone)
        },
        {
            width: 200,
            field: 'cpf',
            headerName: 'CPF/CNPJ',
            cellRenderer: (params: { data: any }) => params.data?.cpf ? maskCPF(params.data.cpf) : maskCNPJ(params.data?.cnpj)
        },
    ]

    return {
        columns
    }
}
