import Box from "@mui/material/Box";
import { ReactNode, useEffect, useState } from "react";
import { Siderbar } from "../Sidebar";
import { Header } from "../Header";
import { useContextApp } from "../../hooks/use-context-app";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";

interface OutletProps {
    children: ReactNode;
    text: string;
};

export function Layout(props: OutletProps) {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const useContext = useContextApp();
    const sessionInfo = useContext.getSessionInfo();
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(!smDown);
    const width = open ? '225px' : '25px'

    function handleNavigate(url:string){
        if(open && smDown){
            setOpen(false)
        }
        navigate(url)
    }

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
                    handleNavigate={(value) => handleNavigate(value)}
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