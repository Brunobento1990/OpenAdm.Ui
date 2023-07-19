import { useFormik } from "formik";
import { LayoutLogin } from "../../Login/layour";
import * as Yup from 'yup';
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useApi } from "../../../Service/useApi";

export function EmpresaCreate() {

    const api = useApi();

    const formik = useFormik({
        initialValues: {
            razaoSocial: '',
            nomeFantasia: '',
            cnpj: '',
            contato: '',
            ddd: '',
            webSite: '',
            email: '',
            password: '',
            submit: null
        },
        validationSchema: Yup.object({
            razaoSocial: Yup
                .string()
                .max(255)
                .required('Razão social é obrigatório'),
            nomeFantasia: Yup
                .string()
                .max(255)
                .required('Nome fantasia é obrigatório'),
            cnpj: Yup
                .string()
                .max(20)
                .required('CNPJ é obrigatório'),
            email: Yup
                .string()
                .email('E-mail inválido')
                .max(255)
                .required('Email é obrigatório'),
            password: Yup
                .string()
                .max(255)
                .required('Senha é obrigatório')
        }),
        onSubmit: async (values, helpers) => {
            await api.post("adicionar-empresa", values)
        }
    });

    return (
        <LayoutLogin>
            <>
                <Box
                    sx={{
                        backgroundColor: 'background.paper',
                        flex: '1 1 auto',
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: 550,
                            px: 3,
                            py: '100px',
                            width: '100%'
                        }}
                    >
                        <div>
                            <Stack
                                spacing={1}
                                sx={{ mb: 3 }}
                            >
                                <Typography variant="h4">
                                    Cadastro
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    variant="body2"
                                >
                                    Obrigado por escolher a Open Adm
                                </Typography>
                            </Stack>
                            <form
                                noValidate
                                onSubmit={formik.handleSubmit}
                            >
                                <Stack spacing={3}>
                                    <TextField
                                        error={!!(formik.touched.razaoSocial && formik.errors.razaoSocial)}
                                        fullWidth
                                        helperText={formik.touched.razaoSocial && formik.errors.razaoSocial}
                                        label="Razão social"
                                        name="razaoSocial"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="text"
                                        value={formik.values.razaoSocial}
                                    />
                                    <TextField
                                        error={!!(formik.touched.nomeFantasia && formik.errors.nomeFantasia)}
                                        fullWidth
                                        helperText={formik.touched.nomeFantasia && formik.errors.nomeFantasia}
                                        label="Nome fantasia"
                                        name="nomeFantasia"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="text"
                                        value={formik.values.nomeFantasia}
                                    />
                                    <TextField
                                        error={!!(formik.touched.cnpj && formik.errors.cnpj)}
                                        fullWidth
                                        helperText={formik.touched.cnpj && formik.errors.cnpj}
                                        label="CNPJ"
                                        name="cnpj"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="text"
                                        value={formik.values.cnpj}
                                    />
                                    <TextField
                                        error={!!(formik.touched.ddd && formik.errors.ddd)}
                                        fullWidth
                                        helperText={formik.touched.ddd && formik.errors.ddd}
                                        label="DDD"
                                        name="ddd"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="text"
                                        value={formik.values.ddd}
                                    />
                                    <TextField
                                        error={!!(formik.touched.contato && formik.errors.contato)}
                                        fullWidth
                                        helperText={formik.touched.contato && formik.errors.contato}
                                        label="Contato"
                                        name="contato"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="text"
                                        value={formik.values.contato}
                                    />
                                    <TextField
                                        error={!!(formik.touched.webSite && formik.errors.webSite)}
                                        fullWidth
                                        helperText={formik.touched.webSite && formik.errors.webSite}
                                        label="web Site"
                                        name="webSite"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="text"
                                        value={formik.values.webSite}
                                    />
                                    <TextField
                                        error={!!(formik.touched.email && formik.errors.email)}
                                        fullWidth
                                        helperText={formik.touched.email && formik.errors.email}
                                        label="Email"
                                        name="email"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="email"
                                        value={formik.values.email}
                                    />
                                    <TextField
                                        error={!!(formik.touched.password && formik.errors.password)}
                                        fullWidth
                                        helperText={formik.touched.password && formik.errors.password}
                                        label="Senha"
                                        name="password"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        type="password"
                                        value={formik.values.password}
                                    />
                                </Stack>
                                {formik.errors.submit && (
                                    <Typography
                                        color="error"
                                        sx={{ mt: 3 }}
                                        variant="body2"
                                    >
                                        {formik.errors.submit}
                                    </Typography>
                                )}
                                <Button
                                    fullWidth
                                    size="large"
                                    sx={{ mt: 3 }}
                                    type="submit"
                                    variant="contained"
                                >
                                    Cadastrar
                                </Button>
                            </form>

                        </div>
                    </Box>
                </Box>
            </>
        </LayoutLogin>
    )
}