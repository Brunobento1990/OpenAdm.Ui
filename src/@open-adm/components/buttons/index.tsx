import { Button as ButtonMui } from '@mui/material';
import { IconApp } from '../icon';

export interface propsButton {
    title?: string;
    onClick?: () => void;
    variant?: 'text' | 'outlined' | 'contained';
    icon?: string;
    type?: 'submit' | 'button' | 'reset';
    fullWidth?: boolean;
    width?: string;
    maxWidth?: string;
    autoFocus?: boolean;
    loading?: boolean;
    backGroundColor?: string;
    backGroundColorHover?: string;
    height?: string;
    disabled?: boolean;
    tabIndex?: number;
    size?: 'small' | 'medium' | 'large';
    startIcon?: string;
}

export function ButtonApp(props: propsButton) {
    return (
        <ButtonMui
            {...props}
            size={props.size ?? 'small'}
            onClick={(e) => {
                e.preventDefault();
                if (props.onClick) {
                    props.onClick();
                }
            }}
            tabIndex={props.tabIndex}
            autoFocus={props.autoFocus}
            disabled={props.disabled || props.loading}
            variant={props.variant}
            type={props.type}
            fullWidth={props.fullWidth}
            endIcon={props.icon ? <IconApp icon={props.icon} /> : undefined}
            startIcon={
                props.startIcon ? <IconApp icon={props.startIcon} /> : undefined
            }
            sx={{
                height: props.height,
                maxWidth: props.maxWidth,
                width: props.width,
                backgroundColor: props.backGroundColor,
                '&:hover': {
                    backgroundColor: props.backGroundColorHover,
                },
            }}
        >
            {props.title ?? 'Continuar'}
        </ButtonMui>
    );
}