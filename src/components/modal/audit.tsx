import * as React from 'react';
import { BaseModal } from './base/baseModal';
import { ApplyInput } from '../input';
import { ModalTitle } from './title';
import { PrimaryButton, CancelButton } from '../button';
import { Parameter, ParameterName } from '../request/setting';
import { ReqOption, req } from '../request';
import { load } from '../loading/loading';
import { InnerProgress } from '../progress/progress';
import { sessionData } from '../sessionData/sessionData';

export class Input {
    state: any;
    setState: any;
    inputChange(e: React.ChangeEvent<HTMLInputElement>){
        let _name = e.target.name;
        let _value = e.target.value;
        let _data = this.state.data;
        _data[_name] = _value;
        this.setState({
            data: _data,
            error: {}
        })
    }
}

interface Props {
    status: 'Approved' | 'Denied';
    isShowModal: boolean;
    cancelModal: ()=>void;
    id: string;
}

interface State {
    data: Parameter<ParameterName.auditLoanApply>;
    error ?: any;
    isLoading : boolean;
}


export class AuditModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        //console.log(this.props.id);
        this.state = {
            data: {
                Token: sessionData.getData('Token'),
                AuditApplyId: '',
                Status: this.props.status === 'Approved' ? '1' : '2',
                ApplyMoney: '',
                Period: '',
                Remark: ''
            },
            error: {},
            isLoading: false,
        };
        this.inputChange = new Input().inputChange.bind(this);
        this.getDom = this.getDom.bind(this);
        this.confirm = load.run.call(this, this.confirm.bind(this));
        this.cancelModal = this.cancelModal.bind(this);
        this.clearError = this.clearError.bind(this);
    }
    clearError(){
        this.setState({
            error: {}
        })
    }
    getData: {
        run: any
    } = {
        run: ()=>{}
    };
    inputChange: any;
    getDom(){
        if(this.props.status === 'Approved'){
            return <Approved 
                clearError={this.clearError}
                getData={this.getData} error={this.state.error} />
        }else{
            return <Denied getData={this.getData} />
        }
    }
    cancelModal(){
        //console.log(this.init.error, 1);
        this.setState({
            error: {},
        },this.props.cancelModal);
        //this.props.cancelModal();
    }
    confirm(){
        let _data = this.getData.run();
        let data = this.state.data;
        data.AuditApplyId = this.props.id;
        _data = Object.assign({}, data, _data);
        if(this.state.data.Status === '2'){
            _data.Period = 0;
            _data.ApplyMoney = 0;
        }
        console.log(_data);
        let options: ReqOption<ParameterName.auditLoanApply> = {
            data: _data,
            fail: (e)=>{
                if(e.Value){
                    let _error = this.state.error;
                    _error[e.Value] = e.ErrMsg;
                    this.setState({
                        error: _error
                    })
                }
                this.setState({
                    isLoading: false
                })
            },
            succeed: (e)=>{
                alert('提交成功！');
                this.setState({
                    isLoading: false
                })
                this.cancelModal()
            }
        }
        req(ParameterName.auditLoanApply, options)
    }
    render() {
        return <BaseModal isOpen={this.props.isShowModal}>
            <div className='flex-space-between' style={{
                    width: '500px',
                    flexDirection: 'column',
                    height: '660px', background: '#FFF'}}>
                {this.getDom()}
                <div style={{display: 'flex', height: '40px'}}>
                    <CancelButton onClick={this.cancelModal} style={{borderRadius: '0'}}>
                        取消
                    </CancelButton>
                    <PrimaryButton onClick={this.confirm} style={{borderRadius: '0'}}>
                        {!this.state.isLoading ? '确认' : <InnerProgress hidden={false} height={'32px'} />} 
                    </PrimaryButton>
                </div>
            </div>
        </BaseModal>
    }
}

type ApprovedProps = {
    getData: {
        run: any;
    };
    error: any;
    clearError: any;
}
type ApprovedState = {
    data: any;
}

class Approved extends React.Component <ApprovedProps, ApprovedState>{
    constructor(props: any){
        super(props);
        this.state = {
            data:{}
        }
        this.input =  new Input().inputChange.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.props.getData.run = ()=>this.state.data;
    }
    input: any
    inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e)=> {
        this.props.clearError();
        this.input(e);
    };
    render(){
        return <div style={{padding: '0 70px'}}>
            <ModalTitle >
                通过信息
            </ModalTitle>
            <div style={{marginTop: '20px'}}>
                <ApplyInput text='审批金额' 
                    name='ApplyMoney'
                    error={this.props.error.ApplyMoney}
                    onChange={this.inputChange}  />
            </div>
            <div style={{marginTop: '20px'}}>
                <ApplyInput text='审批周期' 
                    name='Period'
                    error={this.props.error.Period}
                    onChange={this.inputChange}/>
            </div>
            <div style={{marginTop: '20px'}}>
                <ApplyInput type='textarea' 
                    name='Remark'
                    onChange={this.inputChange}
                    style={{
                        height: '160px'
                    }} text='审核说明' />
            </div>
        </div>
    }
}

class Denied extends React.Component <any, any>{
    constructor(props: any){
        super(props);
        this.state = {
            data: {}
        }
        this.inputChange = new Input().inputChange.bind(this);
        this.props.getData.run = ()=>this.state.data;
    }
    inputChange: (e:React.ChangeEvent<any>)=>void;
    render(){
        return <div style={{padding: '0 70px'}}>
            <ModalTitle >
                拒绝信息
            </ModalTitle>
            <ApplyInput 
                name='Remark'
                style={{height: '160px'}}
                onChange={this.inputChange}
                type='textarea' 
                text={'审核信息'} />
        </div>
    }
}