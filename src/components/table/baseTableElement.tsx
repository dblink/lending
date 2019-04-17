import * as React from 'react';
type FlexTableProps = {
    style ?: React.CSSProperties;
    [index: string]: any;
}
interface TableComponentStyle {
    TableCell : any;
    TableMain : any;
    TableRow  : any;
    TableHead : any;
}
export class TableComponent implements TableComponentStyle{
    //commonTale
    TableCell: (props: any)=>JSX.Element;
    TableMain: (props: any)=>JSX.Element;
    TableRow : (props: React.HTMLAttributes<HTMLTableRowElement>)=>JSX.Element;
    TableHead: (props: React.HTMLAttributes<HTMLTableRowElement>)=>JSX.Element;
    TableBody: (props: any)=>JSX.Element;
    height = 48;
    constructor(type: any){
        switch(type){
            case 'commonTable':{
                this.TableCell = (props: React.DOMAttributes<HTMLTableDataCellElement>) => {
                    return <td {...props}  >
                        {props.children}
                    </td>
                };
                this.TableMain = (props: any) => {
                        return <table {...props} >
                            {props.children}
                        </table>
                };
                this.TableRow  = (props) => {
                    return <tr {...props} >
                        {props.children}
                    </tr>
                };
                this.TableHead = (props) => {
                    let TableRow = this.TableRow;
                    return <thead>
                        <TableRow {...props}>
                            {props.children}
                        </TableRow>
                    </thead>
                };
                this.TableBody = (props: any) => {
                    return <tbody>
                        {props.children}
                    </tbody>
                };
            }
        }
    }
}
interface BaseTableProps extends React.HTMLAttributes<HTMLDivElement> {
    flex ?: number | null;
    componentname ?: string;
    isFlex ?: boolean;
}

export const BaseTable = (props: BaseTableProps)=>{
    let {
        style: _style = {},
        children: _children,
        flex: _flex,
        isFlex: isFlex = true,
        componentname: componentname = 'FlexTable',
        ...other
    } = props;
    _flex ? _style.flex = _flex : '';
    return <div {...other} data-component-name={componentname} 
        style={{display: isFlex ? 'flex' : 'auto', alignItems:'center',..._style}}>
        {_children}
    </div>
}

export const FlexTable = (props: BaseTableProps)=>{
    let {children, ...other} = props;
    return <BaseTable {...props}>
        {children}
    </BaseTable>
}

export const FlexTableRow = (props: BaseTableProps)=>{
    let {
            style,
            children,
            componentname = 'FlexTableRow',
            ...other
        } = props;

    return <FlexTable {...other} componentname={componentname} style={{width: '100%', ...style}}>
        {children}
    </FlexTable>
}
const TableCell = (props: any) => {
    return <td {...props} >
        {props.children}
    </td>
};
const TableMain = (props: any) => {
    return <table {...props}>
        {props.children}
    </table>
};
const TableRow = (props: any) => {
    return <tr {...props} >
        {props.children}
    </tr>
};
const TableHead = (props: any) => {
    return <thead>
    <TableRow {...props}>
        {props.children}
    </TableRow>
    </thead>
};
const TableBody = (props: any) => {
    return <tbody>
    {props.children}
    </tbody>
};

const height = 48;
export const SeemTableMain = (props: any) => {
    let _style = props.style;
    return <div className={props.className} style={_style}>
        {props.children}
    </div>
};

export const SeemTableRow = (props: any) => {
    let {style: _style} = props;
    return <FlexTableRow style={{flexWrap:'wrap',
        ..._style}} className='seemTableRow'>
        {props.children}
    </FlexTableRow>
};

export const TableShadow = (props: any)=>{
    return <div className='tableShadow'>
        {
            props.children
        }
    </div>
}

export const SeemTableTd = (props: any) =>{
    return <FlexTable flex={props.flex || 1} className='seemTableTd' style={{
            minHeight: `${height}px`
        }}>
        {props.children}
    </FlexTable>
};

export {
    TableCell,
    TableRow,
    TableBody,
    TableHead,
    TableMain
}