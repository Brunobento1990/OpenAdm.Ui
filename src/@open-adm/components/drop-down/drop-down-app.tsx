import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import CustomTextField from "src/@core/components/mui/text-field";

interface propsDropDown {
    value?: any;
    onChange?: (key: string, newValue?: any) => void;
    label: string;
    keyLabel: string;
    size?: "small" | "medium";
    id: string;
    required?: boolean;
    helperText?: any;
    error?: boolean;
    values: any[];
    readonly?: boolean;
    autoFocus?: boolean;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export function DropDownApp(props: propsDropDown) {
    const [value, setValue] = useState<any>(() =>
        props?.value
            ? {
                id: props?.value?.id,
                label: getLabel(props.value),
            }
            : undefined
    );
    function getLabel(value: any) {
        if (!value) return "";
        if (value[props.keyLabel]) {
            return value[props.keyLabel];
        }

        return "";
    }
    function refreshValue() {
        if (props.value) {
            setValue({
                id: props?.value?.id,
                label: getLabel(props.value),
            });
            return;
        }

        setValue(undefined);
    }

    useEffect(() => {
        refreshValue();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value]);

    return (
        <Autocomplete
            noOptionsText="Não há registros"
            onChange={(_, newValue: any, reason) => {
                const newV = reason !== "clear" ? newValue : undefined;
                setValue(newV);
                if (props.onChange) {
                    props.onChange(props.id, newV?.id);
                }
            }}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            readOnly={props.readonly}
            fullWidth
            value={
                typeof value === "string" && value.length === 0
                    ? null
                    : value === undefined
                        ? null
                        : value
            }
            options={props.values.map((val) => {
                return {
                    id: val.id,
                    label: getLabel(val),
                };
            })}
            size={props.size ?? "small"}
            renderInput={(params) => (
                <CustomTextField
                    {...params}
                    label={props.label}
                    required={props.required}
                    helperText={props.helperText}
                    error={props.error}
                />
            )}
        />
    );
}
