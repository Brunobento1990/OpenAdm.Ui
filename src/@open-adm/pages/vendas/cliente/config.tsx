import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { maskCNPJ, maskCPF, maskPhone } from "src/@open-adm/utils/mask";

export function useColumns() {
    const { navigate } = useNavigateApp();
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
