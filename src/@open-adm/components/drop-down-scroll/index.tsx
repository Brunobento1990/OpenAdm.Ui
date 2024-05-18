import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TextField, Autocomplete, CircularProgress } from '@mui/material';
import { ItensDropDown } from './itens';
import { apiDropDown } from './api-drop-down';

interface propsDropDownScroll {
    url: string;
    keyLabel: string;
    label: string;
}

const quantidadeDePagina = 10;

export function DropDownScroll(props: propsDropDownScroll) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<any[]>([]);
    const [pagina, setPagina] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const listboxRef = useRef<HTMLDivElement>(null);
    const previousScrollTop = useRef(0);
    const { fetchDropDown } = apiDropDown({
        pagina,
        quantidadeDePagina,
        url: props.url
    })

    const loadMoreItems = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        const newItems = await fetchDropDown();
        setOptions((prev) => [...prev, ...newItems?.values ?? []]);

        if (!newItems || newItems?.values?.length < quantidadeDePagina) {
            setHasMore(false);
        }

        setPagina((prevPage) => prevPage + 1);
        setLoading(false);
    }, [loading, hasMore, pagina]);

    useEffect(() => {
        loadMoreItems();
    }, []);

    useEffect(() => {
        if (listboxRef.current) {
            listboxRef.current.scrollTop = previousScrollTop.current;
        }
    }, [options]);

    const handleScroll = (event: any) => {
        const listboxNode = event.currentTarget;
        previousScrollTop.current = listboxNode.scrollTop;
        if (listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight - 10) {
            loadMoreItems();
        }
    };

    return (
        <Autocomplete
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            ListboxComponent={(props) => (
                <ItensDropDown {...props} onScroll={handleScroll} ref={listboxRef} />
            )}
            getOptionLabel={(option) => option[props.keyLabel]}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={props.label}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
}

