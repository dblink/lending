import * as React from 'react';
import { ApplyInput } from '../../../../components/input';
type CompanyInfoState = {
    data: {
        CompanyName ?: string;
        CompanyAddress ?: string;
        Department ?: string;
        Position ?: string;
        Salary ?: string;
    }
}
type CompanyInfoProps = {
    data: string;
    watcher: {
        run ?: any;
        setData ?: any;
    }
    name: string;
}

//公司信息
export class CompanyInfo extends React.Component <CompanyInfoProps, CompanyInfoState>{
    constructor(props: CompanyInfoProps){
        super(props);
        let _data = props.data && JSON.parse(props.data);
        this.state = {
            data: _data || {}
        };
        this.inputChange = this.inputChange.bind(this);
        this.props.watcher.run = ()=>{
            let _data:any = {}
            _data[this.props.name] = JSON.stringify(this.state.data)
            return _data
        };
        this.props.watcher.setData = (data: any)=>{
            let _data = this.state.data;
            if(data){
                _data = JSON.parse(data);
            }
            this.setState({
                data: _data
            })
        }
    }
    inputChange(e: React.ChangeEvent<HTMLInputElement>){
        let _name = e.target.name;
        let value = e.target.value;
        let _data = this.state.data;
        _data[_name as 'CompanyName'] = value;
        this.setState({
            data: _data
        })
    }
    componentWillUnmount(){
        this.props.watcher.run = null
    }
    render(){
        let _data = this.state.data;
        return <div 
            style={{
                width: '360px',
                margin: '0 auto',
                paddingTop: '10px'
            }}>
            <div style={{marginTop: '10px'}}>
                <ApplyInput text='公司名字' 
                    name='CompanyName'
                    onChange={this.inputChange}
                    value={_data.CompanyName} />
            </div>
            <div style={{marginTop: '10px'}}>
                <ApplyInput text='公司地址' 
                    name={'CompanyAddress'}
                    onChange={this.inputChange}
                    value={_data.CompanyAddress} />
            </div>
            <div style={{marginTop: '10px'}}>
                <ApplyInput text='部门' 
                    name={'Department'}
                    onChange={this.inputChange}
                    value={_data.Department} />
            </div>
            <div style={{marginTop: '10px'}}>
                <ApplyInput text='职位' 
                    name={'Position'}
                    onChange={this.inputChange}
                    value={_data.Position} />
            </div>
            <div style={{marginTop: '10px'}}>
                <ApplyInput text='薪水'
                    name={'Salary'}
                    onChange={this.inputChange}
                    value={_data.Salary} />
            </div>
        </div>
    }
}