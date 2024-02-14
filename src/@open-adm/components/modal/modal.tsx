import { Ref, forwardRef, ReactElement, ReactNode, useState } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
import { useSettings } from 'src/@core/hooks/useSettings'
import { Typography } from '@mui/material'

const Transition = forwardRef(function Transition(
    props: FadeProps & { children?: ReactElement<any, any> },
    ref: Ref<unknown>
) {
    return <Fade ref={ref} {...props} />
})

const CustomCloseButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
    top: 0,
    right: 0,
    color: 'grey.500',
    position: 'absolute',
    boxShadow: theme.shadows[2],
    transform: 'translate(10px, -10px)',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: `${theme.palette.background.paper} !important`,
    transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
    '&:hover': {
        transform: 'translate(7px, -5px)'
    }
}))

interface modalShow {
    message?: string;
    confirmed: () => void;
}

let show: (modalShow: modalShow) => void;
let confirmed: () => void;
let close: () => void;

export function useModal() {
    return {
        Component: ModalWithMessage,
        show,
        close
    }
}

function ModalWithMessage() {

    const { settings } = useSettings();
    const [message, setMessage] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const { direction } = settings;
    const arrowIcon = direction === 'ltr' ? 'tabler:chevron-right' : 'tabler:chevron-left'

    close = () => {
        setOpen(false);
    }

    show = (modalShow: modalShow) => {
        setMessage(modalShow.message ?? 'Confirma a exclusão do registro?')
        setOpen(true);
        confirmed = modalShow.confirmed;
    }

    return (
        <Card>
            <Dialog
                fullWidth
                open={open}
                maxWidth='md'
                scroll='body'
                onClose={close}
                TransitionComponent={Transition}
                sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
            >
                <DialogContent
                    sx={{
                        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                        py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                    }}
                >
                    <CustomCloseButton onClick={close}>
                        <Icon icon='tabler:x' fontSize='1.25rem' />
                    </CustomCloseButton>
                    <Typography variant='h3' sx={{ mb: 3 }}>
                        {message}
                    </Typography>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant='contained'
                            endIcon={<Icon icon={arrowIcon} />}
                            onClick={confirmed}
                        >
                            Continue
                        </Button>
                    </Grid>
                </DialogContent>
            </Dialog>
        </Card>
    )
}
