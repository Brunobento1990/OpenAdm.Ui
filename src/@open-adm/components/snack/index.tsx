import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor } from "@mui/material/Alert";
import { useState } from "react";

let loaderHandler: (isLoading: boolean, message?: string, severity?: AlertColor) => void;

function SnackbarCustom() {

    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [severity, setSeverity] = useState<AlertColor>("error");

    loaderHandler = (isLoading: boolean, message?: string, severityParams?: AlertColor) => {
        setMessage(message || "Ocorreu um erro interno, tente novamente mais tarde!");
        setOpen(isLoading);
        if (severityParams) setSeverity(severityParams);
    };

    function closeSnack() {
        setOpen(false)
    }

    if (!open) return null;

    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={closeSnack}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            key={message}
        >
            <MuiAlert
                elevation={6}
                variant="filled"
                severity={severity}
                onClose={closeSnack}
            >
                {message}
            </MuiAlert>
        </Snackbar>
    )
}

export function useSnackbar() {
    return {
        Componet: SnackbarCustom,
        show: (message?: string, severity?: AlertColor) => loaderHandler(true, message, severity),
    }
}