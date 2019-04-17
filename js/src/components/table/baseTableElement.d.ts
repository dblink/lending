import * as React from 'react';
interface TableComponentStyle {
    TableCell: any;
    TableMain: any;
    TableRow: any;
    TableHead: any;
}
export declare class TableComponent implements TableComponentStyle {
    TableCell: (props: any) => JSX.Element;
    TableMain: (props: any) => JSX.Element;
    TableRow: (props: React.HTMLAttributes<HTMLTableRowElement>) => JSX.Element;
    TableHead: (props: React.HTMLAttributes<HTMLTableRowElement>) => JSX.Element;
    TableBody: (props: any) => JSX.Element;
    height: number;
    constructor(type: any);
}
interface BaseTableProps extends React.HTMLAttributes<HTMLDivElement> {
    flex?: number | null;
    componentname?: string;
    isFlex?: boolean;
}
export declare const BaseTable: (props: BaseTableProps) => JSX.Element;
export declare const FlexTable: (props: BaseTableProps) => JSX.Element;
export declare const FlexTableRow: (props: BaseTableProps) => JSX.Element;
declare const TableCell: (props: any) => JSX.Element;
declare const TableMain: (props: any) => JSX.Element;
declare const TableRow: (props: any) => JSX.Element;
declare const TableHead: (props: any) => JSX.Element;
declare const TableBody: (props: any) => JSX.Element;
export declare const SeemTableMain: (props: any) => JSX.Element;
export declare const SeemTableRow: (props: any) => JSX.Element;
export declare const TableShadow: (props: any) => JSX.Element;
export declare const SeemTableTd: (props: any) => JSX.Element;
export { TableCell, TableRow, TableBody, TableHead, TableMain };
