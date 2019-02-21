import * as React from 'react';
import { TableComponent } from './baseTableElement';
//import { TableComponent } from './baseTableElement';
//const TableComponent = require('./baseTableElement');
export namespace Table {
    type TableProps = {
        list: {[index: string]: any}[];
        head: {[index: string]: any};
        title ?: string;
        className ?: string;
    }
    export class CommonTable extends React.Component <TableProps, any>{
        constructor(props: any){
            super(props);
        }

        render(){
            const {
                TableMain: TableMain,
                TableHead: TableHead,
                TableCell: TableCell,
                TableBody: TableBody,
                TableRow: TableRow
            } = new TableComponent('commonTable') ;
            return <TableMain className={this.props.className} style={{borderCollapse: 'collapse', textAlign:'center'}}>
                {
                    this.props.title &&
                    <caption>
                        {
                            this.props.title
                        }
                    </caption>
                }
    
                <TableHead>
                    {
                        Object.keys(this.props.head).map((value, index)=>{
                                return <TableCell key={index} style={{padding:'10px',border: '1px solid #333'}}>
                                    {this.props.head[value]}
                                </TableCell>
                            }
                        )
                    }
                </TableHead>
                <TableBody>
                    {
                        this.props.list.map((listLine:any, sub: any)=>{
                            return <TableRow key={sub}>
                                {
                                    Object.keys(this.props.head).map((value, index)=>{
                                        let _value = listLine[value];
                                        if(value.toLowerCase().indexOf('time') !== -1){
                                            _value = new Date(_value).toLocaleDateString();
                                        }
                                        return <TableCell key={index} style={{padding:'10px', border: '1px solid #333'}}>
                                            {
                                                _value
                                            }
                                        </TableCell>
                                    })
                                }
                            </TableRow>
                        })
                    }
                </TableBody>
            </TableMain>
        }
    }
}
    
