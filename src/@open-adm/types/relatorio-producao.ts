import { IPedido } from "./pedido";
import { IPeso } from "./peso";
import { IProduto } from "./produto";
import { ITamanho } from "./tamanho";

export interface IRelatorioProducao {
    pedidosIds: IPedido[];
    produtosIds: IProduto[];
    pesosIds: IPeso[];
    tamanhosIds: ITamanho[]
}