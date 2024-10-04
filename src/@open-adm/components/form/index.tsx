import { Card, CardHeader, Box, Button, CircularProgress } from "@mui/material";
import { ReactNode } from "react";
import { useRouter } from "next/router";

interface propsForm {
    children: ReactNode,
    title: string;
    action: string;
    urlVoltar?: string;
    submit: () => void;
    gap?: number;
    titleButton?: string;
    width?: string;
    loading?: boolean;
}

export function Form(props: propsForm) {

    const router = useRouter();

    return (
        <Card sx={{ padding: 5, gap: props.gap, scrollBehavior: 'auto', width: props.width }} >
            <CardHeader
                title={props.title}
            />
            <form autoComplete='off' onSubmit={(e) => {
                e.preventDefault();
                props.submit();
            }}>
                {props.children}
            </form>
            <Box display='flex' justifyContent='space-between' sx={{ marginTop: 10 }}>
                {props.urlVoltar &&
                    <Button
                        onClick={() => router.replace(props.urlVoltar ?? '/home')}
                    >
                        Voltar
                    </Button>
                }
                {props.action !== 'view' &&
                    <Button
                        disabled={props.loading}
                        variant="contained"
                        onClick={props.submit}
                    >
                        {props.loading ? <>Aguarde ... <CircularProgress size={20} /></> : props.titleButton ?? 'Salvar'}
                    </Button>
                }
            </Box>
        </Card>
    )
}