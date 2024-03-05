import { useState } from 'react';
import { CircularProgress, Dialog, Typography } from '@mui/material';
import { Box } from '@mui/system';

let loaderHandler: (isLoading: boolean, message?: string) => void;

function LoaderComponent() {
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    loaderHandler = (isLoading: boolean, message?: string) => {
        setMessage(message ?? 'Aguarde...')
        setLoading(isLoading);
    };

    if (!loading) return null;

    return (
        <Dialog open={true} fullScreen>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    background: 'rgba(255, 255, 255, 0.6)',
                    height: '100vh',
                    width: '100%',
                    cursor: 'not-allowed',
                }}
            >
                <CircularProgress color="secondary" />
                <Typography>{message}</Typography>
            </Box>
        </Dialog>
    );
}

export function useLoader() {
    return {
        Component: LoaderComponent,
        show: (message?: string) => loaderHandler(true, message),
        hide: () => loaderHandler(false),
    };
}
