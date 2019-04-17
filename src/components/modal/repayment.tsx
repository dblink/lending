import * as React from 'react';
import { BaseModal } from './base/baseModal';
import { Parameter, ParameterName } from '../request/setting';
import { sessionData } from '../sessionData/sessionData';
import { ModalTitle } from './title';
import { CancelButton, PrimaryButton } from '../button';
import { ReqOption, req } from '../request';
import { logOut } from '../fail/logOut';
import { load } from '../loading/loading';
import { InnerProgress } from '../progress/progress';

export type RepaymentModalPage = 'online' | 'local' | 'IsFormRepayAll' | '';
export type RepaymentModalFunc = {
    show:(page: RepaymentModalPage, data: {RepayPlanDetailId:''})=>any;
    cancel: (isRefresh ?: boolean)=>any;
}
interface Props {
    getList: ()=>void;
    modal: RepaymentModalFunc;
}

interface State {
    show: boolean;
    page: RepaymentModalPage;
    data: Parameter<ParameterName.applyRepayOnline>;
}

export class RepaymentModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            show: false,
            page: '',
            data: {
                RepayPlanDetailId: '',
                Token: sessionData.getData('Token')
            },
        };
        this.getDom = this.getDom.bind(this);
        this.showModal = this.showModal.bind(this);
        this.cancelModal = this.cancelModal.bind(this);
        this.props.modal.show = this.showModal;
    }

    showModal(page: RepaymentModalPage, data: Parameter<ParameterName.applyRepayOnline>){
        this.setState({
            page: page,
            show: true,
            data: data
        })
    }
    
    cancelModal(isRefresh: boolean){
        this.setState({
            show: false
        }, ()=>{
            if(typeof isRefresh === 'boolean' && isRefresh){
                this.props.getList();
            }
        })
    }

    getDom(){
        switch(this.state.page){
            case 'online': return <PayWay type='online' cancel={this.cancelModal}
                id={this.state.data.RepayPlanDetailId} />;
            case 'local' : return <PayWay type='local' cancel={this.cancelModal}
            id={this.state.data.RepayPlanDetailId} />;
            case 'IsFormRepayAll': return <IsFormRepayAll 
                cancel={this.cancelModal} time={this.state.data.RepayPlanDetailId} /> 
        }
    }

    render() {
        return <BaseModal isOpen={this.state.show}>
            {this.getDom()}
        </BaseModal>
    }
}

type PayWayProps = {
    id: string;
    type: 'online' | 'local' | '';
    cancel: (bool ?: any) => void;
}
type PayWayState = {
    data: Parameter<ParameterName.applyRepayOnline>;
    isLoading: boolean;
}

class PayWay extends React.Component<PayWayProps, PayWayState>{
    constructor(props: PayWayProps){
        super(props);
        this.state = {
            data: {
                RepayPlanDetailId: props.id,
                Token: sessionData.getData('Token')
            },
            isLoading: false
        };
        this.confirm = load.run.call(this, this.confirm);
    }

    confirm(){
        let _req: ReqOption<ParameterName.applyRepayOnline>;
        _req = {
            data:this.state.data,
            fail: logOut((e)=>{
                this.setState({
                    isLoading: false
                })
                alert(e.ErrMsg)
            }),
            succeed: (e)=>{
                if(this.props.type === 'online'){
                    alert('还款中！5分钟内有结果');
                }else if(this.props.type === 'local'){
                    alert('申请成功！')
                }
                this.props.cancel(true);
            }
        }
        if(this.props.type === 'online'){
            req(ParameterName.applyRepayOnline, _req);
        }else if( this.props.type ==='local'){
            req(ParameterName.applyRepayOffline, _req);
        }
    }

    render(){
        return <div style={{height: '500px', width: '600px', 
                    background: '#FFF', display: 'flex', flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
            <ModalTitle>
                {this.props.type === 'online' ?  '线上还款' : '线下还款' }
            </ModalTitle>
            <div style={{textAlign: 'center'}}>
                是否确认{this.props.type === 'online' ?  '线上还款' : '线下还款' }
            </div>
            <div style={{height: '40px', display: 'flex'}}>
                <CancelButton onClick={this.props.cancel}>取消</CancelButton>
                <PrimaryButton onClick={this.confirm} >
                    {this.state.isLoading ? <InnerProgress height='32px' /> : '确认'}    
                </PrimaryButton>
            </div>
        </div>
    }
}

type IsFormRepayAllProps = {
    time ?: any;
    cancel ?: any;
}

type IsFormRepayAllState = {
    data: Parameter<ParameterName.oneKeyRepayment>;
    isLoading: boolean;
}

class IsFormRepayAll extends React.Component<IsFormRepayAllProps, IsFormRepayAllState>{
    constructor(props:any){
        super(props);
        this.state = {
            data: {
                RepayTime: props.time,
                Token: sessionData.getData('Token')
            },
            isLoading: false
        };
        this.confirm = load.run.call(this, this.confirm);
    }
    confirm(){
        let _req: ReqOption<ParameterName.oneKeyRepayment>;
        _req = {
            data: this.state.data,
            succeed: ()=>{
                this.props.cancel(true);
                alert('申请成功！')
            },
            fail: logOut((e)=>{
                this.setState({
                    isLoading: false
                },()=>{
                    alert(e.ErrMsg)
                })
            })
        }
        req(ParameterName.oneKeyRepayment, _req);
    }
    render(){
        return <div style={{height: '500px', width: '600px', 
                    background: '#FFF', display: 'flex', flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
            <ModalTitle>
                一键还款
            </ModalTitle>
            <div style={{textAlign: 'center'}}>
                是否确认‘{this.props.time}’日，一键还款？
            </div>
            <div style={{height: '40px', display: 'flex'}}>
                <CancelButton onClick={this.props.cancel}>取消</CancelButton>
                <PrimaryButton onClick={this.confirm} >
                    {this.state.isLoading ? <InnerProgress height='32px' /> : '确认'}    
                </PrimaryButton>
            </div>
        </div>
    }
}