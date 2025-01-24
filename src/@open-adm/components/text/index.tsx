import { Typography } from "@mui/material";

interface propsTextApp {
    texto?: string;
    color?: string;
    fontWeight?: number
    fontSize?: string
}

export function TextApp(props: propsTextApp) {
    if (!props.texto) {
        return (
            <></>
        )
    }

    return (
        <Typography
            sx={{ color: props.color ?? 'text.secondary' }}
            fontWeight={props.fontWeight}
            fontSize={props.fontSize}
        >
            {props.texto}
        </Typography>
    )
}