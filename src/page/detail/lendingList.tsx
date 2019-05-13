import * as React from 'react';
import { Table } from '../../components/table/commonTable';
import {ParameterName, CallbackSummary, Parameter, PageInfo, RequestCallback, Callback, ParameterSummary } from '../../components/request/setting';
import { sessionData } from '../../components/sessionData/sessionData';
import { Paging } from '../../components/paging/paging';
import { ReqOption, req } from '../../components/request';
import { logOut } from '../../components/fail/logOut';
import { View } from '../../module/pageModule/view';
import { getIntervalDate } from '../../components/calendar/dateFunction';
import { PageLoading } from '../../components/progress/progress';
import { load } from '../../components/loading/loading';
import { Filter, FilterList } from '../../module/filter/filter';
import { HrefButton, PrimaryButton } from '../../components/button';
import { addMerchantItem } from '../../module/filter/addMerchantItem';

interface Props {}

interface State {
    data: Parameter<ParameterName.selectLoanRecord>;
    pageInfo ?: PageInfo;
    callbackData: RequestCallback<ParameterName.selectLoanRecord>[];
    isPageLoading: boolean;
    isLoading:boolean;
    fee : {
        "TotalLoanMoney" ?: string,//总放款金额
        "TotalOtherCharge"?: string,//总其他费用
        "TotalQueryCharge" ?: string//总查询费用
    }
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
                EndTime: timeObj.endTime,
                MerchantNo: '',
                Mobile: '',
                PageIndex: '1',
                PageSize: '10',
            },
            isPageLoading: false,
            isLoading: true,
            fee: {},
            callbackData: [],
            pageInfo: {}
        };
        this.getLendingList = load.run.call(this, this.getLendingList, 'isPageLoading')
        this.changePage = load.isLoading.call(this, this.changePage);
        this.search = load.isLoading.call(this, this.search);
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
                    fee: e.Value.LoanTotalChargeModel || {},
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
    search(data: Parameter<ParameterName.selectLoanRecord>){
        let _data = Object.assign({}, this.state.data, data);
        _data.PageIndex = 1;
        this.setState({
            data: _data
        }, this.getLendingList)
    }
    render() {
        return <View>
            <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex',position: 'relative', 
                    minHeight: '40px',marginBottom: '15px'}}>
                    <PrimaryButton style={{width: '150px', fontSize: '14px'}}
                        onClick={()=>{
                            location.href = `http://loutsloanapi.hehuadata.com/api/LoanDetail/ExportLoanDetail?StartTime=${this.state.data.StartTime}&EndTime=${this.state.data.EndTime}&Token=${sessionData.getData('Token')}`
                    }}>导出放款</PrimaryButton>
                    <LendingFilter data={this.state.data} search={this.search} />
                    <PageLoading show={this.state.isLoading} />
                </div>
                <div style={{width: '100%',marginBottom: '15px', padding: '0 10px', display: 'flex',background: '#FFF', 
                        fontSize: '14px', justifyContent:'space-between'}}>
                        <div style={{display: 'flex', position: 'relative',height:'40px', alignItems: 'center'}}>
                            <p style={{marginLeft: '10px'}}>
                                总放款金额：{this.state.fee.TotalLoanMoney}元，
                            </p>
                            <p style={{marginLeft: '10px'}}>
                                总其他费用：{this.state.fee.TotalOtherCharge}元，

                            </p>
                            <p style={{marginLeft: '10px'}}>
                                总查询费用：{this.state.fee.TotalQueryCharge}元
                            </p>
                            {<PageLoading show={this.state.isPageLoading} />}
                        </div>
                        <div style={{display: 'flex', position: 'relative',height:'40px', alignItems: 'center'}}>
                            <Paging index={this.state.pageInfo.PageIndex} lastPage={this.state.pageInfo.PageCount}
                                totalSize={this.state.pageInfo.TotalCount} changePage={this.changePage} />
                            {<PageLoading show={this.state.isLoading} />}
                        </div>
                    </div>
                <div style={{flex: 'auto',position: 'relative',overflow: 'auto'}}>
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
        head: '日期',
        attr: 'LoanTime'
    }, {
        head: '借款人姓名',
        attr: 'BorrowerName'
    }, {
        head: '借款人手机号',
        attr: 'BorrowerMobile'
    },/*{
        head: '商户号',
        attr: 'MerchantNo'
    },{
        head: '商户名',
        attr: 'MerchantName',
        format: (data: any) => {
            return <div className='font-omit' style={{width: '100px',margin:'auto'}}>
                {data.MerchantName}
            </div>
        }
    },*/{
        head: '借款金额',
        attr: 'LoanMoney'
    }, {
        head: '期数',
        attr: 'Period'
    },{
        head: '查询费',
        attr: 'QueryCharge',
        format: (data :any)=>{
            return data.QueryCharge || '0'
        }
    },{
        head: '其他费用',
        attr: 'OtherCharge'
    }];
    render(){
        let Tab = Table.CommonTable;
        return <Tab setting={this.setting} list={this.props.data} />
    }
}
type LendingFilterState = {
    data: FilterList<ParameterSummary[ParameterName.selectLoanRecord]>
}
type LendingFilterProps = {
    data: Parameter<ParameterName.selectRepayRecord>;
    search: (data: Parameter<ParameterName.selectLoanRecord>)=> void;
}
export class LendingFilter extends React.Component<LendingFilterProps, LendingFilterState>{
    constructor(props: any){
        super(props);
        let _data:any = [{
            name: 'StartTime',
            text: '开始日',
            type: 'date',
            value: this.props.data.StartTime
        },{
            name: 'EndTime',
            text: '结束日',
            type: 'date',
            value: this.props.data.EndTime
        },{
            name: 'BorrowerName',
            text: '借款人',
            type: 'input',
            value: this.props.data.BorrowerName
        },{
            name: 'Mobile',
            text: '手机号',
            type: 'input',
            value: this.props.data.Mobile
        }];
        
        if(this.props.data.RepayType){
            _data.push({
                name: 'RepayType',
                text: '划扣类型',
                list: [{
                    value: '-1',
                    text: '全部'
                },{
                    value: '1',
                    text: '线上'
                },{
                    value: '2',
                    text: '线下'
                },{
                    value: '3',
                    text:'线上结清',
                },{
                    value: '4',
                    text: '线下结清'
                }],
                type: 'select',
                value: this.props.data.RepayType
            })
        }
        if(sessionData.getData('MerchantItem')){
            _data = addMerchantItem(_data, this.props.data.MerchantNo)
        }
        this.state = {
            data: _data
        }
    }
    render(){
        return <Filter filter={this.props.search} filterList={this.state.data} />
    }
}