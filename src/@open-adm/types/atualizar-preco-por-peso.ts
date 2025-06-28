import { IPeso } from "./peso";

export interface IAtualizarPrecoPorPeso {
    pesoId: string;
    peso: IPeso;
    valorUnitarioAtacado: number;
    valorUnitarioVarejo: number;
}