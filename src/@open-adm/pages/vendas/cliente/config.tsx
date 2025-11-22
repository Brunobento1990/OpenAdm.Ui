import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";
import { useApiCliente } from "src/@open-adm/api/use-api-cliente";
import { IconButtonAppComTooltip } from "src/@open-adm/components/icon/icon-button-app-tool-tip";
import { useModal } from "src/@open-adm/components/modal/modal";
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

    const columns = [
        {
            flex: 0.200,
            minWidth: 200,
            field: 'nome',
            headerName: 'Nome',
            sortable: true,
        },
        {
            flex: 0.200,
            minWidth: 200,
            field: 'senha',
            headerName: 'Atualizar senha',
            renderCell: (params: any) => {
                return (
                    <IconButton onClick={() => navigate(`/vendas/cliente/atualizar-senha-adm/${params.id}`)}>
                        <Icon icon="material-symbols-light:refresh-rounded" />
                    </IconButton>
                )
            }
        },
        {
            flex: 0.200,
            minWidth: 200,
            field: 'ativarAcesso',
            headerName: 'Ativar/Bloquear Acesso',
            renderCell: (params: any) => {
                return (
                    <IconButtonAppComTooltip
                        titulo={params?.ativo ? "Bloquear Acesso" : "Ativar Acesso"}
                        icon={!params?.ativo ? "fontisto:checkbox-active" : "material-symbols:block-outline"}
                        onClick={() => ativarCadastro(params)}
                    />
                )
            }
        },
        {
            flex: 0.200,
            minWidth: 200,
            field: 'telefone',
            headerName: 'Telefone',
            renderCell: (params: any) => maskPhone(params?.telefone)
        },
        {
            flex: 0.200,
            minWidth: 200,
            field: 'cpf',
            headerName: 'CPF/CNPJ',
            renderCell: (params: any) => params?.cpf ? maskCPF(params.cpf) : maskCNPJ(params?.cnpj)
        },
    ]

    return {
        columns
    }
}
