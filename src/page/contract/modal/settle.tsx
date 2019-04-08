import * as React from 'react';
import { Parameter, ParameterName } from "../../../components/request/setting";
import { sessionData } from '../../../components/sessionData/sessionData';
import { load } from '../../../components/loading/loading';
import { ReqOption, req } from '../../../components/request';
import { logOut } from '../../../components/fail/logOut';
import { ModalTitle } from '../../../components/modal/title';
import { ApplyInput } from '../../../components/input';
import { CancelButton, PrimaryButton } from '../../../components/button';
import { InnerProgress } from '../../../components/progress/progress';

type SettleProps = {
    contractId: string;
    type : 'local' | 'online';
    cancel: (bool ?: boolean)=>void;
}
type SettleState = {
    data: Parameter<ParameterName.applyRepayOfflineClearing>;
    isLoading: boolean;
}
export class Settle extends React.Component<SettleProps, SettleState>{
    constructor(props: SettleProps){
        super(props);
        this.state = {
            data: {
                LoanContractId: this.props.contractId,
                Token: sessionData.getData('Token'),
                RepayMoney: ''
            },
            isLoading: false
        }
        this.inputChange = load.isLoading.call(this, this.inputChange);
        this.confirm = load.run.call(this, this.confirm);
    }
    inputChange(e: React.ChangeEvent<HTMLInputElement>){
        let _data = this.state.data;
        _data.RepayMoney = e.target.value;
        this.setState({
            data: _data
        })
    }
    confirm(){
        console.log(this.props.type);
        let _req: ReqOption<ParameterName.applyRepayOfflineClearing
            | ParameterName.applyRepayOnlineClearing>;
        _req = {
            data:this.state.data,
            fail: logOut((e)=>{
                this.setState({
                    isLoading: false
                })
                alert(e.ErrMsg)
            }),
            succeed:(e)=>{
                if(this.props.type === 'local'){
                    alert('提交结清申请成功！');
                }else if(this.props.type === 'online'){
                    alert('结清中，5分钟后有结果');                    
                }
                this.setState({
                    isLoading: false
                }, ()=>this.props.cancel(true))
            }
        }
        if(this.props.type === 'local'){
            req(ParameterName.applyRepayOfflineClearing, _req)
        }else if(this.props.type === 'online'){
            req(ParameterName.applyRepayOnlineClearing, _req);
        }
        
    }
    render(){
        return <div style={{background: '#FFF', 
            height: '300px', width: '600px', flexDirection: 'column',
            display: 'flex', justifyContent: 'space-between'}}>
            <ModalTitle>
                {this.props.type === 'local' ? '线下结清' : '线上结清'}
            </ModalTitle>
            <div style={{padding:'0 70px'}}>
                <ApplyInput text='结清金额'
                    name='RepayMoney' onChange={this.inputChange}
                    value={this.state.data.RepayMoney}
                />
            </div>
            <div style={{display: 'flex', height: '40px'}}>
                <CancelButton onClick={()=>this.props.cancel()}>
                    取消
                </CancelButton>
                <PrimaryButton onClick={()=>this.confirm()}>
                    {this.state.isLoading ? <InnerProgress height='32px' /> :'确认'}
                </PrimaryButton>
            </div>
        </div>
    }
}