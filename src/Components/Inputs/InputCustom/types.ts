export interface InputCustomTypes {
    label: string;
    required?: boolean;
    type: string;
    readonly?: boolean;
    value:any;
    onBlur?:(value: any) => void;
    onChange?:(value: string) => void;
    readOnly?:boolean;
    step?:string;
    maxLength?:number;
    size?:"small" | "medium";
    fullWidth?:boolean;
    margin?:number
}