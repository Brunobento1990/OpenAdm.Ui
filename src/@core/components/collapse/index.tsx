import { Collapse } from "@mui/material";
import { ReactNode } from "react";

interface propsCollapseApp {
    in: boolean;
    children: ReactNode;
    width?: string;
    orientation?: "horizontal" | "vertical";
    current?: any;
    ref?: any;
    direction?: "left" | "right" | "up" | "down";
}

export function CollapseApp(props: propsCollapseApp) {
    return (
        <Collapse
            orientation={props.orientation}
            sx={{ width: props.width }}
            in={props.in}
        >
            {props.children}
        </Collapse>
    );
}
