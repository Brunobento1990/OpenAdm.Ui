import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import Icon from "src/@core/components/icon";
import CustomTextField from "src/@core/components/mui/text-field";
import { formatMoney } from "src/@open-adm/utils/format-money";
import { maskCNPJ, maskCPF, maskPhone } from "src/@open-adm/utils/mask";

export enum MaskType {
    TELEFONE = "telefone",
    CNPJ = "cnpj",
    CPF = "cpf",
    MONEY = "format-money"
}

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
    maxLength?: number;
    type?: string;
    placeholder?: string;
    isPassword?: boolean;
    mask?: MaskType;
    readonly?: boolean;
    autoFocus?: boolean;
}

export function InputCustom(props: InputCustomProps) {
    const [type, setType] = useState<string>(props.type ?? "text")

    const handleMask = (value: any) => {
        switch (props.mask) {
            case MaskType.TELEFONE:
                return maskPhone(value);
            case MaskType.CNPJ:
                return maskCNPJ(value);
            case MaskType.CPF:
                return maskCPF(value);
            case MaskType.MONEY:
                return formatMoney(value);
            default:
                return value;
        }
    };

    const togglePasswordVisibility = () => {
        const newType = type === "password" ? "text" : "password";
        setType(newType);
    };

    return (
        <CustomTextField
            placeholder={props.placeholder}
            type={type}
            autoFocus={props.autoFocus}
            fullWidth={props.fullWidth}
            label={props.label}
            name={props.name}
            id={props.id}
            value={handleMask(props.value)}
            onBlur={props.onBlur}
            onChange={(e) => {
                if (props.onChange) {
                    props.onChange(props.id, handleMask(e.target.value))
                }
            }}
            helperText={props.helperText}
            error={props.error}
            required={props.required}
            inputProps={{ maxLength: props.maxLength }}
            InputProps={{
                readOnly: props.readonly,
                endAdornment: props.isPassword && (
                    <InputAdornment position="end">
                        <IconButton
                            edge="end"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={togglePasswordVisibility}
                        >
                            <Icon
                                fontSize="1.25rem"
                                icon={
                                    type === "password"
                                        ? "tabler:eye"
                                        : "tabler:eye-off"
                                }
                            />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
}
