import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { keyframes } from '@mui/system';

export const opacityAnimation = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export type ISort = 'asc' | 'desc';

export interface ISortingTable {
    field: string;
    sort: ISort;
}

interface propsTable {
    columns: any[];
    rows: any[];
    sorting?: ISortingTable;
    setSorting?: (sorting: ISortingTable) => void;
    minWidth?: number;
    stickyHeader?: boolean;
    maxHeigth?: number | string;
    marginTop?: string;
}

export function TablePaginacao(props: propsTable) {
    return (
        <TableContainer
            sx={{
                maxHeight: props.maxHeigth,
                marginTop: props.marginTop,
            }}
        >
            <Table
                size='small'
                sx={{ minWidth: props.minWidth ?? 650, width: '100%' }}
                aria-label='simple table'
                stickyHeader={props.stickyHeader}
            >
                <TableHead>
                    <TableRow>
                        {props.columns.map((column, index) => (
                            <TableCell
                                align={column.align}
                                sx={{
                                    width: column.width,
                                }}
                                key={index}
                            >
                                {column.headerName}
                                {column.sortable ? (
                                    <TableSortLabel
                                        active={props?.sorting?.field === column.field}
                                        direction={
                                            props?.sorting?.field === column.field
                                                ? props?.sorting?.sort
                                                : 'asc'
                                        }
                                        color='white'
                                        onClick={() => {
                                            if (props.setSorting) {
                                                props.setSorting({
                                                    field: column.field,
                                                    sort:
                                                        props?.sorting?.sort === 'asc'
                                                            ? 'desc'
                                                            : 'asc',
                                                });
                                            }
                                        }}
                                    >
                                        <></>
                                    </TableSortLabel>
                                ) : undefined}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row, index) => (
                        <TableRow
                            key={row?.id}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                animation: `${opacityAnimation} ${index < 10 ? `0.${index}` : `1.${index}`
                                    }s linear alternate`,
                            }}
                        >
                            {props.columns.map((column, i) => (
                                <TableCell
                                    align={column.align}
                                    key={i}
                                    width={column.width}
                                >
                                    {column.renderCell && !column?.pesquisar ? (
                                        column.renderCell(row, index)
                                    ) : (
                                        row[column.field]
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}