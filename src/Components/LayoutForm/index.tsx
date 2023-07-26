import { Box, Grid, Paper } from "@mui/material";
import { ReactNode } from "react";
import { ButtonCustom } from "../Buttons/ButtonCustom";

interface OutletProps {
    children: ReactNode;
    height: string;
    onSubmit:() => void
};


export function LayoutForm(props: OutletProps) {
    return (
        <Box
            margin={2}
            marginTop={5}
            marginBottom={5}
            width='98%'
            height={props.height}
            display='flex'
            flexDirection='column'
            component={Paper}
        >
            <Grid
                container
                direction='column'
                display='flex'
                alignItems="flex-start"
                padding={2}
                spacing={2}
            >
                {props.children}
            </Grid>
            <Box
                display='flex'
                width='81%'
                justifyContent='end'
                sx={{ position:'fixed', bottom:'1.8rem', marginRight:'1rem'}}
            >
                <ButtonCustom
                    text="Editar"
                    onClick={props.onSubmit}
                />
            </Box>
        </Box>

    );
}