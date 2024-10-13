import { Grid } from "@mui/material";
import { ReactNode } from "react";

interface propsFormRow {
    children: ReactNode;
    spacing?: number;
    marginTop?: string;
}

export function FormRow(props: propsFormRow) {
    return (
        <Grid container spacing={props.spacing} sx={{ marginTop: props.marginTop ?? '.5rem' }}>
            {props.children}
        </Grid>
    )
}