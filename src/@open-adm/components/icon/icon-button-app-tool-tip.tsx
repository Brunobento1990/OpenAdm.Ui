import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import { IconApp } from ".";

export type placement =
    | 'top'
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start';

interface propsIconButtonComTooltip {
    icon: string;
    onClick?: (e: any) => void;
    sx?: any;
    width?: string;
    cor?: string;
    titulo: string | string[];
    placement?: placement;
    active?: any;
    disabled?: boolean;
    ariaLabel?: string;
    color?: IconButtonProps['color'];
}

export function IconButtonAppComTooltip(props: propsIconButtonComTooltip) {
    return (
        <Tooltip title={props.titulo} placement={props.placement}>
            <IconButton
                aria-label={props.ariaLabel}
                color={props.color}
                disabled={props.disabled}
                onClick={props.onClick}
                sx={props.sx}
                size="small"
            >
                <IconApp width={props.width} icon={props.icon} color={props.cor} />
            </IconButton>
        </Tooltip>
    );
}
