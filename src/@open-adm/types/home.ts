import { IBase } from "./base";

export interface IHome {
    topUsuariosTotalCompra: ITopUsuarios[],
    topUsuariosTotalPedido: ITopUsuarios[],
    movimentos: any[],
    faturas: any[]
}

export interface ITopUsuarios extends IBase {
    totalCompra: number,
    totalPedidos: number,
    usuario: string
}