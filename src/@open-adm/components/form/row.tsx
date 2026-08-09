import { Grid } from '@mui/material'
import { ReactNode } from 'react'

interface propsFormRow {
  children: ReactNode
  spacing?: number
  marginTop?: string
  marginBottom?: string
}

export function FormRow(props: propsFormRow) {
  return (
    <Grid
      container
      spacing={props.spacing ?? 2}
      sx={{ marginTop: props.marginTop ?? '.5rem', marginBottom: props.marginBottom }}
    >
      {props.children}
    </Grid>
  )
}
