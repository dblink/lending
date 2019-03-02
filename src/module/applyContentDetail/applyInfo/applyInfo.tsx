import * as React from 'react';
import { load } from '../../../components/loading/loading';
import { ParameterSummary, ParameterName, Parameter } from '../../../components/request/setting';
import { ReqOption, req } from '../../../components/request';
import { ApplyInput } from '../../../components/input';
import { CancelButton, PrimaryButton } from '../../../components/button';
import { InnerProgress } from '../../../components/progress/progress';
import { ModalTitle } from '../../../components/modal/title';
import { sessionData } from '../../../components/sessionData/sessionData';
type ApplyInfoState = {
    data: Parameter<ParameterName.addLoanApplyRecord>;
    isLoading: boolean;
    error: string;
}
type ApplyInfoProps = {
    id: string;
    name: string;
    onChangeDataState: (str: string, status: boolean)=> void;
    onChangeStep: (str: string, name ?: string)=>void;
}
//申请借款信息
export class ApplyInfo extends React.Component <ApplyInfoProps, ApplyInfoState>{
    constructor(props: any){
        super(props);
        this.state={
            data: {
                Token: sessionData.getData('Token'),
                ApplyMoney: '',
                BorrowerId: this.props.id,
                Period: '',
                Purpose: '家庭消费'
            },
            isLoading: false,
            error: ''
        }
        this.inputChange = this.inputChange.bind(this);
        this.confirm = load.run.call(this, this.confirm);
    }
    inputChange(name:ParameterSummary[ParameterName.addLoanApplyRecord], value: any){
        let _data = this.state.data;
        _data[name] = value;
        this.setState({
            data: _data
        });
    }
    confirm(){
        let _options: ReqOption<ParameterName.addLoanApplyRecord> = {
            data: this.state.data,
            fail: (error)=>{
                this.setState({
                    error: error.ErrMsg
                })
            },
            succeed: ()=>{
                this.props.onChangeDataState(this.props.name, true);
                this.props.onChangeStep('applyList', '');
            }
        }
        req(ParameterName.addLoanApplyRecord, _options);
    }
    render(){
        return <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
            <div>
                {this.state.error && <div style={{color: 'red'}}>
                    {this.state.error}
                </div>}
                <ModalTitle>
                    申请借款信息
                </ModalTitle>
                <div style={{width: '360px', margin:'auto'}}>
                    <div style={{marginTop: '20px'}}>
                        <ApplyInput type='text' text='申请金额' 
                            onChange={(e)=>this.inputChange('ApplyMoney', e.target.value)}
                            name={'ApplyMoney'} value={this.state.data.ApplyMoney} />
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <ApplyInput type='text' text='申请周期' 
                            onChange={(e)=> this.inputChange('Period', e.target.value)}
                            name={'Period'} value={this.state.data.Period} />
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <ApplyInput type='text' text='用途' disabled={true} value={this.state.data.Purpose}/>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex'}}>
                <CancelButton 
                    onClick={()=>this.props.onChangeStep('applyList', '')}
                    style={{height: '40px', borderRadius:'0', width: '50%'}} >
                    取消
                </CancelButton>
                <PrimaryButton onClick={this.confirm} style={{height: '40px', borderRadius:'0', width: '50%'}} >
                    {!this.state.isLoading ? '确认' : <InnerProgress hidden={false} height='32px' />}
                </PrimaryButton>
            </div>
    </div>
    }
}