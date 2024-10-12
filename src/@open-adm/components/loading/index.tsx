import { CircularProgress, LinearProgress } from "@mui/material";

interface propsLoadingApp {
    type?: 'circular' | 'progresso';
    size?: number;
}

export function LoadingApp(props: propsLoadingApp) {
    if (props.type === 'progresso') {
        return <LinearProgress sx={{ width: '100%' }} />
    }

    return (
        <CircularProgress sx={{ width: '100%' }} size={props.size} />
    )
}