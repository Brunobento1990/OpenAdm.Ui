import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Fragment } from "react";
import { keyframes } from "@mui/system";

export const opacityAnimation = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export type ISort = "asc" | "desc";

export interface ISortingTable {
    field: string;
    sort: ISort;
}

interface propsNewTable {
    columns: any[];
    rows: any[];
    sorting?: ISortingTable;
    setSorting?: (sorting: ISortingTable) => void;
    search?: string;
    minWidth?: number;
    selecionarLinha?: (row: any, index: number) => void;
    stickyHeader?: boolean;
    maxHeigth?: number | string;
    heigth?: number | string;
    marginTop?: string;
    onDoubleClick?: (item: any, index: number, key?: string) => void;
    borderCollapse?:
    | "collapse"
    | "inherit"
    | "initial"
    | "revert"
    | "revert-layer"
    | "separate"
    | "unset";
}

export function TableApp(props: propsNewTable) {
    return (
        <TableContainer
            sx={{
                height: props.heigth,
                maxHeight: props.maxHeigth,
            }}
        >
            <Table
                size="small"
                sx={{
                    minWidth: props.minWidth ?? 650,
                    width: "100%",
                    borderCollapse: props.borderCollapse,
                }}
                aria-label="simple table"
                stickyHeader={props.stickyHeader}
            >
                <TableHead>
                    <TableRow>
                        {props.columns.map((column, index) => (
                            <TableCell
                                key={index}
                                align={column.align}
                                sx={{
                                    width: column.width,
                                    padding: "3px 10px 3px 10px",
                                    fontWeight: 600,
                                    fontSize: "14px",
                                    borderBottom: "1px solid #dbdbdb"
                                }}
                                onClick={() => {
                                    if (column.sortable && props.setSorting) {
                                        props.setSorting({
                                            field: column.field,
                                            sort:
                                                props.sorting?.field === column.field &&
                                                    props.sorting?.sort === "asc"
                                                    ? "desc"
                                                    : "asc",
                                        });
                                    }
                                }}
                            >
                                {column.headerName}
                                {column.sortable && (
                                    <TableSortLabel
                                        active={props.sorting?.field === column.field}
                                        direction={
                                            props.sorting?.field === column.field
                                                ? props.sorting?.sort
                                                : "asc"
                                        }
                                    />
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row, index) => (
                        <Fragment key={index}>
                            <TableRow
                                onDoubleClick={() => {
                                    if (props.onDoubleClick) {
                                        props.onDoubleClick(row, index);
                                    }
                                }}
                                onClick={() => {
                                    if (props.selecionarLinha) {
                                        props.selecionarLinha(row, index);
                                    }
                                }}
                                sx={{
                                    cursor: "pointer",
                                    "&:last-child td, &:last-child th": { border: 0 },
                                    animation: `${opacityAnimation} ${index < 10 ? `0.${index}` : `1.${index}`
                                        }s linear alternate`,
                                    "&:hover": {
                                        backgroundColor: "#f7faff",
                                    },
                                    borderBottom: "1px solid #f7faff",
                                }}
                            >
                                {props.columns.map((column, i) => (
                                    <TableCell
                                        align={column.align}
                                        key={i}
                                        width={column.width}
                                        onDoubleClick={() => {
                                            if (props.onDoubleClick) {
                                                props.onDoubleClick(row, index, column.field);
                                            }
                                        }}
                                    >
                                        {column.renderCell
                                            ? column.renderCell(row, index)
                                            : row[column.field]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
