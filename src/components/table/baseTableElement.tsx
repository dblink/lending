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
    TableRow : (props: any)=>JSX.Element;
    TableHead: (props: any)=>JSX.Element;
    TableBody: (props: any)=>JSX.Element;
    height = 48;
    constructor(type: any){
        switch(type){
            case 'commonTable':{
                this.TableCell = (props: any) => {
                    return <td {...props} >
                        {props.children}
                    </td>
                };
                this.TableMain = (props: any) => {
                        return <table {...props}>
                            {props.children}
                        </table>
                };
                this.TableRow  = (props: any) => {
                    return <tr {...props} >
                        {props.children}
                    </tr>
                };
                this.TableHead = (props: any) => {
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