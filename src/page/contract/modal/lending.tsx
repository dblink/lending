import * as React from 'react';
import { Parameter, ParameterName, Callback } from '../../../components/request/setting';
import { sessionData } from '../../../components/sessionData/sessionData';
import { load } from '../../../components/loading/loading';
import { ReqOption, req } from '../../../components/request';
import { logOut } from '../../../components/fail/logOut';
import { ModalTitle } from '../../../components/modal/title';
import { CancelButton, PrimaryButton } from '../../../components/button';
import { InnerProgress } from '../../../components/progress/progress';
type LendingProps = {
    closeModal: any;
    contractId: any;
}
type LendingState = {
    data: Parameter<ParameterName.applyLoan>;
    isLoading: boolean;
}

export class Lending extends React.Component<LendingProps, LendingState> {
    constructor(props: LendingProps){
        super(props);
        //console.log(props.contractId)
        this.state = {
            data: {
                //ServiceMoney: '',
                LoanContractId: props.contractId,
                Token: sessionData.getData('Token')
            },
            isLoading: false
        }
        this.confirm = load.run.call(this, this.confirm);
    }
    confirm(){
        let _req: ReqOption<ParameterName.applyLoan> = {
            data: this.state.data,
            fail: logOut((e: Callback)=>{
                alert(e.ErrMsg);
            }),
            succeed: (e)=>{
                alert('购买处理中！10分钟有结果');
                this.props.closeModal(true)
            }
        }
        req(ParameterName.applyLoan, _req);
    }
    render(){
        return <div style={{background: '#FFF',
             display: 'flex', justifyContent: 'space-between', 
             width: '90%', maxWidth: '500px', height: '300px', flexDirection: 'column'}}>
             <div style={{padding:'0 70px'}}>
                <ModalTitle >
                    购买
                </ModalTitle>
             </div>
             <p style={{textAlign: 'center'}}>是否确认购买？</p>
            <div style={{height: '40px', display: 'flex'}}>
                <CancelButton onClick={this.props.closeModal}>
                    取消
                </CancelButton>
                <PrimaryButton onClick={this.confirm}>
                    {this.state.isLoading ? <InnerProgress height='32px' /> : '确认' }
                </PrimaryButton>
            </div>
        </div>
    }
}