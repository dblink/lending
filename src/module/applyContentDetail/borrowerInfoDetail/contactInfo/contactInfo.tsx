import * as React from 'react';

import { AddContactInfo } from './addCotactInfo';
import { HrefButton, PrimaryButton } from '../../../../components/button';
import { Table } from '../../../../components/table/commonTable';
type ContactInfoState = {
    type: string;
    data: any[];
    editData: any;
    sub: any;
}
type ContactInfoProps = {
    name: string;
    watcher: {
        run ?: any;
        setData ?:any;
    }
    data: any;
}
//联系人信息
export class ContactInfo extends React.Component <ContactInfoProps, ContactInfoState>{
    constructor(props: ContactInfoProps){
        super(props)
        //console.log(props.data);
        let _data = props.data ? JSON.parse(props.data) : [];
        this.state = {
            type: '',
            data: _data,
            editData: {},
            sub: ''
        }
        this.getDom = this.getDom.bind(this);
        this.changeType = this.changeType.bind(this);
        this.changeData = this.changeData.bind(this);
        this.edit  = this.edit.bind(this);
        this.del = this.del.bind(this);
        this.props.watcher.run = ()=>{
            let _data: any = {};
            _data[this.props.name] = JSON.stringify(this.state.data);
            return _data;
        }
        this.props.watcher.setData = (data:any)=>{
            let _data = data ? JSON.parse(data) : [];
            this.setState({
                data: _data
            })
        }
        console.log(this.props.watcher.run);
    }
    changeType(type: string){
        this.setState({
            type: type
        })
    }
    edit(data:any, key: any){
       this.setState({
            editData: data,
            sub: key,
            type: 'edit'
        }) 
    }
    del(key: any){
        let _data = this.state.data;
        _data.splice(key, 1);
        this.setState({
            data: _data
        })
    }
    changeData(data: any){
        let _data = this.state.data;
        let _sub = this.state.sub;
        if(_sub || _sub === 0){
            _data[parseInt(_sub)] = data;
        }else{
            _data.push(data);
        }
        this.setState({
            type: '',
            data: _data,
            editData: '',
            sub : ''
        })
    }
    list = [{
        text: '父母',
        value: '0'
    },{
        text: '配偶',
        value: '1'
    },{
        text: '朋友',
        value: '2'
    },{
        text: '亲戚',
        value: '3'
    }]
    setting:any = [{
        attr: 'contactName',
        head: '姓名'
    }, {
        attr: 'contactMobile',
        head: '手机号'
    }, {
        attr: 'contactAddress',
        head: '地址'
    }, {
        attr: 'contactRelation',
        head: '关系',
        format: (data:any, attr: any)=>{
            let _data = data[attr];
            let _list = this.list;
            for(let i=0; i< _list.length; i++){
                if(_list[i].value === _data){
                    return _list[i].text
                }
            }
        }
    },{
        attr: 'contactName',
        head: '操作',
        format:(data: any, attr: any, key: number)=>{
            return <div style={{display: 'inline-flex', width: '100px'}}>
                <HrefButton onClick={()=>this.edit(data, key)}>编辑</HrefButton>
                <HrefButton onClick={()=>this.del(key)} >删除</HrefButton>
            </div>
            
        }
    }]
    getDom(){
        //let _data = this.props.data ? JSON.parse(this.props.data) : [];
        //_data =
        switch(this.state.type){
            case 'edit':
            case 'add': {
                return <AddContactInfo
                    data={this.state.editData}
                    cancel={()=>this.changeType('')} confirm={this.changeData} />
            }
            default: {
                let Tab = Table.CommonTable; 
                 return <div>
                    <PrimaryButton style={{width: '140px', 
                        margin: '15px 0',
                        height: '35px'}} onClick={()=>this.changeType('add')}>
                        添加联系人
                    </PrimaryButton>
                    <Tab setting={this.setting} list={this.state.data} />
                </div>
            }
        }
    }
    componentWillUnmount(){
        //console.log(1);
        this.props.watcher.run = null;
    }
    render(){
        return this.getDom()
    }
    
}