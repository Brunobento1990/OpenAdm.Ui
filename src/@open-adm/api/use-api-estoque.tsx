import { rotasApi } from "src/configs/rotasApi";
import { useNewApi } from "../hooks/use-new-api";
import { IMovimentoProduto, IPosicaoEstoqueUpdate } from "../types/movimento-produto";


export function useApiEstoque() {
    const apiMovimentarProduto = useNewApi({
        method: "PUT",
        url: rotasApi.movimentoProduto.movimentar,
    });

    const apiObter = useNewApi({
        method: "GET",
        url: rotasApi.posicaoEstoque.obter,
    });

    const apiAtualizarEstoque = useNewApi({
        method: "PUT",
        url: rotasApi.posicaoEstoque.update,
    });

    async function movimentar(body: Partial<IMovimentoProduto>): Promise<any> {
        return await apiMovimentarProduto.fecth({
            body,
            message: "Movimentação concluida",
        });
    }

    async function update(body: Partial<IPosicaoEstoqueUpdate>): Promise<any> {
        return await apiAtualizarEstoque.fecth({
            body,
            message: "Movimentação concluida",
        });
    }

    async function obter(id: string): Promise<any> {
        return await apiObter.fecth({ urlParams: id });
    }

    return {
        movimentar: {
            fetch: movimentar,
            status: apiMovimentarProduto.statusRequisicao,
        },
        update: {
            fetch: update,
            status: apiAtualizarEstoque.statusRequisicao,
        },
        obter: {
            fetch: obter,
            status: apiObter.statusRequisicao,
        },
    };
}
