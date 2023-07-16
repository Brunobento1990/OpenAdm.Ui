import Box from "@mui/material/Box";
import { ReactNode, useState } from "react";
import { Siderbar } from "../Sidebar";
import { useTheme } from "@mui/material";
import { useThemeApp } from "../../hooks/use-theme-app";
import { Header } from "../Header";

interface OutletProps {
    children: ReactNode;
    text: string;
};

export function Layout(props: OutletProps) {

    const theme = useTheme();
    const themeApp = useThemeApp();
    const [open, setOpen] = useState<boolean>(true);

    const width = open ? '225px' : '25px'

    function openSidebar() {
        setOpen(!open)
    }

    return (
        <Box height='100vh' display='flex' width='100%' margin={0}>

            {open &&
                <Siderbar
                    open={open}
                    openSideBar={openSidebar}
                    width={width}
                />
            }
            <Box
                marginLeft={width}
                width='100%'
            >
                <Header
                    open={open}
                    openSidebar={openSidebar}
                    text={props.text}
                />
                {props.children}
            </Box>
        </Box>
    );
}