import { ElementType, forwardRef } from 'react'
import Paper from '@mui/material/Paper'
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete'

const SelectCustom = forwardRef(
    <
        T,
        Multiple extends boolean | undefined,
        DisableClearable extends boolean | undefined,
        FreeSolo extends boolean | undefined,
        ChipComponent extends ElementType
    >(
        props: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>,
        ref: any
    ) => {
        return (
            // eslint-disable-next-line lines-around-comment
            // @ts-expect-error - AutocompleteProps is not compatible with PaperProps
            <Autocomplete
                {...props}
                ref={ref}
                PaperComponent={props => <Paper {...props} className='custom-autocomplete-paper' />}
            />
        )
    }
) as typeof Autocomplete

export default SelectCustom
