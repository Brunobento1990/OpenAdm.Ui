"use client";

import { useState } from "react";
import { columns } from "./config";
import { TableIndex } from "src/@open-adm/components/table-paginacao";
import { BoxApp } from "src/@open-adm/components/box";
import { DropDownAutoFetchApp } from "src/@open-adm/components/drop-down/drop-down-auto-fetch-app";
import { IProduto } from "src/@open-adm/types/produto";
import { IPeso } from "src/@open-adm/types/peso";
import { ITamanho } from "src/@open-adm/types/tamanho";

export function EstoqueProduto() {
    const [filtros, setFiltros] = useState<IFiltroEstoque>({});
    return (
        <TableIndex
            columns={columns}
            url="estoques/paginacao"
            take={10}
            urlEdit="posicao-estoque/edit"
            filtroChildren={<ModalFiltroEstoque filtros={filtros} setFiltros={setFiltros} />}
            minWidth={1300}
            filtroComplementar={{
                produtoId: filtros?.produtoId,
                pesoId: filtros?.pesoId,
                tamanhoId: filtros?.tamanhoId
            }}
            nomeDaTabela="estoques"
        />
    )
}

interface ModalFiltroEstoqueProps {
    filtros: IFiltroEstoque;
    setFiltros: (filtros: IFiltroEstoque) => void;
}

function ModalFiltroEstoque(props: ModalFiltroEstoqueProps) {
    return (
        <BoxApp marginBottom="1rem">
            <DropDownAutoFetchApp
                onChange={(_, value) => {
                    props.setFiltros({
                        ...props.filtros,
                        produto: value,
                        produtoId: value?.id
                    })
                }}
                value={props.filtros.produto}
                method="GET"
                label="Produto"
                id="produtoId"
                keyLabel="descricao"
                url="produtos/all-list"
            />
            <DropDownAutoFetchApp
                onChange={(_, value) => {
                    props.setFiltros({
                        ...props.filtros,
                        tamanho: value,
                        tamanhoId: value?.id
                    })
                }}
                value={props.filtros.tamanho}
                method="GET"
                label="Tamanho"
                id="tamanhoId"
                keyLabel="descricao"
                url="tamanhos/list"
            />
            <DropDownAutoFetchApp
                onChange={(_, value) => {
                    props.setFiltros({
                        ...props.filtros,
                        peso: value,
                        pesoId: value?.id
                    })
                }}
                value={props.filtros.peso}
                method="GET"
                label="Peso"
                id="pesoId"
                keyLabel="descricao"
                url="pesos/list"
            />
        </BoxApp>
    )
}

interface IFiltroEstoque {
    produtoId?: string;
    produto?: IProduto;
    pesoId?: string;
    peso?: IPeso;
    tamanhoId?: string;
    tamanho?: ITamanho;
}