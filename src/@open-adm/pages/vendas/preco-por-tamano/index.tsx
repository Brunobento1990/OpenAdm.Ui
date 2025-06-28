import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter"
import { YupAdapter } from "src/@open-adm/adapters/yup-adapter"
import { useApiItemTabelaDePreco } from "src/@open-adm/api/use-api-item-tabela-de-preco"
import { DropDownTamanho } from "src/@open-adm/components/drop-down/drop-down-tamanho";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { InputApp, MaskType } from "src/@open-adm/components/input/input-app";
import { IAtualizarPrecoPorTamanho } from "src/@open-adm/types/atualizar-preco-por-tamanho"
import { cleanFormatMoney } from "src/@open-adm/utils/format-money";

export function PrecoPorTamanhoForm() {
    const { atualizarPorTamanho } = useApiItemTabelaDePreco();
    const form = useFormikAdapter<IAtualizarPrecoPorTamanho>({
        initialValues: {
            tamanhoId: '',
        },
        validationSchema: new YupAdapter().string('tamanhoId').build(),
        onSubmit: submit
    })

    async function submit() {
        await atualizarPorTamanho.fetch({
            ...form.values,
            tamanho: undefined,
            valorUnitarioAtacado: cleanFormatMoney(form.values.valorUnitarioAtacado),
            valorUnitarioVarejo: cleanFormatMoney(form.values.valorUnitarioVarejo)
        })
    }

    return (
        <FormRoot.Form loading={atualizarPorTamanho.status === 'loading'} titulo="Atualizar preços por tamanho" submit={form.onSubmit}>
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow xs={12} sm={4}>
                    <DropDownTamanho
                        required
                        value={form.values.tamanho}
                        helperText={form.helperText('tamanhoId')}
                        error={form.error('tamanhoId')}
                        onChange={(tamanho) => form.setValue({
                            tamanho,
                            tamanhoId: tamanho?.id
                        })}
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={4}>
                    <InputApp
                        label="Valor un atacado"
                        value={form.values.valorUnitarioAtacado}
                        id="valorUnitarioAtacado"
                        onChange={form.onChange}
                        mask={MaskType.MONEY}
                    />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={4}>
                    <InputApp
                        label="Valor un varejo"
                        value={form.values.valorUnitarioVarejo}
                        id="valorUnitarioVarejo"
                        onChange={form.onChange}
                        mask={MaskType.MONEY}
                    />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
        </FormRoot.Form>
    )
}