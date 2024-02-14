import { IProdutosMaisVendidos } from "./produtos-mais-vendidos";

export interface IHome {
    quantidadeVendasNoMes: number,
    produtosMaisVendidosViewModel: IProdutosMaisVendidos[]
}