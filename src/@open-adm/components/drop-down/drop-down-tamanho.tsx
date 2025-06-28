import { DropDownAutoFetchApp } from "./drop-down-auto-fetch-app";
import { ITamanho } from "src/@open-adm/types/tamanho";

interface propsDropDownTamanho {
    label?: string;
    url?: string;
    id?: string;
    value?: ITamanho;
    onChange?: (tamanho?: ITamanho) => void;
    error?: boolean;
    helperText?: string;
    required?: boolean;
}

export function DropDownTamanho(props: propsDropDownTamanho) {
    return (
        <DropDownAutoFetchApp
            label={props.label ?? "Tamanho"}
            url={props.url ?? "/tamanhos/list"}
            method="GET"
            required={props.required}
            id={props.id ?? "tamanhoId"}
            keyLabel={"descricao"}
            value={props.value}
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