import * as React from 'react';
import { AddRemark } from './addRemark';
import { ApplySelect } from '../../../../components/select';
import { HrefButton } from '../../../../components/button';

type OtherInfoState = {
    type: 'edit' | 'add' | '';
    data: any[];
    sub : any;
    editData: any;
    maritalStatus: 1 | 2 | 3 | ''
}
type OtherInfoProps = {
    watcher: {
        run ?: any,
        setData ?: any;
    },
    name: string,
    data: any;
    maritalStatus: 1 | 2 | 3 | '';
}
//其他信息
export class OtherInfo extends React.Component <OtherInfoProps, OtherInfoState>{
    constructor(props: OtherInfoProps){
        super(props);
        let _data = props.data ? JSON.parse(props.data) : [];
        this.state = {
            type: '',
            data: _data,
            sub: '',
            editData: {},
            maritalStatus: props.maritalStatus || ''
        }
        this.changeType = this.changeType.bind(this);
        this.editData = this.editData.bind(this);
        this.changeData = this.changeData.bind(this);
        this.delData = this.delData.bind(this);
        this.selectChange = this.selectChange.bind(this);
        props.watcher.run = ()=>{
            let _data: any = {};
            _data['Remark'] = JSON.stringify(this.state.data);
            _data['MaritalStatus'] = this.state.maritalStatus
            return _data;
        }
        props.watcher.setData = (data: any)=>{
            let _status = this.state.maritalStatus,
                _remark = this.state.data;
            if(data.MaritalStatus){
                _status = data.MaritalStatus;
            }
            if(data.Remark){
                _remark = JSON.parse(data._remark);
            }
            this.setState({
                maritalStatus: _status,
                data: _remark
            })
        }
    }
    changeType(str: OtherInfoState['type']){
        this.setState({
            type: str
        })
    }
    editData(data: any){
        let _data = this.state.data;
        let _key  = this.state.sub;
        if(_key || _key === 0){
            _data[_key] = data;
        }else{
            _data.push(data);
        }
        this.setState({
            sub : '',
            editData: {},
            data: _data,
            type: ''
        })
    }
    changeData(sub: any){
        this.setState({
            type: 'edit',
            sub: sub,
            editData: this.state.data[sub]
        })
    }
    delData(sub: any){
        let _data = this.state.data;
        _data.splice(sub, 1);
        this.setState({
            data: _data
        })
    }
    selectChange(e: React.ChangeEvent<HTMLSelectElement>){
        this.setState({
            maritalStatus: e.target.value as ''
        })
    }
    list = [{
        text: '未婚',
        value: '2'
    },{
        text:' 已婚',
        value: '1'
    },{
        text: '离异',
        value: '3'
    }];
    choicePage(){
        switch(this.state.type){
            case 'edit':
            case 'add': {
                return <AddRemark
                    editData={this.state.editData}
                    confirm={this.editData}
                    cancel={()=>this.changeType('')} />
            }
            default : {
                return <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    width: '360px',
                    paddingTop: '20px',
                    margin: '0 auto'
                }}>
                    
                    <div style={{marginTop: '10px'}}>
                        <ApplySelect text='婚姻情况' 
                            value={this.state.maritalStatus}
                            onChange={this.selectChange}
                            list={this.list} />
                    </div>
                    <div 
                        style={{
                            marginTop: '10px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '14px', 
                            marginBottom: '10px', 
                            height: '40px',
                            alignItems: 'center',
                            color: '#777'}}>
                        <span>
                            备注
                        </span>
                        <HrefButton onClick={()=>this.changeType('add')}>
                            添加备注
                        </HrefButton>
                    </div>
                    <div style={{flex: 10, overflow: 'auto'}}>
                        {
                            this.state.data.map((value, key)=>{
                                return <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    fontSize: '14px'
                                }} key={key}>
                                    <span style={{flex: 10, wordBreak:'break-all'}}>
                                        {value.remark}
                                    </span>
                                    <div style={{display: 'flex'}}>
                                        <HrefButton 
                                            style={{width: '50px'}}
                                            onClick={()=>this.changeData(key)}>
                                            修改
                                        </HrefButton>
                                        <HrefButton
                                            style={{width: '50px'}}
                                            onClick={()=>this.delData(key)}>
                                            删除
                                        </HrefButton>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            }
            
        }
    }
    componentWillUnmount(){
        this.props.watcher.run = null;
    }
    render(){
        return this.choicePage();
    }
}