import { useState } from "react";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ChecklistIcon from '@mui/icons-material/Checklist';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useThemeApp } from "../../hooks/use-theme-app";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ApartmentIcon from '@mui/icons-material/Apartment';

interface IListSidebarProps {
    onNavigate: (url: string) => void;
}

export function ListSidebar(props: IListSidebarProps) {

    const themeApp = useThemeApp();
    const [open, setOpen] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(1);
    const url = window.location.pathname;

    function handleClick() {
        setOpen(!open)
    }

    function handleListItemClick(index: number) {
        setSelectedIndex(index)

        if (index === 1) props.onNavigate('/home')
        if (index === 2) props.onNavigate('/usuarios')
        if (index === 4) props.onNavigate('/pedidos')
        if (index === 5) props.onNavigate('/relatorios-pedidos')
        if (index === 7) props.onNavigate('/minha-empresa')
    }

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
                backgroundColor: themeApp.backgroudcolor.primary,
                color: themeApp.color.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <ListItemButton
                selected={url === "/home"}
                onClick={() => handleListItemClick(1)}
                sx={{
                    backgroundColor: url === "/home" ? themeApp.backgroudcolor.secundary : themeApp.backgroudcolor.primary,
                    borderRadius: '8px',
                    width: '90%'
                }}
            >
                <ListItemIcon>
                    <HomeIcon
                        sx={{ color: url === "/home" ? themeApp.color.secundary : themeApp.color.primary, }}
                    />
                </ListItemIcon>
                <ListItemText primary="Dashboard"
                    primaryTypographyProps={themeApp.configFont}
                />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 6}
                onClick={() => {
                    handleClick()
                    handleListItemClick(6)
                }}
                sx={{
                    backgroundColor: selectedIndex === 6 ? themeApp.backgroudcolor.secundary : themeApp.backgroudcolor.primary,
                    borderRadius: '8px',
                    width: '90%'
                }}
            >
                <ListItemIcon>
                    <AddCircleIcon
                        sx={{ color: selectedIndex === 6 ? themeApp.color.secundary : themeApp.color.primary, }}
                    />
                </ListItemIcon>
                <ListItemText primary="Cadastros"
                    primaryTypographyProps={themeApp.configFont}
                />
                {selectedIndex === 6 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={selectedIndex === 6} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton
                        selected={url === "/usuarios"}
                        onClick={() => handleListItemClick(2)}
                        sx={{
                            backgroundColor: url === "/usuarios" ? themeApp.backgroudcolor.secundary : themeApp.backgroudcolor.primary,
                            borderRadius: '8px',
                            width: '90%'
                        }}
                    >
                        <ListItemIcon>
                            <AccountCircleIcon
                                sx={{ color: url === "/usuarios" ? themeApp.color.secundary : themeApp.color.primary, }}
                            />
                        </ListItemIcon>
                        <ListItemText primary="Usuários"
                            primaryTypographyProps={themeApp.configFont}
                        />
                    </ListItemButton>
                </List>
            </Collapse>
            <ListItemButton
                selected={selectedIndex === 3}
                onClick={() => {
                    handleClick()
                    handleListItemClick(3)
                }}
                sx={{
                    backgroundColor: selectedIndex === 3 ? themeApp.backgroudcolor.secundary : themeApp.backgroudcolor.primary,
                    borderRadius: '8px',
                    width: '90%'
                }}
            >
                <ListItemIcon>
                    <LocalOfferIcon
                        sx={{ color: selectedIndex === 3 ? themeApp.color.secundary : themeApp.color.primary, }}
                    />
                </ListItemIcon>
                <ListItemText primary="Pedidos"
                    primaryTypographyProps={themeApp.configFont}
                />
                {selectedIndex === 3 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={selectedIndex === 3} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton
                        selected={selectedIndex === 4}
                        onClick={() => handleListItemClick(4)}
                        sx={{
                            backgroundColor: selectedIndex === 4 ? themeApp.backgroudcolor.secundary : themeApp.backgroudcolor.primary,
                            borderRadius: '8px',
                            width: '90%',
                            pl: 4
                        }}
                    >
                        <ListItemIcon>
                            <ChecklistIcon
                                sx={{ color: selectedIndex === 4 ? themeApp.color.secundary : themeApp.color.primary, }}
                            />
                        </ListItemIcon>
                        <ListItemText primary="Lista de pedidos"
                            primaryTypographyProps={themeApp.configFont}
                        />
                    </ListItemButton>
                    <ListItemButton
                        sx={{
                            backgroundColor: selectedIndex === 5 ? themeApp.backgroudcolor.secundary : themeApp.backgroudcolor.primary,
                            borderRadius: '8px',
                            width: '90%',
                            pl: 4
                        }}
                        selected={selectedIndex === 5}
                        onClick={() => handleListItemClick(5)}
                    >
                        <ListItemIcon>
                            <AssessmentIcon
                                sx={{ color: selectedIndex === 5 ? themeApp.color.secundary : themeApp.color.primary, }}
                            />
                        </ListItemIcon>
                        <ListItemText primary="Relatórios"
                            primaryTypographyProps={themeApp.configFont}
                        />
                    </ListItemButton>
                </List>
            </Collapse>
            <ListItemButton
                selected={url === "/minha-empresa"}
                onClick={() => handleListItemClick(7)}
                sx={{
                    backgroundColor: url === "/minha-empresa" ? themeApp.backgroudcolor.secundary : themeApp.backgroudcolor.primary,
                    borderRadius: '8px',
                    width: '90%'
                }}
            >
                <ListItemIcon>
                    <ApartmentIcon
                        sx={{ color: url === "/minha-empresa" ? themeApp.color.secundary : themeApp.color.primary, }}
                    />
                </ListItemIcon>
                <ListItemText primary="Minha empresa"
                    primaryTypographyProps={themeApp.configFont}
                />
            </ListItemButton>
        </List>
    );
}