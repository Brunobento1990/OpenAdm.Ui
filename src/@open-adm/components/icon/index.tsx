import { Icon, IconProps } from "@iconify/react";

export function IconApp({ icon, width, ...rest }: IconProps) {
    return <Icon icon={icon} fontSize={width ?? "1.375rem"} {...rest} />;
}
