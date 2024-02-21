import { Card, CardHeader, Box, Button } from "@mui/material";
import { ReactNode } from "react";
import { useRouter } from "next/router";

interface propsForm {
    children: ReactNode,
    title: string;
    action: string;
    urlVoltar: string;
    submit: () => void;
}

export function Form(props: propsForm) {

    const router = useRouter();

    return (
        <Card sx={{ padding: 5 }} >
            <CardHeader
                title={props.title}
            />
            <form autoComplete='off' onSubmit={props.submit}>
                {props.children}
            </form>
            <Box display='flex' justifyContent='space-between' sx={{ marginTop: 10 }}>
                <Button
                    onClick={() => router.replace(props.urlVoltar)}
                >
                    Voltar
                </Button>
                {props.action !== 'view' &&
                    <Button
                        variant="contained"
                        onClick={props.submit}
                    >
                        Salvar
                    </Button>
                }
            </Box>
        </Card>
    )
}