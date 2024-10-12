import { Grid } from "@mui/material";
import { ReactNode } from "react";

interface propsFormItemRow {
    children: ReactNode;
    xs?: number;
    sm?: number;
}

export function FormItemRow(props: propsFormItemRow) {
    return (
        <Grid item xs={props.xs} sm={props.sm}>
            {props.children}
        </Grid>
    )
}