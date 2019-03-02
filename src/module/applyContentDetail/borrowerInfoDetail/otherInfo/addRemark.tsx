import * as React from 'react';
import { CancelButton, PrimaryButton } from '../../../../components/button';

type AddRemarkProps = {
    cancel: ()=>void;
    editData: any;
    confirm: (data: any)=>void;
}
type AddRemarkState = {
    remark: string;
}
//添加备注
export class AddRemark extends React.Component <AddRemarkProps, AddRemarkState>{
    constructor(props: AddRemarkProps){
        super(props);
        this.state = {
            remark: props.editData.remark || ''
        }
        this.confirm = this.confirm.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }
    confirm(){
        let _data = Object.assign({}, this.state)
        this.props.confirm(_data)
    }
    inputChange(e: React.ChangeEvent<HTMLTextAreaElement>){
        let _value = e.target.value;
        let _remark = this.state.remark;
        _remark = _value
        this.setState({
            remark: _remark
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
        <div style={{
            width: '360px', flex: '10', 
            display: 'flex', flexDirection: 'column',
            margin:'0 auto', paddingTop: '10px'}}>
            <div style={{color: '#333', fontWeight: 'bold', 
                padding: '20px', textAlign:'center'}}>
                添加备注
            </div>
            <textarea
                value={this.state.remark}
                placeholder='添加备注' onChange={this.inputChange}
                style={{height: '100%', width: '100%', marginBottom: '20px'}}>
            </textarea>
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