import * as React from 'react';
import { Table } from '../../components/table/commonTable';
import { RequestCallback, ParameterName, CallbackSummary, Parameter, PageInfo, Callback } from '../../components/request/setting';
import { sessionData } from '../../components/sessionData/sessionData';
import { Paging } from '../../components/paging/paging';
import { ReqOption, req } from '../../components/request';
import { logOut } from '../../components/fail/logOut';
import { View } from '../../module/pageModule/view';

interface Props {}

interface State {
    callbackData: RequestCallback<ParameterName.selectRepayRecord>[];
    data : Parameter<ParameterName.selectRepayRecord>;
    pageInfo: PageInfo;
}
export class ReceivableList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            callbackData: [],
            data: {
                Token: sessionData.getData('Token'),
                StartTime: '',
                EndTime: '',
                BorrowerName: '',
                EmployeeId: '',
                MerchantNo: '',
                Mobile: '',
                PageIndex: '1',
                PageSize: '10'
            },
            pageInfo: {}
        };
        this.getList = this.getList.bind(this);
    }

    componentDidMount(){
        this.getList();
    }

    getList(){
        let _getList: ReqOption<ParameterName.selectRepayRecord>;
        _getList = {
            data: this.state.data,
            fail: logOut((e: Callback)=>{
                alert(e.ErrMsg)
            }),
            succeed: (e)=>{
                this.setState({
                    callbackData: e.Value.PagedList,
                    pageInfo: e.Value.PageInfo
                })
            }
        }
        req(ParameterName.selectRepayRecord, _getList);
    }   

    render() {
        return <View>
            <div>
                <Paging totalSize={this.state.pageInfo.TotalCount} changePage={(e)=>alert(e)}
                    index={this.state.data.PageIndex}
                    lastPage={this.state.pageInfo.PageCount}/>
            </div>
            <ReceivableTable data={this.state.callbackData} />
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
        head: '订单号',
        attr: 'OrderNo'
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
        head: '通道费',
        attr: 'RepayChannelCost'
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