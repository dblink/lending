import * as React from 'react';
import { Parameter, ParameterName, CallbackSummary, RequestCallback, Callback } from '../../../components/request/setting';
import { sessionData } from '../../../components/sessionData/sessionData';
import { load } from '../../../components/loading/loading';
import { ReqOption, req } from '../../../components/request';
import { logOut } from '../../../components/fail/logOut';
import { Table } from '../../../components/table/commonTable';
import { ModalTitle } from '../../../components/modal/title';
import { PageLoading } from '../../../components/progress/progress';
import { CancelButton } from '../../../components/button';

type RepaymentState = {
    data: Parameter<ParameterName.selectContractPlan>;
    callBackData: any;
    isLoading: boolean;
}
type RepaymentProps = {
    contractId: string;
    cancel: ()=>void;
}

export class Repayment extends React.Component<RepaymentProps, RepaymentState>{
    constructor(props: RepaymentProps){
        super(props);
        this.state = {
            data:{
                LoanContractId: props.contractId,
                Token : sessionData.getData('Token')
            },
            isLoading: false,
            callBackData: []
        }
        this.getInfo = load.run.call(this, this.getInfo);
    }
    componentDidMount(){
        this.getInfo();
    }
    setting: {
        head: string;
        attr: CallbackSummary[ParameterName.selectContractPlan];
        format ?: (data: RequestCallback<ParameterName.selectContractPlan>, attr:CallbackSummary[ParameterName.selectContractPlan])=>void;
    }[] = [
        {
            attr: 'Period',
            head: '期数',
            format: (data)=>{
                return data.Period + '期';
            }
        },
        {
            attr: 'RepayTime',
            head: '还款时间'
        },{
            attr: 'Principal',
            head: '申请金额'
        },{
            attr: 'Interest',
            head: '利息'
        },{
            attr: 'ServiceMoney',
            head: '服务费'
        },{
            attr: 'RepayMoney',
            head: '应还金额'
        },{
            attr: 'Status',
            head: '状态',
            format: (e)=>{
                switch(e.Status.toString()){
                    case '1': return <span>待还款</span>;
                    case '2': return <span>申请中</span>;
                    case '3': return <span>还款成功</span>;
                    case '4': return <span>还款失败</span>;
                    case '5': return <span>逾期</span>;
                    case '6': return <span>待入账</span>;
                }
            }
        }
    ];
    getInfoRequest:any;
    getInfo(){
        let _req: ReqOption<ParameterName.selectContractPlan> ={
            data: this.state.data,
            fail: logOut((e: Callback)=>{
                alert(e.ErrMsg);
            }),
            succeed: (data)=>{
                this.setState({
                    callBackData: data.Value,
                    isLoading: false
                })
            }
        };
        this.getInfoRequest = req(ParameterName.selectContractPlan, _req)
    }
    componentWillUnmount(){
        if(typeof this.getInfoRequest === 'function'){
            this.getInfoRequest.close();
        }
    }
    render(){
        let Tab = Table.CommonTable;
        return <div style={{background: '#FFF', height: '90%',
             overflow: 'auto',justifyContent: 'space-between',
            display: 'flex', flexDirection: 'column', width: '600px'}}>
            <ModalTitle >还款表</ModalTitle>
            <div style={{height: '500px', position: 'relative', overflow:this.state.isLoading ? 'hidden' : 'auto'}}>
                <Tab setting={this.setting} list={this.state.callBackData} />
                <PageLoading show={this.state.isLoading} />
            </div>
            
            <div style={{display: 'flex', minHeight: '40px'}}>
                <CancelButton onClick={()=>this.props.cancel()}>关闭</CancelButton>
            </div>
        </div>
    }
}