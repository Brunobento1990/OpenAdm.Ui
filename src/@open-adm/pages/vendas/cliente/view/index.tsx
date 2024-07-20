import { useEffect, useState } from "react";
import { useApiCliente } from "../form/use-api-cliente"
import { ICliente } from "src/@open-adm/types/cliente";
import { Card } from "@mui/material";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";

export function ClienteView() {
    const [cliente, setCliente] = useState<ICliente>();
    const { id } = useNavigateApp();
    const { get } = useApiCliente();

    async function init() {
        try {
            const response = await get(id);
            if (response) {
                setCliente(response);
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        init();
    }, [])

    if (!cliente) {
        return <p>Carregando...</p>
    }

    return (
        <Card>
            <p>{cliente.nome}</p>
        </Card>
    )
}