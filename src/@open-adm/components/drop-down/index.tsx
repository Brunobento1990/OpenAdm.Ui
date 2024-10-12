import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import SelectCustom from '../select';
import CustomTextField from 'src/@core/components/mui/text-field';

interface propsDropDown {
    value?: any;
    onChange?: (key: string, newValue?: any) => void;
    key: string;
    label: string;
    keyLabel: string;
    size?: 'small' | 'medium';
    id: string;
    required?: boolean;
    helperText?: any;
    error?: boolean;
    values: any[];
    readonly?: boolean;
    width?: string;
    defaultValue?: any;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    segundaKeyLabel?: string;
    retornarObjetoCompleto?: boolean;
}

export function DropDown(props: propsDropDown) {
    const [value, setValue] = useState<any>(
        props?.value
            ? {
                id: props?.value?.id,
                label: getLabel(props?.value),
            }
            : undefined,
    );

    function refreshValue() {
        if (props.value) {
            setValue({
                id: props?.value?.id,
                label: getLabel(props?.value),
            });
        }
    }

    function getLabel(value: any) {
        if (!value) return '';
        if (props.segundaKeyLabel && value[props.segundaKeyLabel]) {
            return `${value[props.keyLabel]} - ${value[props.segundaKeyLabel]}`;
        }

        if (value[props.keyLabel]) {
            return value[props.keyLabel];
        }

        return '';
    }

    useEffect(() => {
        refreshValue();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value]);

    return (
        <SelectCustom
            sx={{
                width: props.width,
            }}
            onChange={(_, newValue: any, reason) => {
                const newV = reason !== 'clear' ? newValue : undefined;
                setValue(newV);
                if (props.onChange) {
                    if (props.retornarObjetoCompleto) {
                        props.onChange(props.id, props.values.find((x) => x.id === newV?.id));
                        return;
                    }
                    props.onChange(props.id, newV?.id);
                }
            }}
            getOptionLabel={(opt) => `${opt?.label || ''}`}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            readOnly={props.readonly}
            fullWidth
            value={
                typeof value === 'string' && value.length === 0
                    ? null
                    : value === undefined
                        ? null
                        : value
            }
            options={props.values.map((val) => {
                return {
                    id: val?.id,
                    label:
                        props.segundaKeyLabel && val[props.segundaKeyLabel]
                            ? `${val[props.keyLabel]} - ${val[props.segundaKeyLabel]
                            }`
                            : val[props.keyLabel] ?? '',
                };
            })}
            size={props.size ?? 'small'}
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