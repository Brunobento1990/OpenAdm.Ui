
import { IParcela } from '../types/fatura';
import { cleanFormatMoney } from './format-money';

interface IPropsGerarParcela {
    valor?: string | number;
    quantidadeDeParcelas: number;
}

export function geradorParcelas(
    props: IPropsGerarParcela,
): IParcela[] | undefined {
    if (!props.valor || !props.quantidadeDeParcelas) {
        return undefined;
    }
    const valor = cleanFormatMoney(props.valor) ?? 0;
    const dataAtual = new Date();
    let novasParcelas: IParcela[] = [];
    const valorParcela =
        Math.floor((valor / props.quantidadeDeParcelas) * 100) /
        100;
    const valorUltimaParcela =
        valor - valorParcela * (props.quantidadeDeParcelas - 1);

    let proximoMesVencimento = dataAtual.getMonth() + 1;
    let proximoAnoVencimento = dataAtual.getFullYear();

    for (let i = 0; i < props.quantidadeDeParcelas - 1; i++) {
        proximoMesVencimento++;
        if (proximoMesVencimento > 12) {
            proximoMesVencimento = 1;
            proximoAnoVencimento += 1;
        }
        const proximoDiaVencimento = diaVencimentoDaParcela(
            dataAtual,
            proximoMesVencimento,
        );
        novasParcelas.push({
            dataDeVencimento: dataVencimentoJson(
                proximoAnoVencimento,
                proximoMesVencimento,
                proximoDiaVencimento,
            ),
            numeroDaParcela: i + 1,
            valor: valorParcela,
        } as any);
    }

    proximoMesVencimento += 1;
    if (proximoMesVencimento > 12) {
        proximoMesVencimento = 1;
        proximoAnoVencimento += 1;
    }
    const proximoDiaVencimento = diaVencimentoDaParcela(
        dataAtual,
        proximoMesVencimento,
    );
    novasParcelas.push({
        dataDeVencimento: dataVencimentoJson(
            proximoAnoVencimento,
            proximoMesVencimento,
            proximoDiaVencimento,
        ),
        numeroDaParcela: props.quantidadeDeParcelas,
        valor: valorUltimaParcela
    } as any);

    return novasParcelas;
}

function dataVencimentoJson(
    proximoAnoVencimento: number,
    proximoMesVencimento: number,
    proximoDiaVencimento: number,
) {
    return `${proximoAnoVencimento}-${proximoMesVencimento
        .toString()
        .padStart(2, '0')}-${proximoDiaVencimento
            .toString()
            .padStart(2, '0')}`;
}

function diaVencimentoDaParcela(
    dataAtual: Date,
    proximoMesVencimento: number
): number {
    let proximoDiaVencimento = dataAtual.getDate();

    if (proximoDiaVencimento > diaMaxDoMes[proximoMesVencimento]) {
        proximoDiaVencimento = diaMaxDoMes[proximoMesVencimento];
    }

    return proximoDiaVencimento;
}

export const diaMaxDoMes: any = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
};