import * as React from 'react';
import { TableComponent, SeemTableMain, SeemTableRow, SeemTableTd, TableShadow, FlexTable, FlexTableRow } from './baseTableElement';
//import { TableComponent } from './baseTableElement';
//const TableComponent = require('./baseTableElement');
export namespace Table {
    export type settingProps<T=string,d=any> = {
        head: string;
        attr: T;
        format ?: (data: d, ...props:any)=>any;
    }[]
    export type TableProps = {
        list: {[index: string]: any}[];
        //head: {[index: string]: any};
        setting: settingProps,
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
export type TablePropsFunc = {
    icon: string;
    tip : string;
    operate: {
        onClick: (value: any)=> void;
    }
}
export type TablePropsList = {[index: string]: any};
export type TablePropsSetting = {attr: any, text: any, format ?: any,  bg ?: any, flex ?: any};
interface TableProps {
    list: TablePropsList[] | TablePropsList;
    //head: {[index: string]: any};
    title ?: string,
    titleLil ?: string;
    setting: TablePropsSetting[];
    style?: React.CSSProperties;
    className ?: string;
    func ?: TablePropsFunc[];
}

export class SeemTable extends React.Component <TableProps, any>{
    constructor(props: any){
        super(props);
    }
    render(){
        let _style = this.props.style;
        let _className = this.props.className;
        return [
            this.props.title ? <div key={0}>
                <span style={{padding: '5px 10px 0 10px', background: '#eee',
                    color: '#1f4287', borderTopLeftRadius: '5px', borderTopRightRadius: '5px'}}>
                    {this.props.title}
                </span>
            </div> : '' ,
            <SeemTableMain key={1} style={_style} className={_className}>

                <SeemTableRow style={{background: '#eee'}}>
                    {
                        this.props.setting.map((value, key)=>{
                            return <SeemTableTd key={key} flex={value.flex}>
                                {
                                    value.text
                                }
                            </SeemTableTd>
                        })
                    }
                </SeemTableRow>

                <div className={'seemTableBody'}>

                    {
                        this.props.list.map((value: any, key: any) => {
                            return <SeemTableRow key={key}>
                                {
                                    this.props.func ? <TableShadow>

                                    </TableShadow> : ''
                                }
                                {
                                    this.props.setting.map((setting, innerKey)=>{
                                        return <SeemTableTd key={innerKey} flex={setting.flex} style={{background: ` ${setting.bg ? setting.bg(value) :''}`}}>
                                            {
                                                setting.format
                                                    ? setting.format(value)
                                                    : value[setting.attr]
                                            }
                                        </SeemTableTd>
                                    })
                                }
                            </SeemTableRow>
                        })
                    }
                </div>
            </SeemTableMain>
        ]}
}

export class AbeamTable extends React.Component <TableProps, any>{
    constructor(props: any){
        super(props);
    }
    render(){
        let _setting = this.props.setting || [];
        let _data = this.props.list || [];
        return [
            this.props.titleLil ? <div key={0}>
                <span style={{padding: '5px 10px 0 10px', background: '#eee',
                    color: '#1f4287', borderTopLeftRadius: '5px', borderTopRightRadius: '5px'}}>
                    {this.props.titleLil}
                </span>
            </div> : '',
            <FlexTableRow key={1} style={{border: 'solid #ccc', borderWidth:'0 1px 1px 1px'}}>
                {this.props.title
                    ? <FlexTable flex={1} style={{
                        background:'#eee',
                        borderTop: '1px solid #ccc',
                        height: `${_setting.length * 48}px`,
                        justifyContent: 'center'
                    }}
                    >
                        {this.props.title}
                    </FlexTable>
                    : ''}
                <FlexTable flex={5} style={{flexWrap: 'wrap', justifyContent: 'flex-start'}}>
                    {
                        _setting.map((set, key)=>{

                            let _dataList = typeof _data[set.attr] === 'object' ? _data[set.attr] : [_data[set.attr]] ;
                            return <FlexTableRow key={key} style={{height: '48px'}}>
                                <FlexTable
                                    style={{
                                        background: '#eee', height:'48px',
                                        borderTop: '1px solid #ccc',
                                        borderLeft: '1px solid #ccc',
                                        flexBasis: '20%',
                                        justifyContent: 'center'
                                    }}
                                >
                                    {
                                        set.text
                                    }
                                </FlexTable>
                                {
                                    _dataList && _dataList.map((data: any, key: any)=>{
                                        {
                                            return <FlexTable flex={1} style={{
                                                height:'48px',
                                                borderTop: '1px solid #ccc',
                                                justifyContent: 'center',
                                                borderLeft: '1px solid #ccc'}} key={key}>
                                                {
                                                    set.format ? set.format(data) : data
                                                }
                                            </FlexTable>
                                        }
                                    })
                                }
                            </FlexTableRow>
                        })
                    }
                </FlexTable>
            </FlexTableRow>
        ]
    }
}
    
