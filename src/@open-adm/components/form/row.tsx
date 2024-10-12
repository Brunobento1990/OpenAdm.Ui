import { Grid } from "@mui/material";
import { ReactNode } from "react";

interface propsFormRow {
    children: ReactNode;
    spacing?: number;
}

export function FormRow(props: propsFormRow) {
    return (
        <Grid container spacing={props.spacing}>
            {props.children}
        </Grid>
    )
}