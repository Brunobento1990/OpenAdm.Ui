import { Typography } from "@mui/material";

interface propsTextApp {
    texto?: string;
    color?: string;
    fontWeight?: number;
    fontSize?: string;
    padding?: string;
}

export function TextApp(props: propsTextApp) {
    return (
        <Typography
            sx={{ color: props.color ?? 'text.secondary', padding: props.padding }}
            fontWeight={props.fontWeight}
            fontSize={props.fontSize}
        >
            {props.texto ?? ''}
        </Typography>
    )
}