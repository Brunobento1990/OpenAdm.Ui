import Box from "@mui/material/Box";
import { ReactNode, useEffect, useState } from "react";
import { Siderbar } from "../Sidebar";
import { useTheme } from "@mui/material";
import { useThemeApp } from "../../hooks/use-theme-app";
import { Header } from "../Header";
import { useContextApp } from "../../hooks/use-context-app";
import { useNavigate } from "react-router-dom";

interface OutletProps {
    children: ReactNode;
    text: string;
};

export function Layout(props: OutletProps) {

    const useContext = useContextApp();
    const sessionInfo = useContext.getSessionInfo();
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(true);

    const width = open ? '225px' : '25px'

    function openSidebar() {
        setOpen(!open)
    }

    useEffect(() => {
        if(!sessionInfo){
            navigate("/")
        }
    },[])

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
                marginLeft={open ? '225px' : '0'}
                width='100%'
            >
                <Header
                    open={open}
                    openSidebar={openSidebar}
                    text={props.text}
                    avatar={sessionInfo?.avatar}
                />
                {props.children}
            </Box>
        </Box>
    );
}