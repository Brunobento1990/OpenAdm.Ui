import { rotasApi } from "src/configs/rotasApi";
import { useNewApi } from "../hooks/use-new-api";
import { IPedido } from "../types/pedido";


export function useApiPedido() {
    const apiDownLoadPdf = useNewApi({
        method: "GET",
        url: rotasApi.pedido.downloadPedido,
    });

    const apiObter = useNewApi({
        method: "GET",
        url: rotasApi.pedido.obter,
    });

    const apiCriar = useNewApi({
        method: "POST",
        url: rotasApi.pedido.criar,
    });

    const apiAtualizarStatus = useNewApi({
        method: "PUT",
        url: rotasApi.pedido.atualizaStatus,
    });

    async function downloadPedido(id: string): Promise<any> {
        return await apiDownLoadPdf.fecth({
            urlParams: `?pedidoId=${id}`,
        });
    }

    async function obter(id: string): Promise<IPedido | undefined> {
        return await apiObter.fecth({ urlParams: `?pedidoId=${id}` });
    }

    async function criar(body: Partial<IPedido>): Promise<IPedido | undefined> {
        return await apiCriar.fecth({
            body,
            message: "Pedido criado com sucesso",
        });
    }

    async function atualizarStatus(body: any): Promise<any> {
        return await apiAtualizarStatus.fecth({
            body,
            message: "Status atualizado com sucesso",
        });
    }

    return {
        downloadPedido: {
            fetch: downloadPedido,
            status: apiDownLoadPdf.statusRequisicao,
        },
        obter: {
            fetch: obter,
            status: apiObter.statusRequisicao,
        },
        atualizarStatus: {
            fetch: atualizarStatus,
            status: apiAtualizarStatus.statusRequisicao,
        },
        criar: {
            fetch: criar,
            status: apiCriar.statusRequisicao,
        },
    };
}
