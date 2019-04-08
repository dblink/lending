import * as React from 'react';
import { Parameter, ParameterName } from '../../../components/request/setting';
import { sessionData } from '../../../components/sessionData/sessionData';
import { ReqOption, req } from '../../../components/request';
import { load } from '../../../components/loading/loading';
import { logOut } from '../../../components/fail/logOut';
import { ModalTitle } from '../../../components/modal/title';
import { CancelButton, PrimaryButton } from '../../../components/button';
import { InnerProgress } from '../../../components/progress/progress';

type CancelProps = {
    contractId: string;
    cancel: (bool ?: boolean)=>void;
}

type CancelState = {
    data: Parameter<ParameterName.cancelContract>;
    isLoading: boolean;
}

export class Cancel extends React.Component<CancelProps, CancelState>{
    constructor(props: any){
        super(props);
        this.state = {
            data: {
                Token: sessionData.getData('Token'),
                ContractId: this.props.contractId
            },
            isLoading: false
        }
        this.confirm = load.run.call(this, this.confirm);
        this.cancel = this.cancel.bind(this);
    }
    confirm(){
        let _req: ReqOption<ParameterName.cancelContract>;
        _req = {
            data: this.state.data,
            fail: logOut((e)=>{
                alert(e.ErrMsg);
                this.setState({
                    isLoading: false
                })
            }),
            succeed: (e)=>{
                alert('取消成功！');
                this.props.cancel(true)
            }
        }
        req(ParameterName.cancelContract, _req)
    }
    cancel(){
        this.props.cancel()
    }
    render(){
        return <div style={{height: '90%', width: '500px',flexDirection: 'column', 
            background: '#FFF', display:'flex', justifyContent: 'space-between'}}>
            <ModalTitle>
                取消合同
            </ModalTitle>
            <div style={{flex: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                是否确认取消合同
            </div>
            <div style={{display: 'flex', height: '40px'}}>
                <CancelButton onClick={this.cancel}>
                    取消
                </CancelButton>
                <PrimaryButton onClick={this.confirm}>
                    {this.state.isLoading ? <InnerProgress height='32px' /> : '确认'}
                </PrimaryButton>
            </div>
        </div>
    }
}