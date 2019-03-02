import * as React from 'react';
import { BankCardInput } from '../../components/input';
import { ApplyContent } from '../../components/menu/applyContent';
import { BorrowerInfoDetail } from './borrowerInfoDetail/borrowerInfoDetail';
import { BorrowerInfo } from './borrowerInfo/borrowerInfo';
import { Certification } from './certification/certification';
import { ApplyInfo } from './applyInfo/applyInfo';
import { Juxinli } from '../juxinli/juxinli';
import { Honeypot } from '../honeypot/honeypot';
import { ApplyModalState } from '../../components/modal/applyModal';
import { CallbackSummary, ParameterName } from '../../components/request/setting';
import { Gongxinbao } from './gongXinBao/gongXinBao';

type ApplyContentDetailProps = {
    card: string;
    dataState: any;
    type: CallbackSummary[ParameterName.getBorrowerStatus];
    onChangeStep: (step: ApplyModalState['step'])=>void;
    setType:(e: string) => void;
    onChangeDataState: (e: CallbackSummary[ParameterName.getBorrowerStatus], status: boolean) => void;
}
//列表详情
export class ApplyContentDetail extends React.Component <ApplyContentDetailProps, any>{
    constructor(props: ApplyContentDetailProps){
        super(props);
        this.changeStep = this.changeStep.bind(this);
    }
    changeStep(step: ApplyModalState['step'], name: string){
        this.props.setType(name);
        this.props.onChangeStep(step);
    }
    getTypePage(){
        switch(this.props.type){
            case 'ISApply': return (
                <ApplyInfo name={this.props.type} 
                    onChangeDataState={this.props.onChangeDataState} 
                    id={this.props.dataState.BorrowerId} 
                    onChangeStep={this.changeStep}/>  );
            case 'ISUploadPersonCardState': return (
                <Certification name={this.props.type} 
                    onChangeDataState={this.props.onChangeDataState} 
                    IDCard={this.props.card} 
                    onChangeStep={this.changeStep} />
            )
            case 'ISExsitBorrower': return (
                <BorrowerInfo name={this.props.type}
                    userId={this.props.dataState.BorrowerId}
                    isExit={this.props.dataState[this.props.type]}
                    card={this.props.card}
                    onChangeDataState={this.props.onChangeDataState}
                    onChangeStep={this.changeStep}
                />
            )
            case 'ISExsitBorrowerDetail': return(
                <BorrowerInfoDetail name={this.props.type} 
                    borrowerId={this.props.dataState.BorrowerId}
                    onChangeDataState={this.props.onChangeDataState}
                    onChangeStep= {this.props.onChangeStep}
                    isExit={this.props.dataState[this.props.type]}
                />
            )
            case 'HoneypotStatus': return (
                <Honeypot setDataState={this.props.onChangeDataState}
                    idCardNo={this.props.card} type={this.props.type}
                    skip={this.props.onChangeStep} applyId={this.props.dataState.ApplyId} />
            )
            case 'Alipay': return (
                <Gongxinbao  idCardNo={this.props.card} applyId={this.props.dataState.ApplyId} />
            )
            case 'HoneyBeeStatus': return (
                <Juxinli idCardNo={this.props.card} borrowerId={this.props.dataState.BorrowerId} applyId={this.props.dataState.ApplyId} />
            )
            default: {
                return <div>测试阶段</div>
            }
        }
    }
    render(){
        return <div style={{height: '660px',
                display:'flex',
                background: '#fff'
            }}>
            <div style={{width: '300px'}}>
                <BankCardInput value={this.props.card} disabled={true} borderNone={true} />
                <ApplyContent 
                    name={this.props.type} 
                    dataState={this.props.dataState} 
                    onChangeStep={this.changeStep} />
            </div>
            <div style={{width: '520px'}}>
                {this.getTypePage()}
            </div>
        </div>
    }
}