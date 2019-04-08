import * as React from 'react';
import { BaseModal } from './base/baseModal';
import { CancelButton, PrimaryButton } from '../button';
import { ModalTitle } from './title';
import { Page } from 'csstype';
import { ReqOption, req } from '../request';
import { ParameterName, Parameter } from '../request/setting';
import { sessionData } from '../sessionData/sessionData';
import { logOut } from '../fail/logOut';
import { InnerProgress } from '../progress/progress';
import { load } from '../loading/loading';

type PageType = 'settle' | 'repay' | '';
type PageData = {
    id ?: string;
}
interface Props {
    modal: {
        showModal: (type: PageType, data: PageData)=>void;
        closeModal: (isRefresh : boolean)=>void;
    },
    getList: ()=>void;
}

interface State {
    isOpen: boolean;
    type : PageType;
    data ?: PageData;
}

export class LocalConfirm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false,
            type: '',
            data: {}
        };
        this.cancel = this.cancel.bind(this);
        this.show = this.show.bind(this);
        this.props.modal.showModal = this.show;
        this.props.modal.closeModal = this.cancel;
    }
    cancel(isRefresh ?: boolean){
        this.setState({
            isOpen: false
        }, ()=>{
            if(typeof isRefresh === 'boolean'){
                this.props.getList()
            }
        })
    }
    show(type: PageType, data: PageData){
        this.setState({
            isOpen: true,
            type: type,
            data: data
        })
    }
    render() {
        return <BaseModal isOpen={this.state.isOpen}>
            <LocalConfirmRepay type={this.state.type} id={this.state.data.id} cancel={this.cancel} />
        </BaseModal>
    }
}
type LocalConfirmRepayProps = {
    cancel: (isRefresh ?: boolean)=>void;
    type: PageType;
    id : string;
}
type LocalConfirmRepayState = {
    data: Parameter<ParameterName.confirmRepayOffline>;
    isLoading: boolean;
}
class LocalConfirmRepay extends React.Component<LocalConfirmRepayProps, LocalConfirmRepayState>{
    constructor(props: LocalConfirmRepayProps){
        super(props);
        this.state = {
            data: {
                RepayPlanDetailId: this.props.id,
                State: '',
                Token: sessionData.getData('Token')
            },
            isLoading: false
        }
        this.confirm = load.run.call(this, this.confirm);
    }
    confirmRepayOffline: {close: any};
    confirm(state: boolean){
        let _req: ReqOption<ParameterName.confirmRepayOffline>,
            _data = this.state.data;

        _data.State = state;
        _req = {
            data: _data,
            fail: logOut((e)=>{
                alert(e.ErrMsg)
                this.props.cancel();
            }),
            succeed: (e)=>{
                alert('操作成功！');
                this.props.cancel(true);
            }
        }
        
        switch(this.props.type){
            case 'repay' : {
                this.confirmRepayOffline = req(ParameterName.confirmRepayOffline, _req);
                break;
            }
            case 'settle': {
                console.log(ParameterName.confirmRepayOfflineClearing);
                this.confirmRepayOffline = req(ParameterName.confirmRepayOfflineClearing, _req);
                break;
            }
        }
        
    }
    componentWillUnmount(){
        this.confirmRepayOffline && this.confirmRepayOffline.close();
    }
    render(){
        return <div style={{background: '#FFF', display: 'flex', 
            justifyContent: 'space-between',
            flexDirection: 'column',
            width:'500px',
            height: '300px'}}>
            <ModalTitle>确认线下{this.props.type === 'repay' ? '还款' : '结清'}</ModalTitle>
            <div style={{textAlign:'center'}}>
                是否确认{this.props.type === 'repay' ? '还款' : '结清'}?
            </div>
            <div style={{height: '40px', display: 'flex'}}>
                <CancelButton onClick={()=>this.props.cancel()}>
                    关闭
                </CancelButton>
                <CancelButton onClick={()=>this.confirm(false)}>
                    {
                      this.state.isLoading 
                        ? <InnerProgress height={'32px'} />
                        : '拒绝'
                    }
                </CancelButton>
                <PrimaryButton onClick={()=>this.confirm(true)}>
                {
                      this.state.isLoading 
                        ? <InnerProgress height={'32px'} />
                        : '确认'
                    }
                </PrimaryButton>
            </div>
        </div>
    }
}