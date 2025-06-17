import { ReactNode } from "react";
import { IFormikAdapter } from "../adapters/formik-adapter";

export type FormAction = "create" | "edit" | "view";
export type FormLoading = "form" | "pdf" | "xls";

export interface IFormTypes {
    action: FormAction;
}

export interface IFormGeneric<T> {
    form: IFormikAdapter<T>;
    readonly?: boolean;
    urlVoltar?: string;
    carregando?: boolean;
    action?: FormAction;
}

export interface propsFormRow {
    children: ReactNode;
    spacing?: number;
    xs?: number;
    md?: number;
    sm?: number;
    marginTop?: string;
    width?: string;
    direction?: "column" | "row";
    borderBottom?: string;
    backGroudnColor?: string;
    marginBotton?: string;
    padding?: string;
    borderRadius?: string;
}
