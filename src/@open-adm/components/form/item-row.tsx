import { Grid } from "@mui/material";
import { ReactNode } from "react";

interface propsFormItemRow {
    children: ReactNode;
    xs?: number;
    sm?: number;
    marginTop?: string;
}

export function FormItemRow(props: propsFormItemRow) {
    return (
        <Grid item xs={props.xs ?? 12} marginTop={props.marginTop} sm={props.sm ?? 4}>
            {props.children}
        </Grid>
    )
}