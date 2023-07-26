import { TextField } from "@mui/material";
import { InputCustomTypes } from "./types";

export function InputCuston(props: InputCustomTypes) {

    return (
        <TextField
            id="outlined-basic"
            label={props.label}
            variant="outlined"
            required={props.required}
            type={props.type}
            value={props.value}
            onChange={(value) => {if(props.onChange) props.onChange(value.target.value)}}
            size={props.size}
            fullWidth={props.fullWidth}
            inputProps={{
                maxLength: props.maxLength,
                readOnly: props.readOnly
            }}
            focused={props.readOnly}
            sx={{margin: props.margin}}
            onBlur={props.onBlur}
        />
    )

}