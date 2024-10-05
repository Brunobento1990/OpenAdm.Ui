import CustomTextField from "src/@core/components/mui/text-field";
import SelectCustom from "../select";
import { useEffect, useState } from "react";
import { TypeMethod, useNewApi } from "src/@open-adm/hooks/use-new-api";

interface propsDropDownMultiple {
    id: string;
    label: string;
    primeiraKey: string;
    segundaKey?: string;
    defaultValue?: any[];
    onChange: (newValues: any[]) => void;
    url: string;
    method?: TypeMethod;
    retornarObjetoCompleto?: boolean;
}

export function DropDownMultiple(props: propsDropDownMultiple) {
    const [options, setOptions] = useState<any[]>([]);
    const [optionsComplete, setOptionsComplete] = useState<any[]>([]);
    const { fecth } = useNewApi({
        method: props.method ?? 'GET',
        url: props.url,
        notLoading: true,
        notAlert: true
    })

    async function init() {
        const response = await fecth<any[]>();
        if (response) {
            setOptions(response)
            if (props.retornarObjetoCompleto) {
                setOptionsComplete(response)
            }
        }
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <SelectCustom
            multiple
            id={props.id}
            getOptionLabel={option => props.segundaKey ? `${option[props.primeiraKey]} - ${option[props.segundaKey]}` : option[props.primeiraKey] || ''}
            onChange={(_, newValue) => {
                if (props.retornarObjetoCompleto) {
                    props.onChange(optionsComplete.filter((x) => newValue.some((y) => x?.id === y?.id)))
                    return;
                }
                props.onChange(newValue.map((x) => x.id));
            }}
            options={options}
            renderInput={params =>
                <CustomTextField
                    {...params}
                    label={props.label}
                />
            }
            defaultValue={props.defaultValue}
        />
    )
}