import * as React from 'react';
import { View } from '../../module/pageModule/view';
import { Table } from '../../components/table/commonTable';
import { Parameter, ParameterName, RequestCallback, Callback, PageInfo, CallbackSummary } from '../../components/request/setting';
import { sessionData } from '../../components/sessionData/sessionData';
import { getIntervalDate } from '../../components/calendar/dateFunction';
import { ReqOption, req } from '../../components/request';
import { logOut } from '../../components/fail/logOut';
import { load } from '../../components/loading/loading';
import { PageLoading } from '../../components/progress/progress';
import { Paging } from '../../components/paging/paging';

interface Props {}

interface State {
    data: Parameter<ParameterName.getReportChargeItems>;
    callbackData: RequestCallback<ParameterName.getReportChargeItems>[];
    isPageLoading: boolean;
    isLoading: boolean;
    pageInfo: PageInfo;
}

export class Deductions extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        let obj = getIntervalDate(new Date(), 1);
        this.state = {
            data: {
                Token: sessionData.getData('Token'),
                Status: '-1',
                EndTime: obj.endTime,
                StartTime : obj.startTime,
                PageIndex: '1',
                ReportType: '-1',
                PageSize: '10',
                BorrowerName: '',
            },
            isPageLoading: false,
            isLoading: true,
            callbackData: [],
            pageInfo: {}
        };
        this.getList = load.run.call(this, this.getList, 'isPageLoading');
        this.changePage = load.isLoading.call(this, this.changePage);
    }
    componentDidMount(){
        this.getList();
    }
    getList(){
        let _req: ReqOption<ParameterName.getReportChargeItems>;
        _req = {
            data: this.state.data,
            fail: logOut((e: Callback)=>{
                alert(e.ErrMsg)
            }),
            succeed: (e: Callback) => {
                this.setState({
                    callbackData: e.Value.PagedList,
                    pageInfo: e.Value.PageInfo,
                    isPageLoading: false,
                    isLoading:false
                })
            }
        }
        req(ParameterName.getReportChargeItems, _req);
    }
    changePage(num: number){
        let _data = this.state.data;
        _data.PageIndex = num;
        this.setState({
            data: _data
        }, this.getList)
    }
    render() {
        return <View>
            <div style={{display:'flex', flexDirection: 'column', height: '100%'}}>
                <div style={{position: 'relative', marginBottom: '30px'}}>
                    <Paging index={this.state.data.PageIndex} 
                        changePage={this.changePage} totalSize={this.state.pageInfo.TotalCount}
                        lastPage={this.state.pageInfo.PageCount} />
                    <PageLoading show={this.state.isLoading} hideContent={true} />
                </div>
                <div style={{position: 'relative', flex: 'auto'}}>
                    <PageLoading show={this.state.isPageLoading} />
                    <DeductionsTable 
                        data={this.state.callbackData} /> 
                </div> 
            </div>
        </View>
    }
}

interface DeductionsTableProps {
    data: RequestCallback<ParameterName.getReportChargeItems>[]
}

class DeductionsTable extends React.Component<DeductionsTableProps, State>{
    setting: {
        head: string;
        attr: CallbackSummary[ParameterName.getReportChargeItems];
        format ?: (e: RequestCallback<ParameterName.getReportChargeItems>)=>any;
    }[] = [
        {
            head: '创建时间',
            attr: 'CreateTime'
        },{
            head: '合同类型',
            attr: 'ReportType',
            format: (e)=>{
                switch(e.ReportType.toString()){
                    case '1': return <span>蜜罐</span>
                    case '2': return <span>蜂蜜</span>
                    case '3': return <span>支付宝</span>
                }
            }
        },{
            head: '借款人',
            attr: 'BorrowerName',
        }, {
            head: '商户号',
            attr: 'MerchantNo'
        }, {
            head: '状态',
            attr: 'Status',
            format: (data: RequestCallback<ParameterName.getReportChargeItems>)=>{
                switch(data.Status.toString()){
                    case '1': return '等待扣款';
                    case '2': return '扣款失败';
                    case '3': return '扣款成功';
                }
            }
        },{
            head: '金额',
            attr: 'Total'
        }
    ];
    render(){
        let Tab = Table.CommonTable;
        return <Tab list={this.props.data} setting={this.setting} />
    }
}