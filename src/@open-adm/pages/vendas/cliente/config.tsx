import { maskCNPJ, maskCPF, maskPhone } from "src/@open-adm/utils/mask";

export const columns = [
    {
        flex: 0.200,
        minWidth: 200,
        field: 'nome',
        headerName: 'Nome',
    },
    {
        flex: 0.200,
        minWidth: 200,
        field: 'telefone',
        headerName: 'Telefone',
        renderCell: (params: any) => maskPhone(params.row?.telefone)
    },
    {
        flex: 0.200,
        minWidth: 200,
        field: 'cpf',
        headerName: 'CPF/CNPJ',
        renderCell: (params: any) => params.row?.cpf ? maskCPF(params.row.cpf) : maskCNPJ(params.row?.cnpj)
    },
]