import { rotasApi } from "src/configs/rotasApi";
import { useNewApi } from "../hooks/use-new-api";
import { IItensTabelaDePreco, ITabelaDePreco } from "../types/tabela-de-preco";


export function useApiTabelaDePreco() {
  const apiTabelaAtiva = useNewApi({
    method: "GET",
    url: "tabelas-de-precos/get-tabela-by-produtoId?produtoId=",
  });

  const apiCreate = useNewApi({
    method: "POST",
    url: rotasApi.tabelaDePreco.create,
  });

  const apiListarItens = useNewApi({
    method: "GET",
    url: rotasApi.tabelaDePreco.listarItens,
  });

  const apiUpdate = useNewApi({
    method: "PUT",
    url: rotasApi.tabelaDePreco.editar,
  });

  const apiObter = useNewApi({
    method: "GET",
    url: rotasApi.tabelaDePreco.obter,
  });

  async function obterTabelaDePrecoAtivaPorProdutoId(
    produtoId?: string
  ): Promise<ITabelaDePreco | undefined> {
    return await apiTabelaAtiva.fecth({ urlParams: produtoId ?? "" });
  }

  async function criar(
    body: Partial<ITabelaDePreco>
  ): Promise<ITabelaDePreco | undefined> {
    return await apiCreate.fecth({ body });
  }

  async function editar(
    body: Partial<ITabelaDePreco>
  ): Promise<ITabelaDePreco | undefined> {
    return await apiUpdate.fecth({ body });
  }

  async function obter(id: string): Promise<ITabelaDePreco | undefined> {
    return await apiObter.fecth({ urlParams: `?id=${id}` });
  }

  async function listarItens(
    tabelaDePrecoId: string
  ): Promise<IItensTabelaDePreco[] | undefined> {
    return await apiListarItens.fecth({
      urlParams: `?tabelaDePrecoId=${tabelaDePrecoId}`,
    });
  }

  return {
    obterTabelaDePrecoAtivaPorProdutoId: {
      fetch: obterTabelaDePrecoAtivaPorProdutoId,
    },
    criar: {
      fetch: criar,
      status: apiCreate.statusRequisicao,
    },
    editar: {
      fetch: editar,
      status: apiUpdate.statusRequisicao,
    },
    obter: {
      fetch: obter,
      status: apiObter.statusRequisicao,
    },
    listarItens: {
      fetch: listarItens,
      status: apiListarItens.statusRequisicao,
    },
  };
}
