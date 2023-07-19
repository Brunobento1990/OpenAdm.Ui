import { Box, Divider, MenuItem, MenuList, Typography } from '@mui/material';
import Popover from '@mui/material/Popover';
import { useNavigate } from 'react-router-dom';
import { useContextApp } from '../../hooks/use-context-app';

interface IPropoverProps{
    open:boolean;
    onClose:() => void;
}

export function PopoverCustom(props: IPropoverProps) {

    const navigate = useNavigate();

    const useContext = useContextApp();
    const sessionInfo = useContext.getSessionInfo();

    function sair(){
        useContext.clearContextApp();
        navigate("/")
    }

    return (

        <Popover
            open={props.open}
            anchorOrigin={{
                horizontal:'right',
                vertical:'top'
            }}
            sx={{ width: 300 , top: 35}}
            onClose={props.onClose}
        >
            <Box
                sx={{
                    py: 1.5,
                    px: 2,
                    width: 200
                }}
            >
                <Typography variant="overline">
                    Perfil
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    {sessionInfo?.nome}
                </Typography>
            </Box>
            <Divider />
            <MenuList
                disablePadding
                dense
                sx={{
                    p: '8px',
                    '& > *': {
                        borderRadius: 1
                    }
                }}
            >
                <MenuItem onClick={() => navigate("/meu-perfil")}>
                    Meu perfil
                </MenuItem>
            </MenuList>
            <Divider />
            <MenuList
                disablePadding
                dense
                sx={{
                    p: '8px',
                    '& > *': {
                        borderRadius: 1
                    }
                }}
            >
                <MenuItem onClick={sair}>
                    Sair
                </MenuItem>
            </MenuList>
        </Popover>

    );
}