import * as React from 'react';
import { Table } from '../../components/table/commonTable';
import { RequestCallback, ParameterName, CallbackSummary, Parameter, PageInfo, Callback } from '../../components/request/setting';
import { sessionData } from '../../components/sessionData/sessionData';
import { Paging } from '../../components/paging/paging';
import { ReqOption, req } from '../../components/request';
import { logOut } from '../../components/fail/logOut';
import { View } from '../../module/pageModule/view';
import { getIntervalDate } from '../../components/calendar/dateFunction';
import { LendingFilter } from './lendingList';
import { load } from '../../components/loading/loading';
import { PageLoading } from '../../components/progress/progress';

interface Props {}

type ListCallback = RequestCallback<ParameterName.selectRepayRecord>[];
type ReqParameter = Parameter<ParameterName.selectRepayRecord>;

interface State {
    callbackData: ListCallback;
    data : ReqParameter;
    pageInfo: PageInfo;
    isPageLoading: boolean;
    isLoading: boolean;
}
export class ReceivableList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        let _time = getIntervalDate(new Date(), 1);
        this.state = {
            callbackData: [],
            data: {
                Token: sessionData.getData('Token'),
                StartTime: _time.startTime,
                EndTime: _time.endTime,
                BorrowerName: '',
                EmployeeId: '',
                MerchantNo: '',
                Mobile: '',
                PageIndex: '1',
                PageSize: '10'
            },
            isLoading: true,
            isPageLoading: false,
            pageInfo: {}
        };
        this.getList = load.run.call(this, this.getList, 'isPageLoading');
        this.search = load.isLoading.call(this, this.search);
    }

    componentDidMount(){
        this.getList();
    }

    getList(){
        let _getList: ReqOption<ParameterName.selectRepayRecord>;
        _getList = {
            data: this.state.data,
            fail: logOut((e)=>{
                alert(e.ErrMsg)
            }),
            succeed: (e)=>{
                this.setState({
                    isLoading: false,
                    isPageLoading: false,
                    callbackData: e.Value.PagedList,
                    pageInfo: e.Value.PageInfo
                })
            }
        }
        req(ParameterName.selectRepayRecord, _getList);
    }  
    
    search(data: ReqParameter){
        let _data = Object.assign({}, this.state.data, data);
        _data.PageIndex = 1;
        this.setState({
            data: _data
        }, this.getList)
    }

    render() {
        return <View>
            <div style={{height: '100%', display: 'flex', 
                flexDirection: 'column'}}>
                <div style={{marginBottom: '30px', display:'flex',
                    position: 'relative'}}>
                    <LendingFilter data={this.state.data} search={this.search} />
                    <Paging totalSize={this.state.pageInfo.TotalCount} changePage={(e)=>alert(e)}
                        index={this.state.data.PageIndex}
                        lastPage={this.state.pageInfo.PageCount}/>
                    <PageLoading show={this.state.isLoading} hideContent={true} />
                </div>
                <div style={{flex:'auto', position: 'relative'}}>
                    <PageLoading show={this.state.isPageLoading} />
                    <ReceivableTable data={this.state.callbackData} />
                </div>
            </div>
        </View>
    }
}

type ReceivableTableProps = {
    data: any;
}

class ReceivableTable extends React.Component<ReceivableTableProps, any>{
    setting: {
        head: string;
        attr: CallbackSummary[ParameterName.selectRepayRecord];
        format ?: any;
    }[] = [{
        head: '回款时间',
        attr: 'RepayTime'
    },{
        head: '借款人',
        attr: 'BorrowerName'
    },{
        head: '借款人手机号',
        attr: 'BorrowerMobile'
    },{
        head: '商户名',
        attr: 'MerchantName'
    },{
        head: '借款期数',
        attr: 'Period'
    },{
        head: '回款金额',
        attr: 'RepayMoney'
    },{
        head: '操作人',
        attr: 'OperationEmployeeName'
    },{
        head: '状态',
        attr: 'Type',
        format: (data: RequestCallback<ParameterName.selectRepayRecord>) =>{
            switch(data.Type.toString()){
                //1：线上，2：线下，3：线上结清，4：线下结清
                case '1': return <span style={{color: 'green'}}>
                    线上
                </span>;
                case '2': return <span style={{color: 'green'}}>
                    线下
                </span>
                case '3': return <span style={{color: 'green'}}>
                    线上结清
                </span>
                case '4': return <span style={{color: 'green'}}>
                    线上结清
                </span>
            }
        }
    }]
    render(){
        let Tab = Table.CommonTable;
        return <Tab setting={this.setting} list={this.props.data}/>
    }
}