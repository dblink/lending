import * as React from 'react';
import { View } from '../../module/pageModule/view';
import { Table } from '../../components/table/commonTable';
import { PageLoading } from '../../components/progress/progress';
import { Parameter, ParameterName, RequestCallback, Callback, CallbackSummary } from '../../components/request/setting';
import { getIntervalDate } from '../../components/calendar/dateFunction';
import { sessionData } from '../../components/sessionData/sessionData';
import { ReqOption, req } from '../../components/request';
import { logOut } from '../../components/fail/logOut';
import { load } from '../../components/loading/loading';
import { PrimaryButton, HrefButton } from '../../components/button';
import { Paging } from '../../components/paging/paging';
import { RechargeModal, RechargePage } from '../../components/modal/rechargeModal';
import { FilterList, Filter } from '../../module/filter/filter';

interface Props {}

interface State {
    data: Parameter<ParameterName.selectRechargeLoanBalance>;
    callBackData: RequestCallback<ParameterName.selectRechargeLoanBalance>[];
    isPageLoading: boolean;
    money: {
        FrozenLoanBalance: string;
        LoanBalance: string;
    };
}

export class RechargeList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        let _obj = getIntervalDate(new Date(), 1);
        this.state = {
            data: {
                EndTime: _obj.endTime,
                StartTime:_obj.startTime,
                PageIndex: 1,
                PageSize : 10,
                Status: '-1',
                Token: sessionData.getData('Token')
            },
            money: {
                FrozenLoanBalance: '为获取',
                LoanBalance: '为获取'
            },
            callBackData: [],
            isPageLoading: false
        };
        this.getList = load.run.call(this, this.getList, 'isPageLoading');
        this.filterList = this.filterListFunction();
        this.search = this.search.bind(this);
        this.getLendingMoney = this.getLendingMoney.bind(this);
    }
    componentDidMount(){
        this.getList();
    }
    controller: {
        showModal : (page: RechargePage, data ?: any)=>void;
        cancelModal ?: any;
        [index : string]: any;
    } = {
        showModal: ()=>{}
    }
    getList(){
        let _req: ReqOption<ParameterName.selectRechargeLoanBalance>;
        _req = {
            data: this.state.data,
            fail: logOut((e:Callback)=>{
                alert(e.ErrMsg)
            }),
            succeed: (e)=>{
                this.setState({
                    isPageLoading: false,
                    callBackData: e.Value.PagedList
                })
            }
        };
        req(ParameterName.selectRechargeLoanBalance, _req)
    }
    filterList: FilterList;
    filterListFunction: ()=>FilterList =()=>{
        return [{
            name: 'StartTime',
            text: '开始日',
            type: 'date',
            value: this.state.data.StartTime
        },{
            name: 'EndTime',
            text: '结束日',
            type: 'date',
            value: this.state.data.EndTime
        },{
            name: 'Status',
            text: '状态',
            value: this.state.data.Status,
            type: 'select',
            list: [{
                text: '全部',
                value: '-1',
            },{
                text: '等待汇款码',
                value: '0'
            },{
                text: '等待商户上传凭证',
                value: '1',
            },{
                text:'待确认充值',
                value: '2'
            },{
                text: '已确认充值',
                value: '3'
            },{
                text: '关闭',
                value: '4'
            }]
        }]
    }
    search(data: Parameter<ParameterName.selectRechargeLoanBalance>){
        let _data = Object.assign({}, this.state.data, data);
        _data.PageIndex = 1;
        this.setState({
            data: _data
        }, this.getList)
    }
    getLendingMoney(){
        let _req: ReqOption<ParameterName.getMerchantBalance>;
        _req = {
            data: {
                Token: sessionData.getData('Token')
            },
            fail: logOut((e: Callback)=>{
                alert(e.ErrMsg)
            }),
            succeed: (data)=>{
                let _data = data.Value;
                this.setState({
                    money: _data
                })
            }
        };
        req(ParameterName.getMerchantBalance, _req);
    }
    render() {
        return <View>
            <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                <div style={{minHeight: '40px', display: 'flex',marginBottom:'30px',
                    background: '#FFF', position: 'relative'}}>
                    <PrimaryButton style={{width: '100px'}} onClick={()=>this.controller.showModal('apply')}>
                        充值
                    </PrimaryButton>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{display: 'flex', width:'100%', justifyContent:'center'
                            , padding: '10px'
                            , alignItems:'center' ,flexDirection: 'column'}}>
                            <span>放款余额</span>
                            <span>{this.state.money.LoanBalance}</span>
                            <span>冻结金额</span>
                            <span>{this.state.money.FrozenLoanBalance}</span>
                        </div>
                        <PrimaryButton onClick={this.getLendingMoney}
                            style={{width: '100px', maxWidth: '100px'}}>
                            查询
                        </PrimaryButton>
                    </div>
                    <Filter filter={this.search} filterList={this.filterList}  />
                    <Paging lastPage={'10'} changePage={()=>{}}
                        index={this.state.data.PageIndex} totalSize={20} />
                </div>
                <div style={{flex: 'auto', position: 'relative'}}>
                    <PageLoading show={this.state.isPageLoading} />
                    <RechargeTable showModal={this.controller.showModal} data={this.state.callBackData} />
                </div>
            </div>
            <RechargeModal  controller={this.controller} getList={this.getList} />
        </View>
    }
}
type RechargeTableProps = {
    data: RequestCallback<ParameterName.selectRechargeLoanBalance>[];
    showModal: (page: RechargePage, data: any)=>void;
}
class RechargeTable extends React.Component<RechargeTableProps, any>{
    constructor(props: any){
        super(props);
    }
    setting: {
        head: string;
        attr: CallbackSummary[ParameterName.selectRechargeLoanBalance];
        format ?: (data: RequestCallback<ParameterName.selectRechargeLoanBalance>)=>any;
    }[] = [{
        head:'创建时间',
        attr: 'CreateTime'
    },{
        head: '订单号',
        attr: 'TradeNo'
    },{
        head: '充值金额',
        attr: 'RechargeMoney'
    },{
        head: '充值码',
        attr: 'RechargeCode'
    },{
        head: '确认时间',
        attr: 'ConfirmTime'
    },{
        head: '状态',
        attr: 'State',
        format: (data)=>{
            switch(data.State.toString()){
                case '0':{
                    return '等待汇款码' 
                }
                case '1': {
                    return <HrefButton style={{width: 'auto'}} onClick={()=>this.props.showModal('upload', {id:data.Id})}>
                        上传凭证
                    </HrefButton> 
                }
                case '2': {
                    return '待确认充值'
                }
                case '3': {
                    return '已确认充值'
                }
                case '4': {
                    return '关闭'
                }
            }
        }
    }];
    render(){
        let Tab = Table.CommonTable;
        return <Tab list={this.props.data} setting={this.setting} />
    }
}