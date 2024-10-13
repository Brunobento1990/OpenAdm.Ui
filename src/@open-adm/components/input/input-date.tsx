import CustomTextField from "src/@core/components/mui/text-field";

interface InputCustomProps {
    fullWidth?: boolean;
    label: string;
    name: string;
    id: string;
    value: any;
    onChange?: (id: string, newValue?: any) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    helperText?: any;
    error?: boolean;
    required?: boolean;
    readonly?: boolean
}

export function InputDate(props: InputCustomProps) {
    const valueSplit = props.value?.split('T');
    const newValue = valueSplit && valueSplit.length > 0 ? valueSplit[0] : props.value;
    return (
        <CustomTextField
            fullWidth={props.fullWidth}
            label={props.label}
            name={props.name}
            id={props.id}
            value={newValue}
            onBlur={props.onBlur}
            onChange={(e) => {
                if (props.onChange) {
                    props.onChange(props.id, e.target.value)
                }
            }}
            InputProps={{
                readOnly: props.readonly
            }}
            helperText={props.helperText}
            error={props.error}
            required={props.required}
            type="date"
        />
    );
}
