export interface IButtonCustom{
    text:string;
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
    onClick?:() => void
}