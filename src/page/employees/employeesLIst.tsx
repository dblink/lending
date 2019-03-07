import * as React from 'react';
import { View } from '../../module/pageModule/view';
import { Paging } from '../../components/paging/paging';
import { Table } from '../../components/table/commonTable';
import { ParameterName, Parameter, Callback, PageInfo, CallbackSummary, RequestCallback } from '../../components/request/setting';
import { ReqOption, req } from '../../components/request';
import { sessionData } from '../../components/sessionData/sessionData';
import { logOut } from '../../components/fail/logOut';

interface Props {}

interface State {
    data: Parameter<ParameterName.getUserAllInfo>;
    callbackData: RequestCallback<ParameterName.getUserAllInfo>[];
    pageInfo: PageInfo;
}

export class EmployeesList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: {
                Token: sessionData.getData('Token'),
                PageIndex: '1',
                EmpName: '',
                Mobile: '',
                MerchantNo: sessionData.getData('UserInfo').MerchantNo,
                Status: '0',
                StoreId: '',
                PageSize: '10'
            },
            callbackData:[],
            pageInfo: {},
        };
        this.getEmployeesList = this.getEmployeesList.bind(this);
    }
    componentDidMount(){
        this.getEmployeesList();
    }
    getEmployeesList(){
        let _getEmployees: ReqOption<ParameterName.getUserAllInfo>;
        _getEmployees = {
            data : this.state.data,
            fail : logOut((e:Callback)=>{
                alert(e.ErrMsg)
            }),
            succeed: (e)=>{
                this.setState({
                    callbackData: e.Value.PagedList
                })
            }
        };
        req(ParameterName.getUserAllInfo, _getEmployees)
    }

    render() {
        return <View>
            <div style={{height: '40px', width: '100%'}}>
                <Paging changePage={(e)=>{alert(e)}} lastPage={this.state.pageInfo.PageCount}
                    totalSize={this.state.pageInfo.TotalCount}
                    index={this.state.data.PageIndex}>
                </Paging>
            </div>
            <div>
                <EmployeesTable data={this.state.callbackData} />
            </div>
        </View>
    }
}
type EmployeesTableProps = {
    data: RequestCallback<ParameterName.getUserAllInfo>[];
}
class EmployeesTable extends React.Component <EmployeesTableProps, any>{
    setting: {
        head: string;
        attr: CallbackSummary[ParameterName.getUserAllInfo];
        format ?: any;
    }[] = [{
            head: '姓名',
            attr: 'Name',
        }, {
            head: '上级',
            attr: 'Superior',
        }, {
            head: '手机号',
            attr: 'Mobile'
        }, {
            head: '职位',
            attr: 'RoleName'
        }, {
            head: '门店',
            attr: 'StoreName'
        }, {
            head: '创建时间',
            attr: 'CreateTime'
        }, {
            head: '状态',
            attr: 'State',
            format: (data: RequestCallback<ParameterName.getUserAllInfo>)=>{
                switch(data.State){
                    case 0: return <span style={{color: 'red'}}>
                        未激活
                    </span>
                    case 1: return <span style={{color: 'green'}}>
                        正常
                    </span>
                    case 2: return <span style={{color: 'orange'}}>
                        注销
                    </span>
                    case 3: return <span style={{color: 'deepskyblue'}}>
                        冻结
                    </span>
                }
            }
        }
    ];
    render(){
        let Tab = Table.CommonTable;
        return <Tab list={this.props.data} setting={this.setting} />
    }
}