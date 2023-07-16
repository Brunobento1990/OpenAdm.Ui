import { Button } from "@mui/material";
import { IButtonCustom } from "./types";

export function ButtonCustom(props:IButtonCustom){
    return(
        <Button 
            variant="contained" 
            color={props.color}
            onClick={props.onClick}
        >
            {props.text}
        </Button>
    )
}