import { Divider, Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Logo } from '../Logo';
import MenuIcon from '@mui/icons-material/Menu';
import { ListSidebar } from '../ListSidebar';
import { useThemeApp } from '../../hooks/use-theme-app';

interface ISidebarProps {
    open: boolean;
    openSideBar: () => void;
    width:string
}

export function Siderbar(props: ISidebarProps) {

    const themeApp = useThemeApp();
    const theme = useTheme();

    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    return (

        <Drawer
            variant={smDown ? 'temporary' : 'permanent'}
            open={props.open}
        >
            <Box
                width={props.width}
                height='100%'
                display='flex'
                flexDirection='column'
                sx={{ backgroundColor: themeApp.backgroudcolor.primary }}
            >
                <Box
                    width='100%'
                    height={theme.spacing(6)}
                    display='flex'
                    alignItems='center'
                    justifyContent='space-around'
                >
                    <Box
                        sx={{
                            height: 32,
                            width: 32
                        }}
                    >
                        <Logo />
                    </Box>
                    <Typography
                        variant='subtitle2'
                        sx={themeApp.configFont}
                    >
                        Open Adm
                    </Typography>
                    <MenuIcon
                        onClick={props.openSideBar}
                        sx={{ color: themeApp.color.primary, cursor: 'pointer' }}
                    />
                </Box>

                <Divider
                    color={themeApp.color.primary}
                />

                <Box flex={1}>
                    <ListSidebar />
                </Box>
            </Box>
        </Drawer>
    );
}