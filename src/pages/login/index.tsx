import { useState, ReactNode, useEffect } from 'react'
import authConfig from 'src/configs/auth'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from 'src/hooks/useAuth'
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { Logo } from 'src/@open-adm/logo'
import AuthIllustrationV1Wrapper from './styles'
import { Card, CardContent } from '@mui/material'
import { useLocalStorage } from 'src/hooks/useLocalStorage'

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))
const messageRequered = "Este campo é obrigatório!";
const schema = yup.object().shape({
  email: yup.string().email("E-mail inválido!").required(messageRequered),
  password: yup.string().required(messageRequered)
})

const defaultValues = {
  password: '',
  email: ''
}

interface FormData {
  email: string
  password: string
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { getItem } = useLocalStorage();

  // ** Hooks
  const auth = useAuth()

  useEffect(() => {
    const lembreMe = getItem<string>(authConfig.lembreMe);
    const lembreMeEmail = getItem<string>(authConfig.lembreMeEmail);
    if (lembreMe === 'true' && lembreMeEmail) {
      setRememberMe(true);
      setValue("email", lembreMeEmail);
    } else {
      setRememberMe(false)
    }
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const { email, password } = data
    await auth.login({ email, password, rememberMe });
    setLoading(false);
  }

  return (
    <Box className='content-center'>
      <AuthIllustrationV1Wrapper>
        <Card>
          <CardContent sx={{ p: theme => `${theme.spacing(10.5, 8, 8)} !important` }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Logo />
              <Typography variant='h3' sx={{ ml: 2.5, fontWeight: 700 }}>
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h4' sx={{ mb: 1.5 }}>
                {`Ben vindo a ${themeConfig.templateName}! 👋🏻`}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Por favor, efetue o login com suas credenciais de acesso !
              </Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    autoFocus
                    label='Email'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='admin@iscaslune.com'
                    error={Boolean(errors.email)}
                    {...(errors.email && { helperText: errors.email.message })}
                  />
                )} />
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    onBlur={onBlur}
                    label='Senha'
                    onChange={onChange}
                    id='auth-login-v2-password'
                    error={Boolean(errors.password)}
                    {...(errors.password && { helperText: errors.password.message })}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onMouseDown={e => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
              <Box
                sx={{
                  mb: 1.75,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <FormControlLabel
                  label='Lembre me'
                  control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
                />
                <Typography component={LinkStyled} href='/pages/auth/forgot-password-v1'>
                  Esqueceu sua senha?
                </Typography>
              </Box>
              <Button disabled={loading} fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                {loading ? 'Aguarde...' : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </AuthIllustrationV1Wrapper>
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
