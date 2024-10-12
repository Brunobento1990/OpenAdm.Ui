import { Typography } from "@mui/material";

interface propsTextApp {
    texto?: string;
    color?: string;
}

export function TextApp(props: propsTextApp) {
    if (!props.texto) {
        return (
            <></>
        )
    }

    return (
        <Typography sx={{ color: props.color ?? 'text.secondary' }}>
            {props.texto}
        </Typography>
    )
}