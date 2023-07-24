export interface InputCustomTypes {
    label: string;
    required?: boolean;
    type: string;
    readonly?: boolean;
    value:any;
    onBlur?:(value: any) => void;
    onChange?:(event: React.ChangeEvent<HTMLInputElement>) => void;
    readOnly?:boolean;
    step?:string;
    maxLength?:number;
    size?:"small" | "medium";
    fullWidth?:boolean;
    margin?:number
}