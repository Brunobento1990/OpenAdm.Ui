import { Card, CardHeader, Box, Button } from "@mui/material";
import { ReactNode } from "react";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { LoadingApp } from "../loading";

interface propsForm {
    children: ReactNode,
    title: string;
    action: string;
    urlVoltar?: string;
    submit?: () => void;
    gap?: number;
    titleButton?: string;
    width?: string;
    loading?: boolean;
    carregandoDados?: boolean;
}

export function Form(props: propsForm) {

    const { navigate } = useNavigateApp();

    if (props.carregandoDados) {
        return (
            <Card sx={{
                padding: 5,
                gap: props.gap,
                scrollBehavior: 'auto',
                display: 'flex',
                alignItems: 'center'
            }}
            >
                <LoadingApp type="progresso" />
            </Card>
        )
    }

    return (
        <Card sx={{ padding: 5, gap: props.gap, scrollBehavior: 'auto', width: props.width }} >
            <CardHeader
                title={props.title}
            />
            <form autoComplete='off' onSubmit={(e) => {
                e.preventDefault();
                if (props.submit) {
                    props.submit();
                }
            }}>
                {props.children}
                <Box display='flex' justifyContent='space-between' sx={{ marginTop: 10 }}>
                    {props.urlVoltar &&
                        <Button
                            onClick={() => navigate(props.urlVoltar ?? '/home')}
                        >
                            Voltar
                        </Button>
                    }
                    {props.action !== 'view' &&
                        <Button
                            disabled={props.loading}
                            variant="contained"
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                if (props.submit) {
                                    props.submit();
                                }
                            }}
                        >
                            {props.loading ? <>Aguarde ... <LoadingApp size={20} /></> : props.titleButton ?? 'Salvar'}
                        </Button>
                    }
                </Box>
            </form>
        </Card>
    )
}