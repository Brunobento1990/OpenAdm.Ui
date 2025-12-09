import { useState } from "react";
import { useConfig } from "./config";
import { TableIndex } from "src/@open-adm/components/table-paginacao";
import { RadioApp } from "src/@open-adm/components/radio";

export function Pedidos() {
    const [status, setStatus] = useState(0)
    const config = useConfig();
    function filtro() {
        return (
            <RadioApp
                id="statusPedido"
                label="Filtro status do pedido"
                options={[
                    {
                        label: 'Todos',
                        value: 0
                    },
                    {
                        label: 'Em aberto',
                        value: 1
                    },
                    {
                        label: 'Faturado',
                        value: 2
                    },
                    {
                        label: 'Em entrega',
                        value: 3
                    },
                    {
                        label: 'Entregue',
                        value: 4
                    },
                    {
                        label: 'Cancelado',
                        value: 5
                    }
                ]}
                row
                value={status}
                onChange={(_, value) => {
                    if (typeof value === 'number') {
                        setStatus(value)
                    } else {
                        setStatus(parseInt(value))
                    }
                }}
            />
        )
    }
    return (
        <TableIndex
            columns={config.columns}
            url="pedidos/paginacao"
            urlDelete="pedidos/delete"
            urlView="pedidos/view"
            urlAdd="pedidos/create"
            childrenHeader={filtro()}
            filtroComplementar={{
                statusPedido: status > 0 ? status - 1 : undefined
            }}
            refreshPai={status}
            nomeDaTabela='pedidos'
        />
    )
}