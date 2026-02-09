import { useState } from "react";
import { useApiEstoque } from "src/@open-adm/api/use-api-estoque";
import { BoxApp } from "src/@open-adm/components/box";
import { ButtonApp } from "src/@open-adm/components/buttons";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { InputApp } from "src/@open-adm/components/input/input-app";
import { ModalWithChildren } from "src/@open-adm/components/modal";
import { TextApp } from "src/@open-adm/components/text";
import { ITodosEstoqueProdutos } from "src/@open-adm/types/estoque";

interface ModalEstoqueProps {
    produtoId: string;
}

export function ModalEstoque(props: ModalEstoqueProps) {
    const [todosEstoqueProdutosState, setTodosEstoqueProdutosState] = useState<ITodosEstoqueProdutos>();
    const { todosEstoqueProdutos, updateEstoques } = useApiEstoque();

    async function openModal() {
        const response = await todosEstoqueProdutos.fetch(props.produtoId);
        setTodosEstoqueProdutosState(response);
    }

    function closeModal() {
        setTodosEstoqueProdutosState(undefined);
    }

    function atualizarEstoque(index: number, quantidade: number) {
        if (!todosEstoqueProdutosState) return;

        const novosDados = [...todosEstoqueProdutosState.dados];
        novosDados[index] = {
            ...novosDados[index],
            quantidade,
        };

        setTodosEstoqueProdutosState({
            ...todosEstoqueProdutosState,
            dados: novosDados,
        });
    }

    async function submit() {
        if (!todosEstoqueProdutosState || !todosEstoqueProdutosState.dados) {
            return;
        }

        const response = await updateEstoques.fetch({
            dados: todosEstoqueProdutosState.dados.map(estoque => ({
                id: estoque.id,
                quantidade: estoque.quantidade,
            })),
        })

        if (response && response.resultado) {
            closeModal();
        }
    }

    const produto = todosEstoqueProdutosState && todosEstoqueProdutosState.dados ?
        todosEstoqueProdutosState.dados[0]?.produto :
        undefined;

    return (
        <>
            <ModalWithChildren
                open={!!todosEstoqueProdutosState}
                close={closeModal}
                desabilitarFooter
            >
                <TextApp texto={`Estoque produto: ${produto ?? ''}`} fontSize="20px" fontWeight={600} />
                <FormRoot.FormRow spacing={2}>
                    <>{todosEstoqueProdutosState && todosEstoqueProdutosState.dados.map((estoque, index) => (
                        <FormRoot.FormItemRow key={estoque.id} sm={4} xs={12}>
                            <InputApp
                                label={`${estoque.peso ? `Peso: ${estoque.peso}` : ''} ${estoque.tamanho ? `Tamanho: ${estoque.tamanho}` : ''}`}
                                autoFocus={index === 0}
                                id={`estoque-${estoque.id}`}
                                value={estoque.quantidade}
                                type="number"
                                onChange={(_, value) => atualizarEstoque(index, Number(value))}
                            />
                        </FormRoot.FormItemRow>
                    ))}</>
                </FormRoot.FormRow>
                <BoxApp display="flex" justifyContent="end" marginTop="1rem">
                    <ButtonApp variant="contained" onClick={submit} title="Salvar" loading={updateEstoques.status === "loading"} />
                </BoxApp>
            </ModalWithChildren>
            <ButtonApp
                variant="outlined"
                title="Estoque"
                onClick={openModal}
                loading={todosEstoqueProdutos.status === "loading"}
            />
        </>
    )
}