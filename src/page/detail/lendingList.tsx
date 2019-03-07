import * as React from 'react';
import { Table } from '../../components/table/commonTable';
import {ParameterName, CallbackSummary, Parameter, PageInfo, RequestCallback, Callback } from '../../components/request/setting';
import { sessionData } from '../../components/sessionData/sessionData';
import { Paging } from '../../components/paging/paging';
import { ReqOption, req } from '../../components/request';
import { logOut } from '../../components/fail/logOut';
import { View } from '../../module/pageModule/view';
import { getIntervalDate } from '../../components/calendar/dateFunction';
import { PageLoading } from '../../components/progress/progress';
import { load } from '../../components/loading/loading';

interface Props {}

interface State {
    data: Parameter<ParameterName.selectLoanRecord>;
    pageInfo ?: PageInfo;
    callbackData: RequestCallback<ParameterName.selectLoanRecord>[];
    isPageLoading: boolean;
    isLoading:boolean;
}

export class LendingList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        let timeObj = getIntervalDate(new Date(), 1);
        this.state = {
            data: {
                Token: sessionData.getData('Token'),
                StartTime: timeObj.startTime,
                BorrowerName: '',
                EmployeeId: '',
                EndTime: timeObj.endTime,
                MerchantNo: '',
                Mobile: '',
                PageIndex: '1',
                PageSize: '10'
            },
            isPageLoading: false,
            isLoading: true,
            callbackData: [],
            pageInfo: {}
        };
        this.getLendingList = load.run.call(this, this.getLendingList, 'isPageLoading')
        this.changePage = load.isLoading.call(this, this.changePage);
    }
    componentDidMount(){
        this.getLendingList();
    }
    getLendingList(){
        let _getLendingList: ReqOption<ParameterName.selectLoanRecord>;
        _getLendingList = {
            data: this.state.data,
            fail: logOut((e:Callback)=>{
                alert(e.ErrMsg);
            }),
            succeed: (e)=>{
                this.setState({
                    isPageLoading: false,
                    isLoading: false,
                    pageInfo: e.Value.PageInfo,
                    callbackData: e.Value.PagedList
                })
            }
        };
        req(ParameterName.selectLoanRecord, _getLendingList);
    }
    changePage(num:number){
        let _data = this.state.data;
        _data.PageIndex = num;
        this.setState({
            data: _data
        }, this.getLendingList)
    }
    render() {
        return <View>
            <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', marginBottom: '30px'}}>
                    <Paging index={this.state.pageInfo.PageIndex} lastPage={this.state.pageInfo.PageCount}
                        totalSize={this.state.pageInfo.TotalCount} changePage={(e)=>{console.log(e)}} />
                </div>
                <div style={{flex: 'auto',position: 'relative'}}>
                    <PageLoading show={this.state.isPageLoading} />
                    <LendingTable data={this.state.callbackData} />
                </div>
            </div>
        </View>
    }
}
type LendingTableProps = {
    data: RequestCallback<ParameterName.selectLoanRecord>[];
}
class LendingTable extends React.Component<LendingTableProps, any>{
    setting: {
        head : string;
        attr : CallbackSummary[ParameterName.selectLoanRecord];
        format ?: any;
    }[] = [{
        head: '订单号',
        attr: 'OrderNo'
    }, {
        head: '借款人姓名',
        attr: 'BorrowerName'
    }, {
        head: '借款人手机号',
        attr: 'BorrowerMobile'
    }, {
        head: '银行卡号',
        attr: 'BankCardNo'
    }, {
        head: '商户名',
        attr: 'MerchantName'
    },{
        head: '通道费',
        attr: 'LoanChannelCost'
    }, {
        head: '本金',
        attr: 'Principal'
    }, {
        head: '期数',
        attr: 'Period'
    }, {
        head: '确认人',
        attr: 'ConfirmPersonName'
    }]
    render(){
        let Tab = Table.CommonTable;
        return <Tab setting={this.setting} list={this.props.data} />
    }
}