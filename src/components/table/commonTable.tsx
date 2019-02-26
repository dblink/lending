import * as React from 'react';
import { TableComponent } from './baseTableElement';
//import { TableComponent } from './baseTableElement';
//const TableComponent = require('./baseTableElement');
export namespace Table {
    type TableProps = {
        list: {[index: string]: any}[];
        //head: {[index: string]: any};
        setting: {
            head: string;
            attr: string;
            format: any;
        }[]
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
            return <TableMain 
                className={this.props.className} 
                style={{borderCollapse: 'collapse', 
                    fontSize: '14px',
                    textAlign:'center', width: '100%'}}>
                {
                    this.props.title &&
                    <caption>
                        {
                            this.props.title
                        }
                    </caption>
                }
    
                <TableHead style={{background: '#eee'}}>
                    {
                        this.props.setting.map((value, index)=>{
                                return <TableCell key={index} style={{padding:'10px'}}>
                                    {value.head}
                                </TableCell>
                            }
                        )
                    }
                </TableHead>
                <TableBody>
                    {
                        this.props.list.map((listLine:any, sub: any)=>{
                            return <TableRow key={sub} style={{borderBottom: '1px solid #eee'}}>
                                {
                                    this.props.setting.map((value, index)=>{
                                        let _value = listLine[value.attr];
                                        return <TableCell key={index} style={{padding:'10px'}}>
                                            {
                                                 value.format 
                                                    ? value.format(listLine, value.attr, sub)
                                                    : _value
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
    
