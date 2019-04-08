import * as React from 'react';
import { CalendarInput, SearchInput } from '../../components/input';
import { SearchSelect } from '../../components/select';
import { CancelButton, PrimaryButton } from '../../components/button';
import { ParameterName, ParameterSummary } from '../../components/request/setting';

export type FilterList<i> = {
    name : i;
    value: any,
    text : any,
    type : 'date' | 'input' | 'select',
    list?: {value: any, text: any}[]
}[];

type FilterProps = {
    filterList: FilterList<ParameterSummary[ParameterName]>;
    filter: (data:any)=> void
}
type FilterState = {
    data: any;
    isCancel: boolean;
}

export class Filter extends React.Component <FilterProps, FilterState>{
    constructor(props: FilterProps){
        super(props);
        let _data:any = {};
        props.filterList.map((_value)=>{
            let {name, value} = _value;
            _data[name] = value;
        })
        this.state = {
            data: _data,
            isCancel: true
        }
        this.inputChange = this.inputChange.bind(this);
        this.filter = this.filterClosure.call(this);
    }
    inputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        let _value = e.target.value,
            _name  = e.target.name;
        let _data = this.state.data;
        _data[_name] = _value;
        this.setState({
            data: _data
        });
    }
    initData: any;
    filter: (type: 'cancel' | 'action')=>void;
    filterClosure(){
        this.initData = Object.assign({},this.state.data);
        return (type: 'cancel' | 'action')=>{
            if(type === 'cancel' && !this.state.isCancel){
                let _data = Object.assign({}, this.initData);
                this.setState({
                    data: _data,
                    isCancel: true
                }, ()=>this.props.filter(this.state.data))
            }else if(type === 'action'){
                this.setState({
                    isCancel: false
                },()=>this.props.filter(this.state.data))
            }
            
        }
    }
    render(){
        let props = this.props,
            _style = {maxWidth: '150px', 
            //marginTop: '10px',
            flex: '1 1 150px', height: '30px'};

        return <div style={{display: 'flex',
                width: '100%', //height:'100%', overflow: 'auto',
                justifyContent:'space-between',
                alignItems: 'center', background: '#fff'}}>
            <div style={{display: 'flex', height:'100%', overflow: 'auto',flex: 'auto',
                justifyContent: 'space-between',alignItems: 'center',flexWrap: 'wrap',padding: '0 10px'}}>
                {
                    props.filterList.map((_value, key)=>{
                        let {name, value, text, type, list=[]} = _value;
                        switch(type){
                            case 'date': return <CalendarInput text={text} 
                                name ={name} key={key}
                                style={_style}
                                value={this.state.data[name]}
                                onChange={this.inputChange}
                            />;
                            case 'input': return <SearchInput onChange={this.inputChange}
                                name ={name} key={key}
                                value={this.state.data[name]}
                                style={_style}
                                text={text} placeholder={`请输入${text}`}
                            />
                            case 'select': return <SearchSelect text={text}
                                name={name} key={key}
                                style={_style}
                                onChange={this.inputChange}
                                value={this.state.data[name]}
                                list={list}/>
                        }
                    })
                }
            </div>
            <div style={{display: 'flex', width: '200px', height: '100%'}}>
                <CancelButton onClick={()=>this.filter('cancel')}>
                    重置
                </CancelButton>
                <PrimaryButton onClick={()=>this.filter('action')}>
                    搜索
                </PrimaryButton>
            </div>
        </div>
        
    }
}