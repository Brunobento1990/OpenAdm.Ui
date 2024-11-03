import { CircularProgress, LinearProgress } from "@mui/material";
import { BoxApp } from "../box";
import { TextApp } from "../text";

interface propsLoadingApp {
    type?: 'circular' | 'progresso';
    size?: number;
    mensagem?: string;
}

export function LoadingApp(props: propsLoadingApp) {
    if (props.type === 'progresso') {
        return <LinearProgress sx={{ width: '100%' }} />
    }

    return (
        <CircularProgress sx={{ width: '100%' }} size={props.size} />
    )
}

export function LoadingAppMensagem(props: propsLoadingApp) {
    return (
        <BoxApp display="flex" gap='1rem'>
            <TextApp texto={props.mensagem ?? 'Carregando...'} />
            <CircularProgress size={props.size ?? 20} />
        </BoxApp>
    )
}