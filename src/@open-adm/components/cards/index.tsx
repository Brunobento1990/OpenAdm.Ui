import { Card } from "@mui/material";
import { ReactNode } from "react";

interface propsCard {
    children: ReactNode
}

export function CardCustom(props: propsCard) {
    return (
        <Card>
            {props.children}
        </Card>
    )
}