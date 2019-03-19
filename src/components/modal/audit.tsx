import * as React from 'react';
import { BaseModal } from './base/baseModal';
import { ApplyInput } from '../input';
import { ModalTitle } from './title';
import { PrimaryButton, CancelButton } from '../button';
import { Parameter, ParameterName, Callback } from '../request/setting';
import { ReqOption, req } from '../request';
import { load } from '../loading/loading';
import { InnerProgress } from '../progress/progress';
import { sessionData } from '../sessionData/sessionData';
import { ApplySelect } from '../select';
import { logOut } from '../fail/logOut';

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
    cancelModal: (refresh ?: boolean)=>void;
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
        this.state = {
            data: {
                Token: sessionData.getData('Token'),
                AuditApplyId: '',
                Status: '',
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
            return <Approved isLoading={this.state.isLoading}
                clearError={this.clearError}
                getData={this.getData} error={this.state.error} />
        }else{
            return <Denied getData={this.getData} />
        }
    }
    cancelModal(){
        this.setState({
            error: {},
        },()=>this.props.cancelModal());
    }
    confirm(){
        let _data = this.getData.run();
        let data = this.state.data;
        data.AuditApplyId = this.props.id;
        _data = Object.assign({}, data, _data);
        _data.Status = this.props.status === 'Approved' ? '1' : '2';
        if(this.props.status === 'Denied'){
            _data.Period = '0';
            _data.ApplyMoney = '0';
        }
        let options: ReqOption<ParameterName.auditLoanApply> = {
            data: _data,
            fail: logOut(this.fail),
            succeed: (e)=>{
                alert('提交成功！');
                this.setState({
                    isLoading: false
                })
                this.props.cancelModal(true)
            }
        }
        req(ParameterName.auditLoanApply, options)
    }
    fail = (e: Callback)=>{
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
    }
    render() {
        return <BaseModal isOpen={this.props.isShowModal}>
            <div className='flex-space-between' style={{
                    width: '500px',
                    flexDirection: 'column',
                    height: '660px', background: '#FFF'}}>
                {this.getDom()}
                <div style={{display: 'flex', minHeight: '40px', height: '40px'}}>
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
    isLoading: boolean;
}
type ApprovedState = {
    data: Parameter<ParameterName.auditLoanApply>;
}

class Approved extends React.Component <ApprovedProps, ApprovedState>{
    constructor(props: any){
        super(props);
        this.state = {
            data:{
                ApplyType: ''
            }
        }
        this.input =  new Input().inputChange.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.props.getData.run = ()=>this.state.data;
    }
    input: any
    inputChange: (e: React.ChangeEvent<HTMLInputElement | any>) => void = (e)=> {
        if(this.props.isLoading){
            return;
        }
        this.props.clearError();
        this.input(e);
    };
    render(){
        return <div style={{padding: '0 70px'}}>
            <ModalTitle >
                通过信息
            </ModalTitle>
            <div>
                <ApplyInput text='审批金额' 
                    name='ApplyMoney'
                    value={this.state.data.ApplyMoney}
                    error={this.props.error.ApplyMoney}
                    onChange={this.inputChange}  />
            </div>
            <div style={{marginTop: '20px'}}>
                <ApplyInput text='审批周期' 
                    name='Period'
                    value={this.state.data.Period}
                    error={this.props.error.Period}
                    onChange={this.inputChange}/>
            </div>
            <div style={{marginTop: '20px'}}>
                <ApplyInput text='每期服务费' 
                    name='ServiceMoney'
                    value={this.state.data.ServiceMoney}
                    error={this.props.error.ServiceMoney}
                    onChange={this.inputChange}/>
                
            </div>
            <div style={{marginTop: '20px'}}>
                <ApplySelect text='周期类型' 
                    name='ApplyType'
                    value={this.state.data.ApplyType}
                    onChange={this.inputChange}
                    list={[{
                            value: '1',
                            text: '按月还款'
                        },{
                            value: '2',
                            text: '按周还款'
                        },{
                            value: '3',
                            text: '按天还款'
                        }
                    ]}
                />
            </div>
           
            <div style={{marginTop: '20px'}}>
                <ApplyInput type='textarea' 
                    name='Remark'
                    value={this.state.data.Remark}
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
        this.input = new Input().inputChange.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.props.getData.run = ()=>this.state.data;
    }
    input: (e:React.ChangeEvent<any>)=>void;
    inputChange(e:React.ChangeEvent<any>){
        !this.props.isLoading && this.input(e);
    }
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