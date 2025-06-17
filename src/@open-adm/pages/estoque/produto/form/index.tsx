"use client";

import { useEffect, useState } from "react";
import { CollapseApp } from "src/@core/components/collapse";
import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { useApiProduto } from "src/@open-adm/api/use-api-produto";
import { useApiTabelaDePreco } from "src/@open-adm/api/UseApiTabelaDePreco";
import { BoxApp } from "src/@open-adm/components/box";
import { DividerApp } from "src/@open-adm/components/divider";
import { DropDownAutoFetchApp } from "src/@open-adm/components/drop-down/drop-down-auto-fetch-app";
import { DropDownMultiploFetchApp } from "src/@open-adm/components/drop-down/drop-down-multiplo-fetch-app";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { FormItemRow } from "src/@open-adm/components/form/item-row";
import { InputApp, MaskType } from "src/@open-adm/components/input/input-app";
import { InputFile } from "src/@open-adm/components/input/input-file";
import { TextApp } from "src/@open-adm/components/text";
import { useArquivo } from "src/@open-adm/hooks/use-arquivo";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { useTabApp } from "src/@open-adm/hooks/use-tab-app";
import { IFormTypes } from "src/@open-adm/types/form";
import { IPeso } from "src/@open-adm/types/peso";
import { IProduto } from "src/@open-adm/types/produto";
import { IItensTabelaDePreco, ITabelaDePreco } from "src/@open-adm/types/tabela-de-preco";
import { ITamanho } from "src/@open-adm/types/tamanho";
import { clearMaskMoney } from "src/@open-adm/utils/mask";
import { rotasApp } from "src/configs/rotasApp";

export function ProdutoForm(props: IFormTypes) {
    const { create, obter, update } = useApiProduto();
    const { navigate, id } = useNavigateApp();
    const { obterTabelaDePrecoAtivaPorProdutoId } = useApiTabelaDePreco();
    const { recortarBase64, resolveUploadImagem } = useArquivo();
    const [tabelaDePreco, setTabelaDePreco] = useState<ITabelaDePreco>();
    const [itensTabelaDePreco, setItensTabelaDePreco] = useState<
        IItensTabelaDePreco[]
    >([]);
    const Tab = useTabApp();
    const form = useFormikAdapter<IProduto>({
        initialValues: {
            descricao: "",
            categoriaId: "",
        },
        validationSchema: new YupAdapter()
            .string("descricao")
            .string("categoriaId")
            .build(),
        onSubmit: submit,
    });

    async function submit() {
        const body = {
            ...form.values,
            novaFoto: form.values.novaFoto
                ? recortarBase64(form.values.novaFoto).base64
                : undefined,
            tamanhosIds: form.values.tamanhos?.map((x) => x.id),
            pesosIds: form.values.pesos?.map((x) => x.id),
            tabelaDePrecoId: tabelaDePreco?.id,
            itensTabelaDePreco,
        };
        const response =
            props.action === "create"
                ? await create.fetch(body)
                : await update.fetch(body);
        if (response) {
            navigate(rotasApp.produto.pagincao);
        }
    }

    async function init() {
        const responseTabelaDePreco =
            await obterTabelaDePrecoAtivaPorProdutoId.fetch(id as string);
        setTabelaDePreco(responseTabelaDePreco);

        if (responseTabelaDePreco?.itensTabelaDePreco) {
            setItensTabelaDePreco(responseTabelaDePreco.itensTabelaDePreco);
        }

        if (props.action === "create") {
            return;
        }
        const response = await obter.fetch(id as string);

        if (response) {
            form.setValue(response);
        }
    }

    function onChangePrecoPeso(peso: IPeso, valor: string, key: string) {
        const item = itensTabelaDePreco.find((x) => x.pesoId === peso.id);
        setItensTabelaDePreco((state) => [
            ...state.filter((x) => x.pesoId !== peso.id),
            {
                ...(item ?? {}),
                [key]: clearMaskMoney(valor),
                pesoId: peso.id,
                produtoId: form.values.id,
            } as any,
        ]);
    }

    function onChangePrecoTamanho(tamanho: ITamanho, valor: string, key: string) {
        const item = itensTabelaDePreco.find((x) => x.tamanhoId === tamanho.id);
        setItensTabelaDePreco((state) => [
            ...state.filter((x) => x.tamanhoId !== tamanho.id),
            {
                ...(item ?? {}),
                [key]: clearMaskMoney(valor),
                tamanhoId: tamanho.id,
                produtoId: form.values.id,
            } as any,
        ]);
    }

    const readonly = props.action === "view";
    const loading =
        create.status === "loading" ||
        update.status === "loading" ||
        obter.status === "loading";

    useEffect(() => {
        init();
    }, []);

    return (
        <FormRoot.Form
            loading={loading}
            submit={form.onSubmit}
            titulo="Produto"
            urlVoltar={rotasApp.produto.pagincao}
            readonly={readonly}
        >
            <Tab.Component tabs={[{ titulo: "Produto" }, { titulo: "Preços" }]} />
            <CollapseApp in={Tab.value === 0}>
                <FormRoot.FormRow spacing={3} marginTop="1rem">
                    <FormRoot.FormItemRow sm={6} xs={12}>
                        <InputApp
                            label="Descrição"
                            autoFocus
                            helperText={form.helperText("descricao")}
                            id="descricao"
                            error={form.error("descricao")}
                            value={form.values.descricao}
                            maxLength={255}
                            onBlur={form.onBlur}
                            onChange={form.onChange}
                            readonly={readonly}
                            required
                        />
                    </FormRoot.FormItemRow>
                    <FormRoot.FormItemRow sm={6} xs={12}>
                        <InputApp
                            label="Especificação técnica"
                            id="especificacaoTecnica"
                            value={form.values.especificacaoTecnica}
                            maxLength={255}
                            onBlur={form.onBlur}
                            onChange={form.onChange}
                            readonly={readonly}
                        />
                    </FormRoot.FormItemRow>
                </FormRoot.FormRow>
                <FormRoot.FormRow spacing={3}>
                    <FormRoot.FormItemRow sm={6} xs={12}>
                        <InputApp
                            label="Referência"
                            id="referencia"
                            value={form.values.referencia}
                            maxLength={255}
                            onBlur={form.onBlur}
                            onChange={form.onChange}
                            readonly={readonly}
                        />
                    </FormRoot.FormItemRow>
                    <FormRoot.FormItemRow sm={6} xs={12}>
                        <InputApp
                            label="Peso para frete (gramas)"
                            id="peso"
                            value={form.values.peso}
                            maxLength={255}
                            type="number"
                            onBlur={form.onBlur}
                            onChange={form.onChange}
                            readonly={readonly}
                        />
                    </FormRoot.FormItemRow>
                </FormRoot.FormRow>
                <FormRoot.FormRow spacing={3}>
                    <FormRoot.FormItemRow sm={6} xs={12}>
                        <DropDownMultiploFetchApp
                            id="pesos"
                            values={form.values.pesos ?? []}
                            keyLabel="descricao"
                            label="Pesos"
                            url="/pesos/list"
                            onChange={(_, values: IPeso[]) => {
                                const pesos = values ?? [];
                                form.setValue({
                                    pesos,
                                });
                                let novosItens: IItensTabelaDePreco[] = [];
                                for (const item of itensTabelaDePreco) {
                                    const temItem = pesos.some((x) => x.id === item.pesoId);
                                    if (temItem || !item.pesoId) {
                                        novosItens.push(item);
                                    }
                                }
                                setItensTabelaDePreco(novosItens);
                            }}
                            readonly={readonly}
                            defaultValues={form.values.pesos}
                        />
                    </FormRoot.FormItemRow>
                    <FormRoot.FormItemRow sm={6} xs={12}>
                        <DropDownMultiploFetchApp
                            id="tamanhos"
                            keyLabel="descricao"
                            label="Tamanhos"
                            values={form.values.tamanhos ?? []}
                            url="/tamanhos/list"
                            onChange={(_, values: ITamanho[]) => {
                                const tamanhos = values ?? [];
                                form.setValue({
                                    tamanhos,
                                });
                                let novosItens: IItensTabelaDePreco[] = [];
                                for (const item of itensTabelaDePreco) {
                                    const temItem = tamanhos.some((x) => x.id === item.tamanhoId);
                                    if (temItem || !item.tamanhoId) {
                                        novosItens.push(item);
                                    }
                                }
                                setItensTabelaDePreco(novosItens);
                            }}
                            readonly={readonly}
                            defaultValues={form.values.tamanhos}
                        />
                    </FormRoot.FormItemRow>
                </FormRoot.FormRow>
                <FormRoot.FormRow spacing={3}>
                    <FormRoot.FormItemRow sm={6} xs={12}>
                        <DropDownAutoFetchApp
                            id="categoriaId"
                            method="GET"
                            keyLabel="descricao"
                            label="Categoria"
                            url="/categorias/list-drop-down"
                            value={form.values.categoria}
                            error={form.error("categoriaId")}
                            helperText={form.helperText("categoriaId")}
                            readonly={readonly}
                            required
                            onChange={(_, categoria) => {
                                form.setValue({
                                    categoria,
                                    categoriaId: categoria?.id,
                                });
                            }}
                        />
                    </FormRoot.FormItemRow>
                    {!readonly && (
                        <FormRoot.FormItemRow marginTop="18px" sm={6} xs={12}>
                            <InputFile
                                accept={["image/*"]}
                                handleFileChange={async (arquivos) => {
                                    if (arquivos && arquivos.length > 0) {
                                        const novaFoto = await resolveUploadImagem(arquivos[0]);
                                        form.setValue({
                                            novaFoto,
                                        });
                                    }
                                }}
                                label="Selecione uma foto"
                            />
                        </FormRoot.FormItemRow>
                    )}
                </FormRoot.FormRow>
                {form.values.novaFoto ? (
                    <>
                        <img
                            style={{ maxWidth: "300px" }}
                            src={form.values.novaFoto}
                            alt="produto"
                        />
                    </>
                ) : (
                    <>
                        {form.values.foto && (
                            <img
                                style={{ maxWidth: "300px" }}
                                src={form.values.foto}
                                alt="produto"
                            />
                        )}
                    </>
                )}
            </CollapseApp>
            <CollapseApp in={Tab.value === 1}>
                {!tabelaDePreco ? (
                    <BoxApp>
                        <TextApp
                            texto="Não há uma tabela de preço ativa"
                            color="primary"
                        />
                    </BoxApp>
                ) : (
                    <>
                        <BoxApp
                            marginTop="1rem"
                            display="flex"
                            alignItems="center"
                            gap="1rem"
                        >
                            <TextApp texto={`Tabela de preço: `} fontWeight={600} />
                            <TextApp texto={`${tabelaDePreco.descricao}`} color="primary" />
                        </BoxApp>
                        {form.values.pesos?.length > 0 && (
                            <>
                                <TextApp texto="Preços dos pesos" />
                                {form.values.pesos.map((peso, index) => {
                                    const itemTabelaDePreco = itensTabelaDePreco.find(
                                        (x) =>
                                            x.pesoId === peso.id && x.produtoId === form.values.id
                                    );
                                    return (
                                        <FormRoot.FormRow key={peso.id} spacing={3}>
                                            <FormItemRow sm={3} xs={12}>
                                                <InputApp readonly value={peso.descricao} label={"Peso"} />
                                            </FormItemRow>
                                            <FormItemRow sm={3} xs={12}>
                                                <InputApp
                                                    value={itemTabelaDePreco?.valorUnitarioAtacado}
                                                    label={"Vlr atacado"}
                                                    readonly={readonly}
                                                    mask={MaskType.MONEY}
                                                    id={`${peso.id}-${index}`}
                                                    onChange={(_, value) =>
                                                        onChangePrecoPeso(
                                                            peso,
                                                            value,
                                                            "valorUnitarioAtacado"
                                                        )
                                                    }
                                                />
                                            </FormItemRow>
                                            <FormItemRow sm={3} xs={12}>
                                                <InputApp
                                                    value={itemTabelaDePreco?.valorUnitarioVarejo}
                                                    label={"Vlr varejo"}
                                                    readonly={readonly}
                                                    mask={MaskType.MONEY}
                                                    id={`${peso.id}-${index}`}
                                                    onChange={(_, value) =>
                                                        onChangePrecoPeso(
                                                            peso,
                                                            value,
                                                            "valorUnitarioVarejo"
                                                        )
                                                    }
                                                />
                                            </FormItemRow>
                                            <DividerApp width="100%" />
                                        </FormRoot.FormRow>
                                    );
                                })}
                            </>
                        )}
                        {form.values.tamanhos?.length > 0 && (
                            <>
                                <TextApp texto="Preços dos tamanhos" />
                                {form.values.tamanhos.map((tamanho, index) => {
                                    const itemTabelaDePreco = itensTabelaDePreco.find(
                                        (x) =>
                                            x.tamanhoId === tamanho.id &&
                                            x.produtoId === form.values.id
                                    );
                                    return (
                                        <FormRoot.FormRow key={tamanho.id} spacing={3}>
                                            <FormItemRow sm={3} xs={12}>
                                                <InputApp
                                                    readonly
                                                    value={tamanho.descricao}
                                                    label={"Tamanho"}
                                                />
                                            </FormItemRow>
                                            <FormItemRow sm={3} xs={12}>
                                                <InputApp
                                                    value={itemTabelaDePreco?.valorUnitarioAtacado}
                                                    label={"Vlr atacado"}
                                                    mask={MaskType.MONEY}
                                                    id={`${tamanho.id}-${index}`}
                                                    readonly={readonly}
                                                    onChange={(_, value) =>
                                                        onChangePrecoTamanho(
                                                            tamanho,
                                                            value,
                                                            "valorUnitarioAtacado"
                                                        )
                                                    }
                                                />
                                            </FormItemRow>
                                            <FormItemRow sm={3} xs={12}>
                                                <InputApp
                                                    value={itemTabelaDePreco?.valorUnitarioVarejo}
                                                    label={"Vlr varejo"}
                                                    readonly={readonly}
                                                    mask={MaskType.MONEY}
                                                    id={`${tamanho.id}-${index}`}
                                                    onChange={(_, value) =>
                                                        onChangePrecoTamanho(
                                                            tamanho,
                                                            value,
                                                            "valorUnitarioVarejo"
                                                        )
                                                    }
                                                />
                                            </FormItemRow>
                                            <DividerApp width="100%" />
                                        </FormRoot.FormRow>
                                    );
                                })}
                            </>
                        )}
                    </>
                )}
            </CollapseApp>
        </FormRoot.Form>
    );
}
