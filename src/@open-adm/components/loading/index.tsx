import { CircularProgress } from '@mui/material';

interface propsLoadingApp {
    size?: number;
}

export function LoadingApp(props: propsLoadingApp) {
    return <CircularProgress size={props.size ?? 10} />;
}