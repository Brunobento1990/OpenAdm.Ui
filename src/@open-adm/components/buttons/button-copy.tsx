import { useState } from 'react'
import { Button, Tooltip } from '@mui/material'
import { listaIcones } from 'src/configs/listaIcones'
import { IconApp } from '../icon'
import { copiaECola } from 'src/@open-adm/utils/copia-e-cola'

interface CopyButtonProps {
  textoParaCopiar: string
  size?: 'small' | 'medium' | 'large'
  label?: string
  variant?: 'text' | 'contained' | 'outlined'
  icone?: string
  fullWidth?: boolean
  cor?: string
}

export function ButtonCopy({
  textoParaCopiar,
  size = 'medium',
  label = 'Copiar',
  variant = 'contained',
  icone = listaIcones.copy,
  fullWidth = false,
  cor
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await copiaECola(textoParaCopiar)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <Tooltip title={copied ? 'Copiado!' : 'Copiar'} placement='top' arrow>
      <Button
        fullWidth={fullWidth}
        onClick={handleCopy}
        size={size}
        variant={variant}
        endIcon={<IconApp color={copied ? undefined : cor} icon={copied ? listaIcones.ok : icone} />}
        sx={{
          //minWidth: '120px',
          transition: 'all 0.2s ease',
          ...(copied &&
            variant !== 'contained' && {
              color: '#4caf50',
              borderColor: '#4caf50',
              backgroundColor: '#e8f5e9',
              '&:hover': {
                borderColor: '#2e7d32',
                backgroundColor: '#c8e6c9'
              }
            }),
          ...(copied &&
            variant === 'contained' && {
              backgroundColor: '#4caf50',
              '&:hover': {
                backgroundColor: '#2e7d32'
              }
            })
        }}
      >
        {copied ? 'Copiado!' : label}
      </Button>
    </Tooltip>
  )
}
