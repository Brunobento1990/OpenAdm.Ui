import { Ref, forwardRef, ReactElement, ReactNode } from 'react'
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

interface modalWithChildrenProps {
    children: ReactNode;
    open: boolean;
    confimerd: () => void;
    close: () => void;
}

export function ModalWithChildren(props: modalWithChildrenProps) {

    const { settings } = useSettings()
    const { direction } = settings;
    const arrowIcon = direction === 'ltr' ? 'tabler:chevron-right' : 'tabler:chevron-left'

    return (
        <Card>
            <Dialog
                fullWidth
                open={props.open}
                maxWidth='md'
                scroll='body'
                onClose={props.close}
                TransitionComponent={Transition}
                sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
            >
                <DialogContent
                    sx={{
                        px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                        py: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                    }}
                >
                    <CustomCloseButton onClick={props.close}>
                        <Icon icon='tabler:x' fontSize='1.25rem' />
                    </CustomCloseButton>
                    {props.children}
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant='contained'
                            endIcon={<Icon icon={arrowIcon} />}
                            onClick={props.confimerd}
                        >
                            Continue
                        </Button>
                    </Grid>
                </DialogContent>
            </Dialog>
        </Card>
    )
}
