import { IBase } from "./base";

export interface IHome {
    topUsuariosTotalCompra: ITopUsuarios[],
    topUsuariosTotalPedido: ITopUsuarios[]
}

export interface ITopUsuarios extends IBase {
    totalCompra: number,
    totalPedidos: number,
    usuario: string
}