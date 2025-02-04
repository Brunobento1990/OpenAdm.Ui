import { useState } from "react";
import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { Form } from "src/@open-adm/components/form";
import { GridApp, GridItemApp } from "src/@open-adm/components/grid";
import { InputCustom } from "src/@open-adm/components/input";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { useNewApi } from "src/@open-adm/hooks/use-new-api";
import { IAtualizarSenhaUsuarioAdm } from "src/@open-adm/types/atualizar-senha-usuario-adm";

export function AtualizarSenhaUsuarioAdm() {
    const [loading, setLoading] = useState(false)
    const { id, navigate } = useNavigateApp();
    const { fecth } = useNewApi({
        method: 'POST',
        url: '/usuario/atualizar-senha-adm'
    })
    const form = useFormikAdapter<IAtualizarSenhaUsuarioAdm>({
        initialValues: {
            usuarioId: id,
            senha: '',
            confirmarSenha: ''
        },
        onSubmit: submit,
        validationSchema: new YupAdapter().string('senha').string('confirmarSenha').build()
    })

    async function submit() {
        setLoading(true);
        const response = await fecth({ body: form.values, message: 'Senha atualizada com sucesso' });
        if (response) {
            navigate('/vendas/cliente');
            return;
        }
        setLoading(false);
    }

    return (
        <Form
            loading={loading}
            action="create"
            title="Atualizar senha do cliente"
            submit={form.onSubmit}
        >
            <GridApp container spacing={3}>
                <GridItemApp item sm={6} xs={12}>
                    <InputCustom
                        id="senha"
                        label="Senha"
                        name="senha"
                        value={form.values.senha}
                        autoFocus
                        fullWidth
                        onChange={form.onChange}
                        onBlur={form.onBlur}
                        error={form.error('senha')}
                        helperText={form.helperText('senha')}
                    />
                </GridItemApp>
                <GridItemApp item sm={6} xs={12}>
                    <InputCustom
                        id="confirmarSenha"
                        label="Confirmar Senha"
                        name="confirmarSenha"
                        value={form.values.confirmarSenha}
                        fullWidth
                        onChange={form.onChange}
                        onBlur={form.onBlur}
                        error={form.error('confirmarSenha')}
                        helperText={form.helperText('confirmarSenha')}
                    />
                </GridItemApp>
            </GridApp>
        </Form >
    )
}