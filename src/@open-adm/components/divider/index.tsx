import { Chip, Divider } from "@mui/material";

interface propsDividerApp {
    chip?: string;
    marginTop?: string;
    marginBotton?: string;
    color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
    width?: string;
}

export function DividerApp(props: propsDividerApp) {
    if (props.chip) {
        return (
            <Divider sx={{ marginTop: props.marginTop ?? '10px', marginBottom: props.marginBotton, width: props.width }}>
                <Chip color={props.color ?? "primary"} label={props.chip} size="small" />
            </Divider>
        )
    }

    return (
        <Divider />
    )
}