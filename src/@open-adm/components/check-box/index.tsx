import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox } from "@mui/material";
import { TextApp } from "../text";

export interface propsCheckBox {
    value?: boolean;
    onChange?: (key: string, value: boolean) => void;
    label?: string;
    required?: boolean;
    readonly?: boolean;
    id?: string;
    minWidth?: string;
    marginLeft?: string;
    width?: string;
    padding?: string;
}

export function CheckBoxApp(props: propsCheckBox) {
    return (
        <FormGroup
            sx={{
                minWidth: props.minWidth,
                marginLeft: props.marginLeft,
                width: props.width,
            }}
        >
            <FormControlLabel
                control={
                    <Checkbox
                        required={props.required}
                        readOnly={props.readonly}
                        disabled={props.readonly}
                        checked={props.value ?? false}
                        sx={{
                            padding: props.padding,
                        }}
                        onChange={(e) => {
                            if (props.onChange) {
                                props.onChange(props.id ?? "", e.target.checked);
                            }
                        }}
                    />
                }
                label={<TextApp texto={props.label ?? ""} />}
            />
        </FormGroup>
    );
}
