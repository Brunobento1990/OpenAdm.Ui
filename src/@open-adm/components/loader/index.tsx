import { useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';
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
        <Box
            sx={{
                display : 'flex',
                position: 'absolute',
                flexDirection: 'column',
                zIndex: 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                height: '100vh',
                width: '100vw',
                top:0,
                cursor: 'not-allowed',
            }}
        >
            <CircularProgress color="secondary" />
            <Typography>{message}</Typography>
        </Box>
    );
}

export function useLoader() {
    return {
        Component: LoaderComponent,
        show: (message?: string) => loaderHandler(true, message),
        hide: () => loaderHandler(false),
    };
}