import { LayoutLogin } from "./layour";
import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useApi } from "../../Service/useApi";

export function Login() {

    const api = useApi();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            submit: null
        },
        validationSchema: Yup.object({
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
            api.post("Login", values)
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
                                    Login
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    variant="body2"
                                >
                                    Não tem conta ?
                                    <Link
                                        href="/empresa/cadastrar"
                                        underline="hover"
                                        variant="subtitle2"
                                    >
                                        Cadastre - se
                                    </Link>
                                </Typography>
                            </Stack>
                            <form
                                noValidate
                                onSubmit={formik.handleSubmit}
                            >
                                <Stack spacing={3}>
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
                                    Entrar
                                </Button>
                                <Button
                                    fullWidth
                                    size="large"
                                    sx={{ mt: 3 }}
                                    onClick={() => console.log("teste")}
                                >
                                    Esquece sua senha ?
                                </Button>
                            </form>

                        </div>
                    </Box>
                </Box>
            </>
        </LayoutLogin>
    )
}