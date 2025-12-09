import { AgGridReact } from "ag-grid-react";
import { TextApp } from "../text";
import { LoadingAppTexto } from "../loading/loading-app-texto";
import { useMemo } from "react";

export interface TypeColumns {
    field: string;
    headerName: string;
    sortable?: boolean;
    width?: number;
    hide?: boolean;
    cellRenderer?: (params: any) => any;
    pinned?: boolean | 'left' | 'right' | null | undefined;
}

interface propsTabelaComDrag {
    columns: TypeColumns[];
    rows: any[];
    minWidth?: number;
    selecionarLinha?: (row: any, index: number) => void;
    maxHeight?: number | string;
    height?: number | string;
    width?: number | string;
    marginTop?: string;
    borderCollapse?:
    | 'collapse'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'revert-layer'
    | 'separate'
    | 'unset';
    loading?: boolean;
    rowHeight?: number;
    suppressScrollOnNewData?: boolean;
    suppressAnimationFrame?: boolean;
    headerHeight?: number;
    nomeDaTabela?: string;
}

export function TabelaComDrag(props: propsTabelaComDrag) {

    function atualizarColunas(colunas: string) {
        if (!props.nomeDaTabela) return;
        localStorage.setItem(
            `table_columns_${props.nomeDaTabela}`,
            colunas,
        );
    }

    const columns = useMemo(() => {
        const addHeaderTooltip = (col: TypeColumns) => ({
            ...col,
            cellClass: 'ag-center-cols-cell',
            headerTooltip: col.sortable
                ? `Ordenar por ${col.headerName}`
                : undefined,
        });

        const colunasLocalStorage = props.nomeDaTabela ? localStorage.getItem(`table_columns_${props.nomeDaTabela}`) : null;
        const parsedColunas = colunasLocalStorage ? JSON.parse(colunasLocalStorage) : null;

        if (
            parsedColunas &&
            Array.isArray(parsedColunas) &&
            parsedColunas.length > 0
        ) {
            return [
                ...mergeColumns(parsedColunas, props.columns).map(
                    addHeaderTooltip,
                ),
            ];
        }
        return [...props.columns.map(addHeaderTooltip)];
    }, [props.columns]);

    return (
        <div
            onContextMenu={(e) => e.preventDefault()}
            style={{
                width: props.width ?? '100%',
                height: props.height ?? '100%',
                marginTop: props.marginTop,
            }}
        >
            <style>
                {`
          .ag-center-cols-cell {
            display: flex;
            align-items: center;
            justify-content: start;
            user-select: text;
          }
        `}
            </style>
            <AgGridReact
                headerHeight={props.headerHeight ?? 40}
                noRowsOverlayComponent={() => (
                    <TextApp texto='Não há registros' />
                )}
                loadingOverlayComponent={() => <LoadingAppTexto comBox />}
                suppressDragLeaveHidesColumns
                suppressScrollOnNewData={props.suppressScrollOnNewData}
                getRowId={(params) =>
                    String(
                        params.data.id ||
                        params.data.key ||
                        JSON.stringify(params.data),
                    )
                }
                onColumnMoved={async (event) => {
                    if (!event.finished || !props.nomeDaTabela) return;
                    const orderedDefs = event.api
                        .getAllGridColumns()
                        .map((col) => col.getColDef());
                    atualizarColunas(JSON.stringify(orderedDefs));
                }}
                onColumnResized={async (event) => {
                    if (!event.finished || !props.nomeDaTabela) return;
                    const orderedDefs = event.api.getAllGridColumns().map((col) => {
                        const colDef = col.getColDef();
                        return {
                            ...colDef,
                            width: col.getActualWidth(),
                        };
                    });
                    atualizarColunas(JSON.stringify(orderedDefs));
                }}
                suppressAnimationFrame={props.suppressAnimationFrame}
                onRowClicked={(event) => {
                    if (!props.selecionarLinha || event.event?.defaultPrevented) {
                        return;
                    }
                    props.selecionarLinha(event.data, event.rowIndex ?? 0);
                }}
                loading={props.loading}
                rowData={props.rows}
                rowHeight={props.rowHeight}
                columnDefs={columns}
            />
        </div>
    );
}

export function mergeColumns(
    backendCols: any[],
    originalCols: TypeColumns[],
): TypeColumns[] {
    return backendCols.map((backendCol) => {
        const original = originalCols.find(
            (col) => col.field === backendCol.field,
        );
        return {
            ...backendCol,
            ...(original?.cellRenderer && {
                cellRenderer: original.cellRenderer,
            }),
        };
    });
}
