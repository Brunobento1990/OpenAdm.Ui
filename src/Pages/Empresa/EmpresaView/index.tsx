import { useEffect } from "react";
import { useApi } from "../../../Service/useApi";

export function EmpresaView(){

    const api = useApi();

    async function init(){
        const empresa = await api.getEmpresa();
        console.log(empresa)
    }

    useEffect(() => {
        init();
    },[])

    return(<></>)
}