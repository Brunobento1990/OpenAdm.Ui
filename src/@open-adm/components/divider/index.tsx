import { Chip, Divider } from "@mui/material";

interface propsDividerApp {
    chip?: string;
    marginTop?: string;
    marginBotton?: string;
}

export function DividerApp(props: propsDividerApp) {
    if (props.chip) {
        return (
            <Divider sx={{ marginTop: props.marginTop ?? '10px', marginBottom: props.marginBotton }}>
                <Chip label={props.chip} size="small" />
            </Divider>
        )
    }

    return (
        <Divider />
    )
}