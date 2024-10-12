import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

interface propsRadioApp {
    label: string;
    name?: string;
    row?: boolean;
    value?: any;
    id: string;
    onChange?: (id: string, value: any) => void;
    options: propsOptionsRadioApp[];
}

interface propsOptionsRadioApp {
    label: string;
    value: any;
}

export function RadioApp(props: propsRadioApp) {
    return (
        <FormControl>
            <FormLabel component='legend'>{props.label}</FormLabel>
            <RadioGroup
                aria-label='radio-btn'
                name={props.name}
                row={props.row}
                value={props.value}
                onChange={(e) => {
                    if (props.onChange) {
                        props.onChange(props.id, parseInt(e.target.value))
                    }
                }}
            >
                {props.options.map((x) => (
                    <FormControlLabel key={x.value} value={x.value} control={<Radio />} label={x.label} />
                ))}
            </RadioGroup>
        </FormControl>

    )
}