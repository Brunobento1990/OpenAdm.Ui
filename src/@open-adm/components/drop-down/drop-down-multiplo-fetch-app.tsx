import { useDeferredValue, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { TypeMethod, useNewApi } from "src/@open-adm/hooks/use-new-api";
import CustomTextField from "src/@core/components/mui/text-field";

interface propsDropDown {
    onChange?: (id: string, newValue?: any) => void;
    label: string;
    values?: any[];
    defaultValues?: any[];
    url: string;
    id: string;
    required?: boolean;
    helperText?: any;
    error?: boolean;
    method?: TypeMethod;
    readonly?: boolean;
    autoFocus?: boolean;
    keyLabel: string;
}

export function DropDownMultiploFetchApp(props: propsDropDown) {
    const { fecth, statusRequisicao } = useNewApi({
        method: props.method ?? "GET",
        url: props.url,
        naoRenderizarResposta: true,
    });
    const [values, setValues] = useState<any[]>([]);
    const [defaultValues] = useState(() =>
        props.defaultValues?.map((x) => {
            return {
                id: x.id,
                label: getLabel(x),
            };
        })
    );
    const [valuesOriginais, setValuesOriginais] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const defer = useDeferredValue(search);
    const loading = statusRequisicao === "loading";

    function getLabel(value: any) {
        if (!value) return "";
        return value[props.keyLabel];
    }

    async function init() {
        const response = await fecth<any>();

        if (Array.isArray(response)) {
            setValuesOriginais(response);
            setValues(
                response.map((value: any) => {
                    const newLabel = getLabel(value);
                    return {
                        id: value?.id,
                        label: newLabel ? newLabel : "",
                    };
                })
            );
        }
    }

    useEffect(() => {
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defer]);

    return (
        <Autocomplete
            noOptionsText={"Não há registros"}
            id={props.id}
            multiple
            value={props.values?.map((x) => {
                return {
                    id: x.id,
                    label: getLabel(x),
                };
            })}
            loading={loading}
            loadingText="Carregando..."
            getOptionLabel={(opt) => `${opt?.label || ""}`}
            onChange={(_, newValue: any, reason) => {
                const newV = reason !== "clear" ? (newValue as any[]) : undefined;
                if (props.onChange) {
                    props.onChange(
                        props.id,
                        valuesOriginais.filter((x) => newV?.some((y) => y?.id === x?.id))
                    );
                }
            }}
            filterSelectedOptions
            disableCloseOnSelect
            defaultValue={defaultValues}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            readOnly={props.readonly}
            fullWidth
            options={values}
            size={"small"}
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
