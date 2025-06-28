import { useDeferredValue, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { TypeMethod, useNewApi } from "src/@open-adm/hooks/use-new-api";
import CustomTextField from "src/@core/components/mui/text-field";

interface propsDropDown {
    value?: any;
    onChange?: (id: string, newValue?: any) => void;
    label: string;
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

export function DropDownAutoFetchApp(props: propsDropDown) {
    const { fecth, statusRequisicao } = useNewApi({
        method: props.method ?? "POST",
        url: props.url,
        naoRenderizarResposta: true,
    });
    const [values, setValues] = useState<any[]>([]);
    const [valuesOriginais, setValuesOriginais] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const defer = useDeferredValue(search);
    const loading = statusRequisicao === "loading";

    function getLabel(value: any) {
        if (!value) return "";
        return value[props.keyLabel];
    }

    async function init() {
        if (props.readonly) {
            return;
        }

        const response = await fecth<any>({
            body: {
                search: defer && defer.length > 0 ? defer : undefined,
            },
        });

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
            value={
                typeof props.value === "string" && props.value.length === 0
                    ? null
                    : props.value === undefined
                        ? null
                        : {
                            id: props.value?.id,
                            label: getLabel(props.value),
                        }
            }
            loading={loading}
            loadingText="Carregando..."
            getOptionLabel={(opt) => `${opt?.label || ""}`}
            onChange={(_, newValue: any, reason) => {
                const newV = reason !== "clear" ? newValue : undefined;
                if (props.onChange) {
                    props.onChange(
                        props.id,
                        valuesOriginais.find((x) => x?.id === newV?.id)
                    );
                }
            }}
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
                    onChange={(e) => setSearch(e.target.value ?? '')}
                />
            )}
        />
    );
}
