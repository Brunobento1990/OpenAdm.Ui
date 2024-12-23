// ** MUI Imports
import MuiChip from '@mui/material/Chip'

// ** Third Party Imports
import clsx from 'clsx'

// ** Types
import { CustomChipProps } from './types'

// ** Hooks Imports
import useBgColor, { UseBgColorType } from 'src/@core/hooks/useBgColor'

const Chip = (props: CustomChipProps) => {
  // ** Props
  const { sx, skin, color, rounded } = props

  // ** Hook
  const bgColors = useBgColor()

  const colors: UseBgColorType = {
    primary: { ...bgColors.primaryLight },
    secondary: { ...bgColors.secondaryLight },
    success: { ...bgColors.successLight },
    error: { ...bgColors.errorLight },
    warning: { ...bgColors.warningLight },
    info: { ...bgColors.infoLight }
  }

  const propsToPass = { ...props }

  propsToPass.rounded = undefined

  return (
    <MuiChip
      {...propsToPass}
      variant='filled'
      className={clsx({
        'MuiChip-rounded': rounded,
        'MuiChip-light': skin === 'light'
      })}
      sx={skin === 'light' && color ? Object.assign(colors[color], sx) : sx}
    />
  )
}

interface propsStatusApp {
  cor: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";
  titulo?: string;
  width?: string;
}

export function StatusApp(props: propsStatusApp) {
  return (
    <Chip
      rounded
      size='small'
      skin='light'
      color={props.cor}
      label={props.titulo}
      sx={{ '& .MuiChip-label': { textTransform: 'capitalize' }, width: props.width }}
    />
  )
}

export default Chip
