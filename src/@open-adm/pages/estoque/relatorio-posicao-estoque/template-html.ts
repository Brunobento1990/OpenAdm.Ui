import { IPosicaoEstoqueUpdate } from "src/@open-adm/types/movimento-produto";

export const gerarHtmlRelatorioPosicaoEstoque = (dados: IPosicaoEstoqueUpdate[]): string => {

    const totalItens = dados.length;
    const quantidadeTotal = dados.reduce((acc, item) => acc + item.quantidade, 0);

    const gerarLinhasTabela = () => {
        return dados.map((item) => {
            return `
        <tr>
          <td>${item.produto}</td>
          <td>${item.categoria || ''}</td>
          <td>${item.peso || ''}</td>
          <td>${item.tamanho || ''}</td>
          <td>${item.quantidade.toFixed(2)}</td>
          <td>${item.quantidadeDisponivel.toFixed(2)}</td>
          <td>${item.quantidadeReservada.toFixed(2)}</td>
        </tr>
      `;
        }).join('');
    };

    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório de Posição de Estoque</title>
    <style>
        @media print {
            @page {
                size: A4;
                margin: 0cm;
            }
            
            body {
                margin: 0;
                padding: 0;
            }
            
            .no-print {
                display: none !important;
            }
            
            table {
                page-break-inside: auto;
            }
            
            tr {
                page-break-inside: avoid;
                page-break-after: auto;
            }
            
            thead {
                display: table-header-group;
            }
        }
        
        body {
            font-family: Arial, sans-serif;
            font-size: 11px;
            color: #000;
            padding: 20px;
        }
        
        .print-header {
            margin-bottom: 15px;
        }
        
        .print-header h1 {
            margin: 0;
            font-size: 14px;
            font-weight: bold;
        }
        
        .print-info {
            margin-bottom: 15px;
            font-size: 10px;
        }
        
        .print-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }
        
        .print-table th {
            padding: 3px 4px;
            text-align: left;
            font-weight: bold;
            font-size: 10px;
            border-bottom: 1px solid #000;
        }
        
        .print-table td {
            padding: 2px 4px;
            font-size: 10px;
        }
        
        .text-right {
            text-align: right;
        }
        
        .text-center {
            text-align: center;
        }
        
        .print-summary {
            margin-top: 15px;
            font-size: 10px;
            font-weight: bold;
        }
        
        .print-summary div {
            margin-bottom: 3px;
        }
        
        .print-footer {
            margin-top: 20px;
            text-align: right;
            font-size: 9px;
            color: #666;
        }
        
        .print-button {
            position: fixed;
            top: 10px;
            right: 10px;
            padding: 10px 20px;
            background-color: #1976d2;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            z-index: 1000;
        }
        
        .print-button:hover {
            background-color: #1565c0;
        }
    </style>
</head>
<body>
    <div class="print-header">
        <h1>Relatório de Posição de Estoque</h1>
    </div>

    <table class="print-table">
        <thead>
            <tr>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Peso</th>
                <th>Tamanho</th>
                <th>Quantidade</th>
                <th>Disponível</th>
                <th>Reservada</th>
            </tr>
        </thead>
        <tbody>
            ${gerarLinhasTabela()}
        </tbody>
    </table>

    <div class="print-summary">
        <div>Total produtos: ${quantidadeTotal.toFixed(2)}</div>
    </div>

    <div class="print-footer">
        ${totalItens === 1 ? '1/1' : `${totalItens} itens`}
    </div>
</body>
</html>
  `;
};
