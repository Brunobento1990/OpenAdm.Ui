import { Grid } from "@mui/material";
import { ReactNode } from "react";

interface propsGridCustom {
    children: ReactNode | ReactNode[];
    spacing?: number;
    xs?: number;
    sm?: number;
    container?: boolean;
    withItem?: boolean;
}

export function GridCustom(props: propsGridCustom) {

    if (props.withItem) {
        return (
            <Grid container spacing={props.spacing}>
                {Array.isArray(props.children) ?
                    props.children.map((x, i) =>
                        <Grid key={i} item xs={props.xs} sm={props.sm}>
                            {x}
                        </Grid>) :
                    <Grid item xs={props.xs} sm={props.sm}>
                        {props.children}
                    </Grid>
                }
            </Grid>
        )
    }

    return (
        <Grid container={props.container} spacing={props.spacing}>
            {props.children}
        </Grid>
    )
}