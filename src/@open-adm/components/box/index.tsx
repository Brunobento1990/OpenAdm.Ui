import { Box } from "@mui/material";
import { ReactNode } from "react";

export type justifyContent =
    | 'start'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'end';

export type alignItems = 'stretch' | 'center' | 'start' | 'end';
export type flexDirection =
    | 'column'
    | 'column-reverse'
    | 'row'
    | 'row-reverse';

interface propsBoxApp {
    children: ReactNode;
    width?: string;
    maxWidth?: string;
    display?: string;
    gap?: string;
    marginTop?: string;
    alignItems?: alignItems;
    justifyContent?: justifyContent;
    flexDirection?: flexDirection;
    padding?: string;
}

export function BoxApp(props: propsBoxApp) {
    return (
        <Box
            padding={props.padding}
            width={props.width}
            maxWidth={props.maxWidth}
            display={props.display}
            gap={props.gap}
            marginTop={props.marginTop}
            alignItems={props.alignItems}
            justifyContent={props.justifyContent}
            flexDirection={props.flexDirection}
        >
            {props.children}
        </Box>
    )
}