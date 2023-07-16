import { Avatar, Box, Chip, Divider, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useThemeApp } from "../../hooks/use-theme-app";
import { useState } from "react";
import { PopoverCustom } from "../Popover";

interface IHeaderProps {
    text: string;
    open: boolean;
    openSidebar: () => void;
};

export function Header(props: IHeaderProps) {

    const themeApp = useThemeApp();
    const [openAvatar, setOpenAvatar] = useState<boolean>(false);

    return (
        <Box
            width='100%'
            height='70px'
        >
            <Box
                display='flex'
                alignItems='center'
                justifyContent={!props.open ? 'space-between' : 'end'}
                height='50px'
            >
                {!props.open &&
                    <>
                        <Box
                            width='40px'
                            height='40px'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                            sx={{
                                backgroundColor: themeApp.backgroudcolor.primary,
                                borderRadius: '5px',
                                marginLeft: '10px'
                            }}
                        >
                            <MenuIcon
                                onClick={props.openSidebar}
                                sx={{ cursor: 'pointer', color: themeApp.color.primary }}
                            />
                        </Box>
                    </>
                }
                <Avatar
                    sx={{ margin: '10px', cursor: 'pointer' }}
                    onClick={() => setOpenAvatar(!openAvatar)}
                />
                <PopoverCustom 
                    open={openAvatar}
                    onClose={() => setOpenAvatar(!openAvatar)}
                />
            </Box>
            <Box>
                <Divider>
                    <Chip
                        label={props.text}
                    />
                </Divider>
            </Box>
        </Box>
    )
}