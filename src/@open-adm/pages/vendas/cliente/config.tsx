import { maskCNPJ, maskCPF, maskPhone } from "src/@open-adm/utils/mask";

export const columns = [
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