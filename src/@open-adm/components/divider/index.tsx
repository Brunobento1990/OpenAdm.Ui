import { Chip, Divider } from "@mui/material";

interface propsDividerApp {
    chip?: string;
    marginTop?: string;
}

export function DividerApp(props: propsDividerApp) {
    if (props.chip) {
        return (
            <Divider sx={{ marginTop: props.marginTop ?? '10px' }}>
                <Chip label={props.chip} size="small" />
            </Divider>
        )
    }

    return (
        <Divider />
    )
}