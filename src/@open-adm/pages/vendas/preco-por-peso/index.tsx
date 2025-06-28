import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { useApiItemTabelaDePreco } from "src/@open-adm/api/use-api-item-tabela-de-preco";
import { DropDownPeso } from "src/@open-adm/components/drop-down/drop-down-peso";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { InputApp, MaskType } from "src/@open-adm/components/input/input-app";
import { IAtualizarPrecoPorPeso } from "src/@open-adm/types/atualizar-preco-por-peso";
import { cleanFormatMoney } from "src/@open-adm/utils/format-money";

export function PrecoPorPesoForm() {
    const { atualizarPorPeso } = useApiItemTabelaDePreco();
    const form = useFormikAdapter<IAtualizarPrecoPorPeso>({
        initialValues: {
            pesoId: '',
        },
        validationSchema: new YupAdapter().string('pesoId').build(),
        onSubmit: submit
    })

    async function submit() {
        await atualizarPorPeso.fetch({
            ...form.values,
            peso: undefined,
            valorUnitarioAtacado: cleanFormatMoney(form.values.valorUnitarioAtacado),
            valorUnitarioVarejo: cleanFormatMoney(form.values.valorUnitarioVarejo)
        })
    }

    return (
        <FormRoot.Form loading={atualizarPorPeso.status === 'loading'} titulo="Atualizar preços por peso" submit={form.onSubmit}>
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow xs={12} sm={4}>
                    <DropDownPeso
                        required
                        value={form.values.peso}
                        helperText={form.helperText('pesoId')}
                        error={form.error('pesoId')}
                        onChange={(peso) => form.setValue({
                            peso,
                            pesoId: peso?.id
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