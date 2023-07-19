import { Box, Grid, Paper } from "@mui/material";
import { ReactNode } from "react";

interface OutletProps {
    children: ReactNode;
};


export function LayoutForm(props: OutletProps){
    return(
        <Box
            margin={2}
            marginTop={5}
            height='80%'
            display='flex'
            flexDirection='column'
            component={Paper}
        >
            <Grid
                container
                direction='column'
                padding={2}
                spacing={2}
            >
                {props.children}
            </Grid>
        </Box>

    );
}