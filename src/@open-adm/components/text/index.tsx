import { Typography } from '@mui/material'

interface propsTextApp {
  texto?: string
  color?: string
  fontWeight?: number
  fontSize?: string
  padding?: string
  width?: string
  textAlign?: string
  marginBottom?: string
}

export function TextApp(props: propsTextApp) {
  return (
    <Typography
      sx={{ color: props.color ?? 'text.secondary', padding: props.padding, width: props.width }}
      fontWeight={props.fontWeight}
      fontSize={props.fontSize}
      marginBottom={props.marginBottom}
      textAlign={props.textAlign as any}
    >
      {props.texto ?? ''}
    </Typography>
  )
}
