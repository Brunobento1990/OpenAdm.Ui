import { useState, useEffect } from 'react';
import { Autocomplete } from '@mui/material';
import { InputCustom } from '../input';
import { useNewApi } from 'src/@open-adm/hooks/use-new-api';
import CustomTextField from 'src/@core/components/mui/text-field';

interface propsDropDownScroll {
    id: string;
    url: string;
    keyLabel: string;
    label: string;
    segundaKeyLabel?: string;
    onChange?: (key: string, newValue?: any) => void;
    requerid?: boolean;
    helperText?: any;
    error?: boolean;
    value?: any;
    readonly?: boolean;
    width?: string;
    retornarObjetoCompleto?: boolean;
}

export function DropDownScroll(props: propsDropDownScroll) {
    const [search, setSearch] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<any[]>([]);
    const [opcoesOriginais, setOpcoesOriginais] = useState<any[]>([]);
    const [value, setValue] = useState<any>(props.value);
    const { fecth } = useNewApi({
        method: 'POST',
        url: props.url,
        notAlert: true,
    })

    async function getItens() {
        if (props.readonly) return;
        const newItems = await fecth<any>({
            body: {
                search
            }
        });
        if (Array.isArray(newItems)) {
            setOptions(newItems);
            if (props.retornarObjetoCompleto) {
                setOpcoesOriginais(newItems);
            }
        }

        if (Array.isArray(newItems?.values)) {
            setOptions(newItems?.values);
            if (props.retornarObjetoCompleto) {
                setOpcoesOriginais(newItems?.values);
            }
        }
    }

    function getLabel(value: any) {
        if (!value) return '';
        if (
            props.segundaKeyLabel &&
            value[props.segundaKeyLabel] &&
            value[props.keyLabel]
        ) {
            return `${value[props.keyLabel]} - ${value[props.segundaKeyLabel]}`;
        }

        if (value[props.keyLabel]) {
            return value[props.keyLabel];
        }

        return '';
    }

    useEffect(() => {
        const initial = () => {
            if (props.value) {
                const newOption = {
                    id: props?.value?.id,
                    label: getLabel(props.value),
                };
                const newValue = options.find((x) => x?.id === props?.value?.id);
                if (!newValue) {
                    setOptions((state) => [...state, newOption]);
                    if (props.retornarObjetoCompleto) {
                        setOpcoesOriginais((state) => [...state, newOption]);
                    }
                }
                setValue(newOption);
                return;
            }

            setValue(undefined);
        };
        initial();
    }, [props.value]);

    useEffect(() => {
        getItens();
    }, [search]);

    return (
        <Autocomplete
            open={open}
            id={props.id}
            loadingText='Carregando...'
            noOptionsText='Sem registros'
            disabled={props.readonly}
            size='small'
            value={
                typeof value === 'string' && value.length === 0
                    ? null
                    : value === undefined
                        ? null
                        : value
            }
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            isOptionEqualToValue={(option, value) => option?.id === value.id}
            onChange={(_, newValue: any, reason) => {
                const newValor = reason !== 'clear' ? newValue : undefined;
                setValue(newValor);
                if (props.onChange) {
                    if (props.retornarObjetoCompleto) {
                        props.onChange(
                            props.id,
                            opcoesOriginais.find((x) => x?.id === newValor?.id),
                        );
                        return;
                    }
                    props.onChange(props.id, newValor?.id);
                }
            }}
            options={options.map((val) => {
                return {
                    id: val.id,
                    label: getLabel(val),
                };
            })}
            getOptionLabel={(opt) => `${opt?.label || ''}`}
            renderInput={(params) => (
                <CustomTextField
                    name={''}
                    value={undefined}
                    {...params}
                    id={props.id}
                    label={props.label}
                    required={props.requerid}
                    helperText={props.helperText}
                    error={props.error}
                    onChange={(value) => {
                        setSearch(value.target.value);
                    }}
                />
            )}
        />
    );
}