import * as React from 'react';
import { ApplyInput } from '../../../../components/input';
import { ApplySelect } from '../../../../components/select';
import { CancelButton, PrimaryButton } from '../../../../components/button';

type  AddContactInfoState = {
    data : {
        contactName ?: string;
        contactMobile ?: string;
        contactAddress ?: string;
        contactRelation ?: string;
    }
}
type AddContactInfoProps = {
    data ?: AddContactInfoState['data'];
    cancel: () => void;
    confirm: (e: any) => void;
}

//添加联系人
export class AddContactInfo extends React.Component <AddContactInfoProps, AddContactInfoState> {
    constructor(props: AddContactInfoProps){
        super(props);
        //let _data =  && Object.assign({}, props.data) || {};
        console.log(props.data);
        this.state={
            data: props.data || {}
        }
        this.inputChange = this.inputChange.bind(this);
        this.confirm = this.confirm.bind(this);
        console.log(props.data);
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
    inputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>){
        let name = e.target.name;
        let value = e.target.value;
        let _data = this.state.data;
        _data[name as 'contactName'] = value;
        this.setState({
            data: _data
        })
    }
    confirm(){
        let _data = Object.assign({}, this.state.data)
        this.props.confirm(_data)
        this.setState({
            data: {}
        })
    }
    render(){
        return <div className='z-index-1' 
            style={{position: "absolute",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            top: 0, left: 0, background:'#fff',
            height: '100%', width: '100%'}}>
            <div style={{width: '360px', margin:'0 auto', paddingTop: '10px'}}>
                <div style={{color: '#333', fontWeight: 'bold', 
                    padding: '20px', textAlign:'center'}}>
                    添加联系人
                </div>
                <div style={{marginTop: '10px'}}>
                    <ApplyInput text='联系人姓名' 
                        name={'contactName'}
                        onChange = {this.inputChange}
                        value={this.state.data.contactName}/>
                </div>
                <div style={{marginTop: '10px'}}>
                    <ApplyInput text='联系人电话' 
                        name={'contactMobile'}
                        onChange = {this.inputChange}
                        value={this.state.data.contactMobile} />
                </div>
                <div style={{marginTop: '10px'}}>
                    <ApplyInput text='联系人地址' 
                        name={'contactAddress'}
                        onChange = {this.inputChange}
                        value={this.state.data.contactAddress} />
                </div>
                <div style={{marginTop: '10px'}}>
                    <ApplySelect text='联系人关系' 
                        name={'contactRelation'}
                        onChange = {this.inputChange}
                        list={this.list} 
                        value={this.state.data.contactRelation} />
                </div>
            </div>
            <div style={{height: '40px', display: 'flex'}}>
                <CancelButton onClick={this.props.cancel}>
                    取消
                </CancelButton>
                <PrimaryButton onClick={this.confirm}>
                    确认
                </PrimaryButton>
            </div>
        </div>
    }
}