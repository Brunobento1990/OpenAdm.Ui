import { IPeso } from "src/@open-adm/types/peso";
import { DropDownAutoFetchApp } from "./drop-down-auto-fetch-app";

interface propsDropDownPeso {
    label?: string;
    url?: string;
    id?: string;
    value?: IPeso;
    onChange?: (peso?: IPeso) => void;
    error?: boolean;
    helperText?: string;
    required?: boolean;
}

export function DropDownPeso(props: propsDropDownPeso) {
    return (
        <DropDownAutoFetchApp
            required={props.required}
            label={props.label ?? "Peso"}
            url={props.url ?? "/pesos/list"}
            id={props.id ?? "pesoId"}
            keyLabel={"descricao"}
            value={props.value}
            method="GET"
            onChange={(_, value) => {
                if (props.onChange) {
                    props.onChange(value)
                }
            }}
            error={props.error}
            helperText={props.helperText}
        />
    )
}