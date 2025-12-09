import { AgGridReact } from "ag-grid-react";
import { TextApp } from "../text";
import { LoadingAppTexto } from "../loading/loading-app-texto";

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
}

export function TabelaComDrag(props: propsTabelaComDrag) {

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
                columnDefs={props.columns}
            />
        </div>
    );
}
