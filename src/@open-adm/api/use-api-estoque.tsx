import { rotasApi } from "src/configs/rotasApi";
import { useNewApi } from "../hooks/use-new-api";
import { IMovimentoProduto, IPosicaoEstoqueUpdate } from "../types/movimento-produto";
import { ITodosEstoqueProdutos, IUpdateEstoques } from "../types/estoque";


export function useApiEstoque() {
    const apiMovimentarProduto = useNewApi({
        method: "PUT",
        url: rotasApi.movimentoProduto.movimentar,
    });

    const apiObter = useNewApi({
        method: "GET",
        url: rotasApi.posicaoEstoque.obter,
    });

    const apiObterTodosEstoqueProdutos = useNewApi({
        method: "GET",
        url: rotasApi.posicaoEstoque.todosEstoqueProdutos,
    });

    const apiUpdateEstoques = useNewApi({
        method: "PUT",
        url: rotasApi.posicaoEstoque.updateEstoques,
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

    async function todosEstoqueProdutos(produtoId: string): Promise<ITodosEstoqueProdutos | undefined> {
        return await apiObterTodosEstoqueProdutos.fecth({ urlParams: produtoId });
    }

    async function updateEstoques(body: IUpdateEstoques): Promise<any> {
        return await apiUpdateEstoques.fecth({
            body,
            message: "Atualização de estoque concluida",
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
        todosEstoqueProdutos: {
            fetch: todosEstoqueProdutos,
            status: apiObterTodosEstoqueProdutos.statusRequisicao,
        },
        updateEstoques: {
            fetch: updateEstoques,
            status: apiUpdateEstoques.statusRequisicao,
        },
    };
}
